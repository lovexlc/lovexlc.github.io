import * as React from "jsx-dom";

export const createMenu = (props: { 
  items: { 
    title: string; 
    description: string; 
    icon: string; 
    shortcut: string;
    command: any 
  }[]; 
  editor: any; 
  command: any 
}) => {
  const { items } = props;
  const buttons = items.map((item) => {
    return (
      <button
        class="slash-command-item"
        onClick={() => {
          props.command(item);
        }}>
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
  const root = (<div class="ud-wrapper slash-menu">{buttons}</div>) as HTMLElement;
  let selectedIndex = 0;
  const setSelectedIndex = (index: number) => {
    buttons.forEach((bt, i) => {
      if (index === i) {
        bt.classList.add("selected");
      } else {
        bt.classList.remove("selected");
      }
    });
  };
  setSelectedIndex(0);
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
  };
  root.append(...buttons);
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
  const updateProps = (_p: any) => {};

  return {
    dom: root,
    updateProps,
    onKeyDown,
    destroy: () => root.remove(),
  };
};
