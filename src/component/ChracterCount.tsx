import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import charCountState from '../state/charCountState';
import textState from '../state/TextState';

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
};

export { TextInput };

const ChracterCount = () => {
  const count = useRecoilValue(charCountState);

  return <>Character Count : {count}</>;
  //   return <TextInput />;
};

export default ChracterCount;
