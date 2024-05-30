"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { FC, useState, useEffect, useMemo, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import "./styles.css";

interface Props {
  data_id: string;
}

const saveToStorage = async (id: string, jsonBlocks: Block[]) => {
  try {
    localStorage.setItem(id, JSON.stringify(jsonBlocks));
  } catch (error) {
    console.error("Failed to save content to storage:", error);
  }
};

const loadFromStorage = async (id: string) => {
  try {
    const storageString = localStorage.getItem(id);
    return storageString
      ? (JSON.parse(storageString) as PartialBlock[])
      : undefined;
  } catch (error) {
    console.error("Failed to load content from storage:", error);
    return undefined;
  }
};

const Editor: FC<Props> = ({ data_id }) => {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    loadFromStorage(data_id).then((content) => {
      setInitialContent(content);
    });
  }, [data_id]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading...";
  }

  const editorTheme = theme === "light" || theme === "dark" ? theme : "light";

  return (
    <div className="py-2 sm:pt-5">
      <BlockNoteView
        editor={editor}
        editable={true}
        theme={editorTheme}
        onChange={() => {
          saveToStorage(data_id, editor.document);
        }}
      />
    </div>
  );
};

export default Editor;
