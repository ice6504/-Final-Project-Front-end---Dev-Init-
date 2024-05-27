"use client";
import { FC, useState, useEffect } from "react";

// components
import ToTop from "@/app/components/ToTop";
import DeletePage from "@/app/components/DeletePage";

interface TodoPageProps {
  params: Params;
}

interface Params {
  title: string;
}

interface ToDo {
  id: string;
  text: string;
  checked: boolean;
}

const TodoPage: FC<TodoPageProps> = ({ params }) => {
  const paramsId = decodeURIComponent(params.title);
  const ampersandIndex = paramsId.indexOf("&");
  const displayedTitle = paramsId.slice(0, ampersandIndex);
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ToDo | null>(null);
  const [todos, setTodos] = useState<ToDo[]>(() => {
    const savedTodos = localStorage.getItem(paramsId);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(paramsId, JSON.stringify(todos));
  }, [todos, paramsId]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: inputValue.trim(),
          checked: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleModal = (todo: ToDo | null = null) => {
    setCurrentTodo(todo);
    setIsModalOpen(!isModalOpen);
  };

  const handleEditForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTodo && currentTodo.text.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === currentTodo.id ? currentTodo : todo
        )
      );
      toggleModal();
    }
  };

  const handleDelete = () => {
    if (currentTodo) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== currentTodo.id)
      );
      toggleModal();
    }
  };

  const handleDeleteAllChecked = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.checked));
  };

  const handleCheckboxChange = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-40 max-lg:hidden">
        <DeletePage />
      </div>
      <div className="min-h-full grid place-items-center py-5 p-3 max-lg:pt-3">
        <div className="px-2 space-y-5">
          <div className="flex flex-col items-center space-y-3">
            <h2 className="text-6xl text-primary text-center font-semibold max-lg:hidden">
              {displayedTitle} ToDo
            </h2>
            <div className="flex gap-2">
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center border-2 border-primary rounded-full pl-3"
              >
                <input
                  type="text"
                  className="input bg-transparent w-full sm:w-96 rounded-full p-2"
                  placeholder="Add Your ToDo"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Add Your ToDo"
                />
                <button
                  type="submit"
                  className="btn btn-primary rounded-full w-20"
                  aria-label="Add ToDo"
                >
                  Add
                </button>
              </form>
              {todos.some((todo) => todo.checked) && (
                <button
                  className="btn btn-error text-xs ring-2 ring-error rounded-full"
                  onClick={handleDeleteAllChecked}
                  aria-label="Delete All Checked"
                >
                  <i className="fa-solid fa-trash-can"></i> All Checked
                </button>
              )}
            </div>
          </div>
          <ul className="h-full space-y-2">
            {todos.map((todo) => (
              <li className="w-full" key={todo.id}>
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary rounded-full"
                    checked={todo.checked}
                    onChange={() => handleCheckboxChange(todo.id)}
                    aria-label={`Mark ${todo.text} as ${
                      todo.checked ? "incomplete" : "complete"
                    }`}
                  />
                  <span
                    className={`text-lg sm:text-xl break-all flex-1 ${
                      todo.checked ? "line-through text-base-content/50" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    className="btn btn-circle btn-sm btn-primary"
                    onClick={() => toggleModal(todo)}
                    aria-label={`Edit ${todo.text}`}
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && currentTodo && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box">
            <button
              onClick={() => toggleModal()}
              className="btn btn-sm btn-circle btn-outline btn-primary text-primary absolute right-3 top-2"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <form onSubmit={handleEditForm}>
              <input
                type="text"
                value={currentTodo.text}
                className="input bg-primary text-base-100 placeholder:text-base-100/50 w-full mt-8"
                onChange={(e) =>
                  setCurrentTodo({
                    ...currentTodo,
                    text: e.target.value,
                  })
                }
                aria-label="Edit ToDo"
              />
              <div className="flex justify-between gap-5 mt-4">
                <button
                  type="submit"
                  className="btn btn-success btn-outline w-[47%] sm:w-[48%]"
                  aria-label="Save Changes"
                >
                  Save <i className="fa-solid fa-check"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-outline w-[47%] sm:w-[48%]"
                  onClick={handleDelete}
                  aria-label="Delete ToDo"
                >
                  Delete <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <ToTop />
    </>
  );
};

export default TodoPage;
