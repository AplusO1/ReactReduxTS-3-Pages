import { useCallback, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./app.module.scss";
import { ToDoList } from "../ToDoList/Todolist";
import { TaskDetails } from "../TaskDetails/TaskDetails";
import { AddTask } from "../AddTask/AddTask";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  removeTask,
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  fetchTasks,
  FilterValuesType,
  setFilter,
} from "../../slices/tasksSlice";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector<RootState, FilterValuesType>(
    (state) => state.tasks.filter,
  );
  const { tasks, loading, error } = useSelector(
    (state: RootState) => ({
      tasks: state.tasks.tasks,
      loading: state.tasks.loading,
      error: state.tasks.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasksForTodolist = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  const changeFilter = useCallback(
    (value: FilterValuesType) => {
      dispatch(setFilter(value));
    },
    [dispatch],
  );

  const removeTaskHandler = useCallback(
    (id: string) => {
      dispatch(removeTask(id));
    },
    [dispatch],
  );

  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTask(title));
    },
    [dispatch],
  );

  const changeStatusHandler = useCallback(
    (taskId: string, completed: boolean) => {
      dispatch(changeTaskStatus({ id: taskId, completed }));
    },
    [dispatch],
  );

  const changeTaskTitleHandler = useCallback(
    (taskId: string, newTitle: string) => {
      dispatch(changeTaskTitle({ id: taskId, title: newTitle }));
    },
    [dispatch],
  );

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/"
          element={
            <ToDoList
              title={"todos"}
              tasks={tasksForTodolist}
              removeTask={removeTaskHandler}
              changeFilter={changeFilter}
              changeTaskStatus={changeStatusHandler}
              changeTaskTitle={changeTaskTitleHandler}
              filter={filter}
            />
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <TaskDetails
              changeTaskTitle={changeTaskTitleHandler}
              changeTaskStatus={changeStatusHandler}
            />
          }
        />
        <Route
          path="/add-task"
          element={<AddTask addTask={addTaskHandler} />}
        />
      </Routes>
    </div>
  );
};
