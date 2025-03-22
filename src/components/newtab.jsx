// src/components/newtab.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AiDashboard from "./AIDashboard";

export const openInNewTab = () => {
  const newTab = window.open("", "_blank");
  if (newTab) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AI Dashboard</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module">
          import { createRoot } from 'https://esm.sh/react-dom@18/client';
          import React from 'https://esm.sh/react@18';
          import AiDashboard from '${window.location.origin}/src/components/AIDashboard.js';
          
          const root = createRoot(document.getElementById('root'));
          root.render(React.createElement(AiDashboard));
        </script>
      </body>
      </html>
    `;
    newTab.document.write(html);
    newTab.document.close();
  } else {
    alert("Please allow pop-ups for this website.");
  }
};
