import React, { useState } from "react";

const ComparisonWidget = () => {
  const [leftStack, setLeftStack] = useState(3);
  const [rightStack, setRightStack] = useState(5);
  const [mode, setMode] = useState("addRemove"); // 'addRemove' or 'drawCompare'

  const Block = () => (
    <div
      className="w-24 h-12 bg-cyan-500 border border-cyan-300 rounded-sm mb-1 
                    shadow-lg transform transition-all duration-300 
                    hover:bg-cyan-400 hover:scale-105"></div>
  );

  const Stack = ({ count, side }) => (
    <div
      className="flex flex-col-reverse items-center w-20 min-h-64 
                border-b-2 border-cyan-300 mx-8 mt-8">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Block key={`${side}-${i}`} />
        ))}
    </div>
  );

  const ControlPanel = () => (
    <div
      className="flex flex-col items-center gap-4 p-4 
                    bg-gray-800 rounded-lg shadow-xl">
      <div className="text-cyan-300 font-semibold">Control Panel</div>
      <div className="flex gap-4">
        <button
          onClick={() => setMode("addRemove")}
          className={`px-4 py-2 rounded ${
            mode === "addRemove"
              ? "bg-cyan-500 text-white"
              : "bg-gray-700 text-cyan-300"
          }`}>
          Add/Remove
        </button>
        <button
          onClick={() => setMode("drawCompare")}
          className={`px-4 py-2 rounded ${
            mode === "drawCompare"
              ? "bg-cyan-500 text-white"
              : "bg-gray-700 text-cyan-300"
          }`}>
          Draw Compare
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <label className="text-cyan-300">Left Stack</label>
          <input
            type="number"
            min="0"
            max="10"
            value={leftStack}
            onChange={(e) => setLeftStack(Number(e.target.value))}
            className="w-16 bg-gray-700 text-cyan-300 rounded p-1 
                       border border-cyan-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-cyan-300">Right Stack</label>
          <input
            type="number"
            min="0"
            max="10"
            value={rightStack}
            onChange={(e) => setRightStack(Number(e.target.value))}
            className="w-16 bg-gray-700 text-cyan-300 rounded p-1 
                       border border-cyan-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <ControlPanel />
          <div className="flex justify-center items-end w-full">
            <Stack count={leftStack} side="left" />
            <div className="text-4xl text-cyan-300 mb-8">
              {leftStack > rightStack
                ? ">"
                : leftStack < rightStack
                ? "<"
                : "="}
            </div>
            <Stack count={rightStack} side="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonWidget;
