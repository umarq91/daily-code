export type NoteData = {
  title: string;
  content: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export const Tags = {react
  : { id: "react", label: "React" },
  js: { id: "js", label: "JavaScript" },
  ts: { id: "ts", label: "TypeScript" },
  node: { id: "node", label: "Node.js" },
    next: { id: "next", label: "Next.js" },    
};
