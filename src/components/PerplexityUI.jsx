import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";

import { MessageCircle, Settings,  BarChart, Home, Paperclip, X, Maximize2, Minimize2, Layout, Share } from 'lucide-react';

const LAYOUTS = {
  GRID: 'grid',
  STACK: 'stack',
  SPLIT: 'split',
  FOCUS: 'focus'
};

const ChatBox = ({ id, isMaximized, onMaximize, onShare, layout }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        text: inputValue, 
        type: "question",
        timestamp: new Date().toISOString()
      }]);
      setInputValue('');
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  return (
    <div 
      className={`flex flex-col bg-gray-900 rounded-lg border border-gray-700 transition-all duration-300 ease-in-out
        ${isMaximized ? 'fixed inset-4 z-50' : 'h-full'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
        <span className="text-gray-200 font-medium">Chat {id}</span>
        <div className="flex space-x-2">
          <button 
            onClick={onShare}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Share size={16} />
          </button>
          <button 
            onClick={onMaximize}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 transform transition-transform duration-200 hover:scale-[1.02]"
          >
            <p className="text-gray-200">{message.text}</p>
            <span className="text-gray-500 text-xs mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        {attachment && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex items-center justify-between">
            <span className="text-gray-300 text-sm">{attachment}</span>
            <button 
              onClick={() => setAttachment(null)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="w-full p-2 pr-20 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <label className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors">
                <Paperclip size={20} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleAttachment}
                />
              </label>
              <button type="submit" className="text-gray-400 hover:text-gray-200 transition-colors">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PerplexityUI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [layout, setLayout] = useState(LAYOUTS.GRID);
  const [maximizedChat, setMaximizedChat] = useState(null);
  const [isChangingLayout, setIsChangingLayout] = useState(false);

  const handleTabChange = (newTab) => {
    setIsChangingLayout(true);
    setActiveTab(newTab);
    setTimeout(() => setIsChangingLayout(false), 300);
  };

  const getLayoutClassName = () => {
    switch(layout) {
      case LAYOUTS.STACK:
        return 'flex flex-col space-y-4';
      case LAYOUTS.SPLIT:
        return 'grid grid-cols-2 gap-4';
      case LAYOUTS.FOCUS:
        return 'grid grid-cols-2 grid-rows-2 gap-4';
      default: // GRID
        return 'grid grid-cols-2 gap-4';
    }
  };

  const handleShare = (fromId) => (toId) => {
    // Implement chat sharing logic here
    console.log(`Sharing from chat ${fromId} to chat ${toId}`);
  };

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Left Navigation */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="h-8 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-200 font-bold">P</span>
            </div>
            <span className="font-semibold text-lg text-gray-200">Perplexity AI</span>
          </div>
        </div>

        {/* Layout Selector */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex space-x-2">
            {Object.values(LAYOUTS).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`p-2 rounded-lg transition-colors ${
                  layout === l 
                    ? 'bg-gray-800 text-gray-200' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <Layout size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { icon: Home, label: 'Dashboard', id: 'dashboard' },
              { icon: Search, label: 'Search', id: 'search' },
              { icon: MessageCircle, label: 'Chat', id: 'chat' },
              { icon: BarChart, label: 'Analytics', id: 'analytics' },
              { icon: Settings, label: 'Settings', id: 'settings' }
            ].map(({ icon: Icon, label, id }) => (
              <li
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gray-800 text-gray-200 transform scale-105'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden">
        <div 
          className={`h-full ${getLayoutClassName()} ${
            isChangingLayout ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } transition-all duration-300 ease-in-out`}
        >
          {[1, 2, 3, 4].map((id) => (
            <ChatBox
              key={id}
              id={id}
              layout={layout}
              isMaximized={maximizedChat === id}
              onMaximize={() => setMaximizedChat(maximizedChat === id ? null : id)}
              onShare={() => handleShare(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerplexityUI;