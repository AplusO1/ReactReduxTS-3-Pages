import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import styles from "./TaskDetails.module.scss";

type TaskDetailsProps = {
  changeTaskTitle: (taskId: string, newTitle: string) => void;
  changeTaskStatus: (taskId: string, completed: boolean) => void;
};

export const TaskDetails = (props: TaskDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const task = tasks.find((task) => task.id === id);

  const onBackClick = () => navigate("/");

  if (!task) return <div>Task not found</div>;

  return (
    <div className={styles.inputWrapper}>
      <h2>Task Details</h2>
      <div>ID: {task.id}</div>
      <div>
        Title:{" "}
        <EditableSpan
          title={task.title}
          onChange={(newTitle) => props.changeTaskTitle(task.id, newTitle)}
        />
      </div>
      <div>Status: {task.completed ? "Выполнено" : "Не выполнено"}</div>
      <div className={styles.buttonList}>
        <button onClick={onBackClick}>Назад</button>
        <button
          onClick={() => props.changeTaskStatus(task.id, !task.completed)}
        >
          {task.completed ? "Таска Завершена" : "Завершить Таску"}
        </button>
      </div>
    </div>
  );
};
