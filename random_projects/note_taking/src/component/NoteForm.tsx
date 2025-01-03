import React, { useState } from "react";
import { NoteData, Tag, Tags } from "../types";
import { marked } from "marked"; // Import the marked library to parse markdown
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: (payload: NoteData) => void;
  data?: NoteData;
}

const NoteForm: React.FC<Props> = ({ onSubmit, data }) => {
  const initialTags = data?.tags ? data.tags.map((tag) => tag.label) : [];

  const [title, setTitle] = useState(data?.title || "");
  const [tags, setTags] = useState<string[]>(initialTags);
  const [body, setBody] = useState(data?.content || "");
  const [previewMode, setPreviewMode] = useState(false); // To toggle between Markdown and HTML preview

  const handleCheckboxChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)); // Remove tag
    } else {
      setTags([...tags, tag]); // Add tag
    }
  };
  const navigagte = useNavigate();

  const handleSubmit = () => {
    const payload = {
      title,
      content: body,
      tags: tags.map((tag) => ({ id: tag, label: tag })),
    };
    onSubmit(payload);
  };

  // Convert Markdown to HTML using 'marked'
  const getMarkdownPreview = (markdown: string) => {
    return marked(markdown); // Convert the raw markdown to HTML
  };

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Note</h1>

      {/* Title Input */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter title"
        />
      </div>

      {/* Tags Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-2">
          {Object.values(Tags).map((tag: Tag) => (
            <div key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={tag.id}
                name={tag.label}
                value={tag.label}
                checked={tags.includes(tag.label)}
                onChange={() => handleCheckboxChange(tag.label)}
              />
              <label htmlFor={tag.id}>{tag.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Body Input */}
      <div className="mb-4">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter note details"
          rows={10}
        ></textarea>
      </div>

      {/* Toggle between Markdown and Preview */}
      <div className="mb-4">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Render Markdown as HTML */}
      {previewMode && (
        <div
          className="mb-4 p-10 border rounded-lg bg-gray-50"
          dangerouslySetInnerHTML={{ __html: getMarkdownPreview(body) }}
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        Save Note
      </button>

      <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
      onClick={()=>navigagte(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default NoteForm;
