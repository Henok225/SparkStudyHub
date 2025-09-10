import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const ContentEditor = ({ onSave, title }) => {
  const [content, setContent] = useState("");

  // Render MathJax whenever content changes
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [content]);

  // Save lesson handler
  const handleSave = () => {
    if (onSave) {
      onSave( content);
    }
  };

  // Handle content change in editor
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (onSave) {
      onSave(newContent);
    }
  };

  return (
    <div className="lesson-editor">
      <h4 className="text-xl font-semibold mb-2">{title || "Create Lesson"}</h4>

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_EDITOR_API_KEY}
        value={content}
        init={{
          height: 400,
          plugins: "link lists paste image table",
          toolbar:
            "undo redo | bold italic underline | image table | bullist numlist | link | removeformat",
          images_upload_url: "/upload-image",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
        }}
        onEditorChange={handleEditorChange}
      />

      {/* Save Button */}
      <div className="mt-4">
        <button
          className="admin-button"
          onClick={handleSave} // Fixed bug here
          style={{ margin: "10px" }}
          type="button"
        >
          Save Lesson
        </button>
      </div>

      {/* Live Preview */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <div
          className="prose max-w-none mt-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ContentEditor;
