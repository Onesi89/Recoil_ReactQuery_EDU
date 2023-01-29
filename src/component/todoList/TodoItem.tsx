import React from 'react';
import { useRecoilState } from 'recoil';
import todoListState, { todoTypes } from '../../state/toDoList/todoListState';

const replaceItemAtIndex = (arr: todoTypes[], index: number, newValue: todoTypes) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const removeItemAtIndex = (arr: todoTypes[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

type ItemProps = {
  item: todoTypes;
};

const TodoItem = ({ item }: ItemProps) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  console.log('TodoItem start : ', item);

  const editItemText = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value.target.value,
    });
    console.log('editItemText', editItemText);
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isCompleted: !item.isCompleted,
    });
    console.log('toggleItemCompletion', toggleItemCompletion);
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    console.log('deleteItem', deleteItem);
    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isCompleted} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;
