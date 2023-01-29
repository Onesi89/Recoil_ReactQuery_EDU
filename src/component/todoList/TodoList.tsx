import React from 'react';
import { useRecoilValue } from 'recoil';
import filteredTodoListState from '../../state/toDoList/filteredTodoListState';
import todoListState from '../../state/toDoList/todoListState';
import todoListStatsState from '../../state/toDoList/todoListStatesState';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoLIstFilteres from './TodoLIstFilteres';
import TodoListStats from './TodoListStats';

const TodoList = () => {
  //   const todoList = useRecoilValue(todoListState);
  // 상위에는 selector를 만들어 하위 컴포넌트의 상태들을 구독한다.
  // 아래 셀렉터는 filter 적용하여 객체로 반환함
  // 객체를 가공하지 않는다 - > selector 필요 없음
  // 객체를 가공한다면
  // 1) 객체에 필터를 적용 필요한 객체만 리턴
  // 2) 객체에서 유의미한 데이터 추출 후 리턴

  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoLIstFilteres />
      <TodoItemCreator />

      {todoList.map((todoItem) => {
        return <TodoItem key={todoItem.id} item={todoItem} />;
      })}
    </>
  );
};

export default TodoList;
