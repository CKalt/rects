import React, { useRef, useState } from 'react';
import Rectangle from './Rectangle';
import useCanvas from '../hooks/useCanvas';
import { generateId } from '../utils/generateId';
import RectanglesState from '../state/RectanglesState';

function Rectangles() {
  const canvasRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [selectedRectangleId, setSelectedRectangleId] = useState(null);
  const [isAddingRectangle, setIsAddingRectangle] = useState(false);

  useCanvas(canvasRef, () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const rectangle of rectangles) {
      const isSelected = rectangle.id === selectedRectangleId;

      Rectangle.draw(ctx, rectangle, isSelected);
    }
  });

  function handleCanvasClick(event) {
    if (isAddingRectangle) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRectangle = {
        id: generateId(),
        x,
        y,
        width: 100,
        height: 100,
        color: RectanglesState.getColor(),
      };

      setRectangles([...rectangles, newRectangle]);
      setIsAddingRectangle(false);
    }
  }

  function handleCanvasMouseMove(event) {
    if (isAddingRectangle) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const latestRectangle = rectangles[rectangles.length - 1];
      const newWidth = x - latestRectangle.x;
      const newHeight = y - latestRectangle.y;
      const newRectangle = {
        ...latestRectangle,
        width: newWidth,
        height: newHeight,
      };

      setRectangles([
        ...rectangles.slice(0, rectangles.length - 1),
        newRectangle,
      ]);
    }
  }

  function handleRectangleClick(rectangle) {
    setSelectedRectangleId(rectangle.id);
  }

  function handleRectangleUnselect() {
    setSelectedRectangleId(null);
  }

  function handleRectangleDelete(rectangle) {
    setRectangles(
      rectangles.filter((r) => r.id !== rectangle.id)
    );

    RectanglesState.decrementCount();
  }

  function handleAddRectangleClick() {
    setIsAddingRectangle(true);
    setSelectedRectangleId(null);
    RectanglesState.incrementCount();
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />
      <div className="controls">
        <button onClick={handleAddRectangleClick}>Add Rectangle</button>
        <div className="color-display" style={{ backgroundColor: RectanglesState.getColor() }}></div>
      </div>
      <div className="rectangle-info">
        {selectedRectangleId && (
          <Rectangle.Info
            rectangle={rectangles.find((r) => r.id === selectedRectangleId)}
            onDelete={handleRectangleDelete}
            onUnselect={handleRectangleUnselect}
          />
        )}
      </div>
    </div>
  );
}

export default Rectangles;
