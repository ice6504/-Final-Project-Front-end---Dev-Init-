import { FC } from "react";

interface NotePageProps {
  params: Params;
}

interface Params {
  title: string;
}

// components
import Editor from "../components/Editor";

const NotePage: FC<NotePageProps> = ({ params }) => {
  return (
    <div>
      <Editor data_id={decodeURIComponent(params.title)} />
    </div>
  );
};

export default NotePage;
