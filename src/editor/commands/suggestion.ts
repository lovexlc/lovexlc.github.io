import tippy, { type Instance, type Props } from "tippy.js";
import { createMenu } from "./menu.tsx";
import { Editor } from "@tiptap/core";
import { pickFile } from "./dialog";

const commands = [
  {
    title: "Bold",
    shortcut: "b",
    description: "Make text bold",
    icon: "B",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleBold().run();
    },
  },
  {
    title: "Italic",
    shortcut: "i",
    description: "Make text italic",
    icon: "I",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleItalic().run();
    },
  },
  {
    title: "Strike",
    shortcut: "s",
    description: "Add strikethrough to text",
    icon: "S",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).toggleStrike().run();
    },
  },
  {
    title: "Heading 1",
    shortcut: "h1",
    description: "Large section heading",
    icon: "H1",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    shortcut: "h2",
    description: "Medium section heading",
    icon: "H2",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    shortcut: "h3",
    description: "Small section heading",
    icon: "H3",
    command: ({ editor, range }: any) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Code Block",
    shortcut: "code",
    description: "Add a code block",
    icon: "{ }",
    command: ({ editor, range }: any) => {
      (editor as Editor).chain().focus().deleteRange(range).setCodeBlock().run();
    },
  },
  {
    title: "Quote",
    shortcut: "q",
    description: "Add a blockquote",
    icon: "❝",
    command: ({ editor, range }: any) => {
      (editor as Editor).chain().focus().deleteRange(range).setBlockquote().run();
    },
  },
  {
    title: "Task List",
    shortcut: "task",
    description: "Add a task list",
    icon: "☐",
    command: ({ editor, range }: any) => {
      (editor as Editor).chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Image",
    shortcut: "img",
    description: "Upload an image",
    icon: "🖼",
    command: async ({ editor, range }: any) => {
      const files = await pickFile();
      if (!files) return;
      [...files].forEach((file) => {
        const url = URL.createObjectURL(file);
        (editor as Editor).chain().focus().deleteRange(range).setImage({ src: url, alt: file.name }).run();
      });
    },
  },
];

export default {
  items: ({ query }: any) => {
    console.log("用户输入的查询字符串 (query):", query);
    const filteredItems = commands
      .filter((item) => {
        const normalizedQuery = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.shortcut.toLowerCase().includes(normalizedQuery)
        );
      })
      .slice(0, 10);
    console.log("过滤后的建议项 (filteredItems):", filteredItems);
    return filteredItems;
  },

  render: () => {
    let component:
    let popup:

    return {
      onStart: (props: any) => {
        component = createMenu(props);
        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.dom,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup?.[0].hide();

          return true;
        }

        return component?.onKeyDown(props);
      },

      onExit() {
        popup?.[0].destroy();
        component.destroy();
      },
    };
  },
};
