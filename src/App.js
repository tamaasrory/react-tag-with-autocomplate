// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import { Tag, TagGroup, IconButton, AutoComplete } from 'rsuite';
import Plus from '../node_modules/@rsuite/icons/es/icons/Plus';

import "rsuite/dist/rsuite.min.css";
var math = require('mathjs');

var parser = math.parser()

const App = () => {
  const [tags, setTags] = React.useState(['(', '16|26 Taiko Mas', '+', '68|39 Taiko Mas', ')', '/', '1000']);
  const [typing, setTyping] = React.useState(false);
  const [isCorrectFormula, setCorrectFormula] = React.useState(true);
  const [fml, setFml] = React.useState('');
  const [fmlErr, setFmlErr] = React.useState('');
  const data = [
    'Taiko Nusantara',
    'Tonsil 331 SD',
    'Tonsil 331 M',
  ];

  const handleTagRemove = (tag) => {
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const handleSelectConfirm = (e) => {
    console.log('select => ', e);
    const nextTags = e ? [...tags, e] : tags;
    setTags(nextTags);
    setTyping(false);
  };

  const handleInputConfirm = (e) => {
    const val = e.target.value
    const nextTags = val ? [...tags, val] : tags;
    setTags(nextTags);
    setTyping(false);
  };

  useEffect(() => {
    let formula = '';
    for (const [i, v] of tags.entries()) {
      if (v.match(/[a-z]/gi)) {
        const t = v.replace(/[ |]/gi, '_')
        formula += `_${t} `;
        parser.evaluate(`_${t}=${i + 1}`)
        console.log(`_${t}=${i + 1}`);
      } else {
        formula += `${v} `;
      }
    }

    try {
      console.log('ok => ', parser.evaluate(formula));
      setCorrectFormula(true)
    } catch (err) {
      setFmlErr(err.message)
      setCorrectFormula(false)
    }
    setFml(formula)
  }, [tags]);

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <AutoComplete
          data={data}
          className="tag-input"
          size="xs"
          autoFocus={true}
          style={{ width: 70 }}
          onSelect={handleSelectConfirm}
          onPressEnter={handleInputConfirm} />
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
    <div>
      <div style={{ marginLeft: 20, marginTop: 20, marginRight: 20, border: 1, borderStyle: 'dashed', borderRadius: 7, height: 150, padding: 10 }}>
        <TagGroup>
          {tags.map((item, index) => (
            <Tag key={index} closable onClose={() => handleTagRemove(item)}>
              {item}
            </Tag>
          ))}
          {renderInput()}
        </TagGroup>
      </div>
      <div style={{
        marginLeft: 20, marginTop: 10, marginRight: 20, color: isCorrectFormula ? 'green' : 'red'
      }}>
        {isCorrectFormula ? 'Formula is Correct' : 'Formula is Incorrect [ ' + fmlErr + ' ]'} : {fml}
      </div>
    </div>
  );
};

export default App;
