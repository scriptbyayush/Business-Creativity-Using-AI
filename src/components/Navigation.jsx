// src/components/Navigation.jsx
import React from "react";
import { openInNewTab } from "./newtab";

const Navigation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={openInNewTab}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Open AI Dashboard
      </button>
    </div>
  );
};

export default Navigation;
