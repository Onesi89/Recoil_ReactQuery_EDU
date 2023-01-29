import React from 'react';
import { useRecoilState } from 'recoil';
import todoListFilterState from '../../state/toDoList/todoListFilterState';

const TodoLIstFilteres = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(value.target.value);
  };
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoLIstFilteres;
