// 1️⃣: replace the below with your Brev API
export const BREV_URL = "https://ecnhyo6y.brev.dev/api/todo";

export interface TodoType {
  id: string;
  title: string;
  isComplete: boolean;
}

interface MultipleToDos {
  todos: TodoType[];
}

export const GetTodos = async () => {
  let response = await fetch(BREV_URL, {
    method: "GET"
  });
  return (await response.json()) as MultipleToDos;
};

export const CreateTodo = async (newTitle: string) => {
  let response = await fetch(BREV_URL, {
    method: "POST",
    body: JSON.stringify({
      title: newTitle,
      isComplete: false
    })
  });
  return await response.json();
};

export const ModifyTodo = async (id: string) => {
  let response = await fetch(BREV_URL + `?id=${id}`, {
    method: "PUT"
  });
  return await response.json();
};
