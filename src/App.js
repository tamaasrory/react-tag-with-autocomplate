// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { DraggableArea } from 'react-draggable-tags';

import "rsuite/dist/rsuite.min.css";
import { AutoComplete, IconButton } from 'rsuite';
import { Plus } from '@rsuite/icons';

const App = () => {

  const [tags, setTags] = useState([
    { id: 1, content: 'apple' }, { id: 2, content: 'olive' }, { id: 3, content: 'banana' },
    { id: 4, content: 'lemon' }, { id: 5, content: 'orange' }, { id: 6, content: 'add' }
  ]);

  const [addTag, setAddTag] = useState(false);

  const clickAddTag = () => {
    setAddTag(true)
  }

  const handleAddTag = (v) => {
    if (v.target.value.length) {
      const _id = tags.length + 1;
      tags.push({ id: _id, content: v.target.value });
      fixTags(tags);
    }
    setAddTag(false)
  }

  const fixTags = (t) => {
    var tmp = t.filter(v => v.content !== 'add')
    setTags([...tmp, { id: 6, content: 'add' }])
  }

  return (
    <div>
      <DraggableArea
        tags={tags}
        isList={false}
        render={({ tag, index }) => {
          if (tag.content !== 'add') {
            return <div key={index.toString()} className="tag">
              {tag.content}
            </div>
          }
          return addTag ? <AutoComplete autoFocus={true} onPressEnter={handleAddTag} /> : <IconButton onClick={clickAddTag} className="tag" key={index.toString()} icon={<Plus />} />;
        }}
        onChange={_tags => {
          fixTags(_tags)
        }}
      />
    </div>
  );
};

export default App;
