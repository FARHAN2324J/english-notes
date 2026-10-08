import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const noteCategory = v.union(
  v.literal("grammar"),
  v.literal("vocabulary"),
  v.literal("example"),
  v.literal("other"),
);

export default defineSchema({
  workspaces: defineTable({
    name: v.string(),
    slug: v.string(),
    author: v.string(),
    editToken: v.string(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  notes: defineTable({
    workspaceId: v.id("workspaces"),
    title: v.string(),
    content: v.any(),
    category: noteCategory,
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),
});
