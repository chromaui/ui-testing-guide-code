import { useReducer, useEffect } from "react";

function getTasks(options) {
  return fetch("/tasks", options).then((res) => res.json());
}

function updateTask(tasks, id, updatedTask) {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
}
function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export const reducer = (tasks, action) => {
  switch (action.type) {
    case "UPDATE_TASKS":
      return action.tasks;
    case "ARCHIVE_TASK":
      return updateTask(tasks, action.id, { state: "TASK_ARCHIVED" });
    case "PIN_TASK":
      return updateTask(tasks, action.id, { state: "TASK_PINNED" });
    case "INBOX_TASK":
      return updateTask(tasks, action.id, { state: "TASK_INBOX" });
    case "DELETE_TASK":
      return deleteTask(tasks, action.id);
    case "EDIT_TITLE":
      return updateTask(tasks, action.id, { title: action.title });
    default:
      return tasks;
  }
};

export function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getTasks({ signal })
      .then(({ tasks }) => {
        dispatch({ type: "UPDATE_TASKS", tasks });
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.log(error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return [tasks, dispatch];
}
