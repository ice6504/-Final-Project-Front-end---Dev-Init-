import { FC } from "react";

interface NotePageProps {
  params: Params;
}

interface Params {
  title: string;
}

// components
import Editor from "../components/Editor";
import ToTop from "@/app/components/ToTop";

const NotePage: FC<NotePageProps> = ({ params }) => {
  return (
    <div>
      <Editor data_id={decodeURIComponent(params.title)} />
      <ToTop />
    </div>
  );
};

export default NotePage;
