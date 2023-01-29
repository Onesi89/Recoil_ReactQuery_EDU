import React from 'react';
import { useRecoilValue } from 'recoil';
import todoListStatsState from '../../state/toDoList/todoListStatesState';

const TodoListStats = () => {
  // 아래 셀렉터는 todoList만 구독중이며 다양한 데이터로 가공함.
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } = useRecoilValue(todoListStatsState);
  const formatterdPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items Completed: {totalCompletedNum}</li>
      <li>Items UnCompleted: {totalUncompletedNum}</li>
      <li>Percent completed: {formatterdPercentCompleted}</li>
    </ul>
  );
};

export default TodoListStats;
