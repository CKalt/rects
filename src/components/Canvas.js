import React, { useRef, useEffect } from 'react';
import useCanvas from '../hooks/useCanvas';
import { RectanglesContext } from '../state/RectanglesState';

function Canvas() {
  const canvasRef = useRef(null);
  const { state, dispatch } = React.useContext(RectanglesContext);
  const { rectangles, mode, activeId, fillColor, strokeColor, strokeWidth } = state;
  const { drawRectangle, clearCanvas, selectRectangle } = useCanvas(canvasRef);

  useEffect(() => {
    clearCanvas();
    rectangles.forEach((rectangle) => drawRectangle(rectangle));
  }, [rectangles, clearCanvas, drawRectangle]);

  const handleCanvasClick = (event) => {
    if (mode === 'DRAW') {
      dispatch({
        type: 'ADD_RECTANGLE',
        payload: {
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
          fillColor,
          strokeColor,
          strokeWidth,
        },
      });
    } else if (mode === 'SELECT') {
      selectRectangle(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  const handleCanvasMouseMove = (event) => {
    if (mode === 'DRAW') {
      dispatch({
        type: 'SET_PREVIEW_RECTANGLE',
        payload: {
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        },
      });
    }
  };

  const handleRectangleDelete = (rectangle) => {
    dispatch({
      type: 'REMOVE_RECTANGLE',
      payload: {
        id: rectangle.id,
      },
    });
  };

  const handleRectangleUpdate = (rectangle, update) => {
    dispatch({
      type: 'UPDATE_RECTANGLE',
      payload: {
        id: rectangle.id,
        update,
      },
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
    >
      {rectangles
        .filter((rectangle) => rectangle.id === activeId)
        .map((rectangle) => (
          <div key={rectangle.id}>
            <button onClick={() => handleRectangleDelete(rectangle)}>Delete</button>
            <Rectangle
              key={rectangle.id}
              rectangle={rectangle}
              handleRectangleUpdate={handleRectangleUpdate}
            />
          </div>
        ))}
    </canvas>
  );
}

export default Canvas;
