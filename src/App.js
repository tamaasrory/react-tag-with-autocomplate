// import logo from './logo.svg';
import './App.css';
import React from "react";
import { DraggableArea } from 'react-draggable-tags';

// import "rsuite/dist/rsuite.min.css";
import { IconButton } from 'rsuite';
import { Plus } from '@rsuite/icons';

const App = () => {

  const renderButton = () => {
    return (
      <IconButton className="tag" id={111} icon={<Plus id={4555} />} />
    )
  };

  const initialTags = [
    { id: 1, content: 'apple' }, { id: 2, content: 'olive' }, { id: 3, content: 'banana' },
    { id: 4, content: 'lemon' }, { id: 5, content: 'orange' }
  ];
  return (
    <div>
      <DraggableArea
        tags={initialTags}
        render={({ tag, index }) => {
          if (tag.content) {
            return <div id={index} className="tag">
              {tag.content}
            </div>
          }
        }}
        onChange={tags => console.log((tags))}
      />
      {renderButton()}
    </div>
  );
};

export default App;
