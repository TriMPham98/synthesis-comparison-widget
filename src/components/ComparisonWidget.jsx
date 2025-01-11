import React, { useState, useEffect, useRef } from "react";

const ComparisonWidget = () => {
  const [leftStack, setLeftStack] = useState(3);
  const [rightStack, setRightStack] = useState(5);
  const [mode, setMode] = useState("addRemove");
  const [blockSpacing, setBlockSpacing] = useState(5);
  const leftStackRef = useRef(null);
  const rightStackRef = useRef(null);

  const Block = () => (
    <div
      className="w-24 h-12 bg-cyan-500 border border-cyan-300 rounded-sm 
                 shadow-lg transform transition-all duration-300 
                 hover:bg-cyan-400 hover:scale-105"></div>
  );

  useEffect(() => {
    const maxBlocks = Math.max(leftStack, rightStack);
    const availableSpace = 400;
    const spacing =
      maxBlocks > 1 ? Math.floor(availableSpace / (maxBlocks - 1) / 4) : 0;
    setBlockSpacing(spacing);
  }, [leftStack, rightStack]);

  const handleClick = (side) => {
    if (mode === "addRemove") {
      if (side === "left") setLeftStack((prev) => Math.min(prev + 1, 10));
      else setRightStack((prev) => Math.min(prev + 1, 10));
    }
  };

  const handleDrag = (e, side) => {
    if (mode === "addRemove") {
      const dragDistance = e.movementY; // Positive for downward drag
      if (dragDistance > 0) {
        // Dragging down removes blocks
        if (side === "left") setLeftStack((prev) => Math.max(prev - 1, 0));
        else setRightStack((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const Stack = ({ count, side }) => {
    const ref = side === "left" ? leftStackRef : rightStackRef;

    return (
      <div
        ref={ref}
        className="flex flex-col-reverse items-center w-20 min-h-full 
                   border-b-2 border-cyan-300 mx-8 cursor-pointer" // Added cursor-pointer class
        style={{
          position: "absolute",
          left: side === "left" ? "calc(33.33% - 40px)" : "auto",
          right: side === "right" ? "calc(33.33% - 40px)" : "auto",
          top: 0,
          bottom: 0,
          justifyContent: "center",
        }}
        onClick={() => handleClick(side)}
        onMouseDown={(e) => {
          if (mode === "addRemove") {
            ref.current.addEventListener("mousemove", (e) =>
              handleDrag(e, side)
            );
          }
        }}
        onMouseUp={() => {
          if (mode === "addRemove") {
            ref.current.removeEventListener("mousemove", handleDrag);
          }
        }}
        onMouseLeave={() => {
          if (mode === "addRemove") {
            ref.current.removeEventListener("mousemove", handleDrag);
          }
        }}>
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={`${side}-${i}`} style={{ marginBottom: blockSpacing }}>
              <Block />
            </div>
          ))}
      </div>
    );
  };

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
    <div className="w-full min-h-screen bg-gray-900 p-8 relative">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <ControlPanel />
          <div className="w-full h-[500px] relative">
            <Stack count={leftStack} side="left" />
            <Stack count={rightStack} side="right" />
            <div
              className="text-4xl text-cyan-300 absolute z-10"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              {leftStack > rightStack
                ? ">"
                : leftStack < rightStack
                ? "<"
                : "="}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonWidget;
