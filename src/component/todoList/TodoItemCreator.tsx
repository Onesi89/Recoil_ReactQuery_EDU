import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import todoListState from '../../state/toDoList/todoListState';

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const [cusId, setcusId] = useState<number>(1);
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((currVal) => [
      ...currVal,
      {
        id: cusId,
        text: inputValue,
        isCompleted: false,
      },
    ]);
    setInputValue('');
    setcusId(cusId + 1);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type={'text'} value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
