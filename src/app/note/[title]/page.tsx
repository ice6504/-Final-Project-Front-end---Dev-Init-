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
import DeletePage from "@/app/components/DeletePage";

const NotePage: FC<NotePageProps> = ({ params }) => {
  const paramsId = decodeURIComponent(params.title);
  const ampersandIndex = paramsId.indexOf("&");
  const displayedTitle = paramsId.slice(0, ampersandIndex);

  return (
    <div>
      <div className="fixed top-5 right-5 z-40 max-lg:hidden">
        <DeletePage />
      </div>
      <h2 className="mt-4 text-6xl text-primary text-center font-semibold max-lg:hidden">
        {displayedTitle} Note
      </h2>
      <Editor data_id={decodeURIComponent(params.title)} />
      <ToTop />
    </div>
  );
};

export default NotePage;
