import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function createSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEditToken() {
  return crypto.randomUUID();
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const workspaces = await ctx.db.query("workspaces").order("desc").collect();

    return workspaces.map(
      ({ _id, _creationTime, name, slug, author, updatedAt }) => ({
        _id,
        _creationTime,
        name,
        slug,
        author,
        updatedAt,
      }),
    );
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, { slug }) => {
    const workspace = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!workspace) {
      return null;
    }

    return {
      _id: workspace._id,
      _creationTime: workspace._creationTime,
      name: workspace.name,
      slug: workspace.slug,
      author: workspace.author,
      updatedAt: workspace.updatedAt,
    };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    author: v.string(),
  },

  handler: async (ctx, { name, author }) => {
    const cleanName = name.trim();
    const cleanAuthor = author.trim();

    if (!cleanName) {
      throw new Error("Workspace name is required.");
    }

    if (!cleanAuthor) {
      throw new Error("Author name is required.");
    }

    const slug = createSlug(cleanName);

    if (!slug) {
      throw new Error("Workspace name must contain valid characters.");
    }

    const existingWorkspace = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existingWorkspace) {
      throw new Error("A workspace with this name already exists.");
    }

    const editToken = createEditToken();
    const now = Date.now();

    const workspaceId = await ctx.db.insert("workspaces", {
      name: cleanName,
      slug,
      author: cleanAuthor,
      editToken,
      updatedAt: now,
    });

    return {
      workspaceId,
      slug,
      editToken,
    };
  },
});

export const update = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    editToken: v.string(),
    name: v.string(),
    author: v.string(),
  },

  handler: async (ctx, { workspaceId, editToken, name, author }) => {
    const workspace = await ctx.db.get(workspaceId);

    if (!workspace || workspace.editToken !== editToken) {
      throw new Error("Invalid edit token.");
    }

    const cleanName = name.trim();
    const cleanAuthor = author.trim();

    if (!cleanName) {
      throw new Error("Workspace name is required.");
    }

    if (!cleanAuthor) {
      throw new Error("Author name is required.");
    }

    await ctx.db.patch(workspaceId, {
      name: cleanName,
      author: cleanAuthor,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    editToken: v.string(),
  },

  handler: async (ctx, { workspaceId, editToken }) => {
    const workspace = await ctx.db.get(workspaceId);

    if (!workspace || workspace.editToken !== editToken) {
      throw new Error("Invalid edit token.");
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    await ctx.db.delete(workspaceId);
  },
});
