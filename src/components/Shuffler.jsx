import React, { useState, useEffect } from 'react';

const ShufflerComponent = () => {
  const words = ["Productivity", "Banners", "Posters", "Data", "AI"];
  const [word, setWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWord((prev) => words[(words.indexOf(prev) + 1) % words.length]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-5 w-9 ">
      <h1 className="text-6xl font-bold fade-animation" style={{
        background: 'linear-gradient(135deg, #a855f7, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {word}
      </h1>
      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .fade-animation {
          animation: fade 1s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default ShufflerComponent;
