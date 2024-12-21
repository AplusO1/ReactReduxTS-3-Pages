import styles from "./EditableSpan.module.scss";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activeViewMode = () => {
    if (title.trim() === "") {
      setTitle(props.title);
    } else {
      props.onChange(title.trim());
    }
    setEditMode(false);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (title.trim() === "") {
        setTitle(props.title);
      } else {
        props.onChange(title.trim());
      }
      setEditMode(false);
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <input
      className={styles.input}
      value={title}
      onBlur={activeViewMode}
      onChange={onChangeTitleHandler}
      onKeyDown={onKeyDownHandler}
      autoFocus
    />
  ) : (
    <span className={styles.span} onClick={activateEditMode}>
      {props.title}
    </span>
  );
}
