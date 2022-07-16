import React, { forwardRef, useState } from "react";
import "./index.css";
import { ReactSortable } from "react-sortablejs";
import { AutoComplete, IconButton, Tag, TagGroup } from "rsuite";
import "../node_modules/rsuite/dist/rsuite.min.css";
import { Plus } from '@rsuite/icons';

const CustomComponent = forwardRef((props, ref) => {
  return (
    <div
      className="forward-ref"
      style={{
        boxSizing: "border-box",
        padding: "5px",
        border: "1px solid green"
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

export const App = () => {
  const [state, setState] = useState([
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
  ]);

  const [typing, setTyping] = React.useState(false);

  const handleTagRemove = (id) => {
    const nextTags = state.filter((item) => item.id !== id);
    setState(nextTags);
  };

  const handleInputConfirm = (e) => {
    const tmp = e.target.value
    let nextTags = state;
    nextTags.push({id: nextTags.length+1, name:tmp});
    setState(nextTags);
    setTyping(false);
  };

  const handleInputSelect = (e) => {
    const tmp = e
    let nextTags = state;
    nextTags.push({id: nextTags.length+1, name:tmp});
    setState(nextTags);
    setTyping(false);
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <AutoComplete
          className="tag-input"
          size="xs"
          style={{ width: 70 }}
          onPressEnter={handleInputConfirm}
          onSelect={handleInputSelect}
        />
      );
    }

    return (
      <IconButton
        className="tag-add-btn"
        onClick={handleButtonClick}
        icon={<Plus />}
        appearance="ghost"
        size="xs"
      />
    );
  };

  return (
    <TagGroup>
      <ReactSortable
        expand={false}
        tag={CustomComponent}
        list={state}
        setList={setState}
        onChange={(e)=>{
          console.log(JSON.stringify(state));
        }}
      >
        {state.map((item) => (
          <Tag className="childer" key={item.id} closable onClose={() => handleTagRemove(item.id)}>{item.name}</Tag>
        ))}
        {renderInput()}
      </ReactSortable>
    </TagGroup>
  );
};

export default App;
