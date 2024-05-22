import { FC } from "react";

interface TodoPageProps {
  params: Params;
}

interface Params {
  title: string;
}

const TodoPage: FC<TodoPageProps> = ({ params }) => {
  return <div>{decodeURIComponent(params.title)} page</div>;
};

export default TodoPage;
