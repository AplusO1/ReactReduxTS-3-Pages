import { ChangeEvent } from "react";
import { TaskType } from "../ToDoList/Todolist";
import styles from "./Task.module.scss";
import { useNavigate } from "react-router-dom";

type TaskPropsType = {
  removeTask: (id: string) => void;
  changeTaskStatus: (taskId: string, completed: boolean) => void;
  changeTaskTitle: (taskId: string, newTitle: string) => void;
  t: TaskType;
};

export const Task = (props: TaskPropsType) => {
  const navigate = useNavigate();

  const onRemoveHandler = () => {
    props.removeTask(props.t.id);
  };
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.t.id, e.currentTarget.checked);
  };

  const onTaskClickHandler = () => {
    navigate(`/tasks/${props.t.id}`);
  };

  return (
    <li key={props.t.id} className={props.t.completed ? styles["is-done"] : ""}>
      <input
        className={styles.todoCheckbox}
        type="checkbox"
        checked={props.t.completed}
        onChange={onChangeStatusHandler}
      />
      <span className={styles.span} onClick={onTaskClickHandler}>
        {props.t.title}
      </span>
      <button className={styles.button} onClick={onRemoveHandler}>
        Delete
      </button>
    </li>
  );
};
