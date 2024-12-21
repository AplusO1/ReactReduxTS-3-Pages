import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { TaskType } from "../components/ToDoList/Todolist";

export type FilterValuesType = "all" | "completed" | "active";

type TasksState = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
  filter: FilterValuesType;
};

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
};

export const fetchTasks = createAsyncThunk<TaskType[]>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
      );
      if (!response.ok) throw new Error("Не удалось получить таски");
      const data: TaskType[] = await response.json();

      // выводим только 10 тасок, что бы не засорять экран
      const tasksWithStringIds = data.slice(0, 10).map((task) => ({
        ...task,
        id: String(task.id), // Преобразуем id в строку, потому что я генерю свою id с помощью uuid
      }));

      return tasksWithStringIds;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: TaskType = {
        id: v1(),
        title: action.payload,
        completed: false,
      };
      state.tasks.unshift(newTask);
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ id: string; completed: boolean }>,
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
      }
    },
    changeTaskTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    setFilter: (state, action: PayloadAction<FilterValuesType>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка в получении Тасок";
      });
  },
});

export const {
  removeTask,
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  setFilter,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
