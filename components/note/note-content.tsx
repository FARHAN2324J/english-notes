"use client";

import type { JSONContent } from "@tiptap/core";
import {
    EditorContent,
    useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type NoteContentProps = {
    content: JSONContent;
};

export function NoteContent({
    content,
}: NoteContentProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editable: false,
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    return (
        <EditorContent
            editor={editor}
            className="
        prose
        prose-zinc
        max-w-none

        [&_.ProseMirror]:text-[16px]
        [&_.ProseMirror]:leading-8
        [&_.ProseMirror]:text-[#4e4c46]
        [&_.ProseMirror]:outline-none

        [&_.ProseMirror_h2]:font-black
        [&_.ProseMirror_h2]:tracking-[-0.04em]

        [&_.ProseMirror_blockquote]:border-[#11110f]
        [&_.ProseMirror_blockquote]:text-[#77746b]

        [&_.ProseMirror_a]:text-[#11110f]
      "
        />
    );
}