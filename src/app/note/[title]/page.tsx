import { FC } from "react";

interface NotePageProps {
  params: Params;
}

interface Params {
  title: string;
}

const NotePage: FC<NotePageProps> = ({ params }) => {
  return <div>{decodeURIComponent(params.title)} page</div>;
};

export default NotePage;
