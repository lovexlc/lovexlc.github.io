import * as React from "jsx-dom";

export const createMenu = (props: {
  items: {
    title: string;
    description: string;
    icon: string;
    shortcut: string;
    command: any;
  }[];
  editor: any;
  command: any;
}) => {
  let { items } = props; // 使用 let 声明 items，使其可被修改
  const root = <div class="ud-wrapper slash-menu" role="menu"></div> as HTMLElement;
  let buttons: HTMLElement[] = []; // 用于存储按钮元素
  let selectedIndex = 0;
  let commandRange: { from: number; to: number } | null = null; // 新增：用于存储触发命令的文本范围

  const renderButtons = () => {
    buttons = items.map((item) => {
      return (
        <button
          class="slash-command-item"
          onClick={() => {
            // 在执行命令前删除触发命令的文本
            if (commandRange) {
              props.editor.chain().focus().deleteRange(commandRange).run();
            }
            props.command(item);
            // 执行命令后关闭菜单
            props.editor.chain().focus().run();
            root.remove();
          }}
          role="menuitem"
        >
          <span class="slash-command-icon">{item.icon}</span>
          <div class="slash-command-content">
            <div class="slash-command-header">
              <span class="slash-command-title">{item.title}</span>
              <span class="slash-command-shortcut">/{item.shortcut}</span>
            </div>
            <span class="slash-command-description">{item.description}</span>
          </div>
        </button>
      ) as HTMLElement;
    });

    // 移除旧的 buttons
    root.innerHTML = '';
    // 添加新的 buttons
    root.append(...buttons);
    setSelectedIndex(0);
  };

  const setSelectedIndex = (index: number) => {
    selectedIndex = index;
    buttons.forEach((bt, i) => {
      if (index === i) {
        bt.classList.add("selected");
        bt.setAttribute("aria-selected", "true");
      } else {
        bt.classList.remove("selected");
        bt.setAttribute("aria-selected", "false");
      }
    });
  };

  const upHandler = () => {
    selectedIndex = selectedIndex === 0 ? buttons.length - 1 : selectedIndex - 1;
    setSelectedIndex(selectedIndex);
  };

  const downHandler = () => {
    selectedIndex = selectedIndex === buttons.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(selectedIndex);
  };

  const enterHandler = () => {
    props.command(items[selectedIndex]);
    // 执行命令后关闭菜单
    props.editor.chain().focus().run();
    root.remove();
  };

  const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
    if (event.key === "ArrowUp") {
      upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      enterHandler();
      return true;
    }

    return false;
  };

  const updateProps = (newProps: any) => {
    // 比较 newProps.items 和当前的 items 是否相同，如果不同则重新渲染菜单
    if (newProps.items !== items) {
      items = newProps.items; // 更新 items
      renderButtons(); // 重新渲染按钮
    }
  };

  // 初始渲染
  renderButtons();

  return {
    dom: root,
    updateProps,
    onKeyDown,
    destroy: () => root.remove(),
  };
};
