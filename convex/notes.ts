import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const noteCategory = v.union(
  v.literal("grammar"),
  v.literal("vocabulary"),
  v.literal("example"),
  v.literal("other"),
);

export const list = query({
  args: {
    workspaceId: v.id("workspaces"),
  },

  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_workspace", (q) =>
        q.eq("workspaceId", workspaceId),
      )
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: {
    noteId: v.id("notes"),
  },

  handler: async (ctx, { noteId }) => {
    return await ctx.db.get(noteId);
  },
});

export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    editToken: v.string(),
    title: v.string(),
    content: v.any(),
    category: noteCategory,
  },

  handler: async (
    ctx,
    {
      workspaceId,
      editToken,
      title,
      content,
      category,
    },
  ) => {
    const workspace = await ctx.db.get(workspaceId);

    if (!workspace || workspace.editToken !== editToken) {
      throw new Error("Invalid edit token.");
    }

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      throw new Error("Note title is required.");
    }

    return await ctx.db.insert("notes", {
      workspaceId,
      title: cleanTitle,
      content,
      category,
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    noteId: v.id("notes"),
    editToken: v.string(),
    title: v.string(),
    content: v.any(),
    category: noteCategory,
  },

  handler: async (
    ctx,
    {
      noteId,
      editToken,
      title,
      content,
      category,
    },
  ) => {
    const note = await ctx.db.get(noteId);

    if (!note) {
      throw new Error("Note not found.");
    }

    const workspace = await ctx.db.get(note.workspaceId);

    if (!workspace || workspace.editToken !== editToken) {
      throw new Error("Invalid edit token.");
    }

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      throw new Error("Note title is required.");
    }

    await ctx.db.patch(noteId, {
      title: cleanTitle,
      content,
      category,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    noteId: v.id("notes"),
    editToken: v.string(),
  },

  handler: async (ctx, { noteId, editToken }) => {
    const note = await ctx.db.get(noteId);

    if (!note) {
      throw new Error("Note not found.");
    }

    const workspace = await ctx.db.get(note.workspaceId);

    if (!workspace || workspace.editToken !== editToken) {
      throw new Error("Invalid edit token.");
    }

    await ctx.db.delete(noteId);
  },
});