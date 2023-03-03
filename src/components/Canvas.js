import React, { useContext } from 'react';
import { RectanglesContext } from '../state/RectanglesState';

function Canvas(props) {
  const { state } = useContext(RectanglesContext);
  const { rectangles } = state || {};

  const rectanglesRender = rectangles?.map(rectangle => (
    <div
      key={rectangle.id}
      style={{
        position: 'absolute',
        top: rectangle.top,
        left: rectangle.left,
        width: rectangle.width,
        height: rectangle.height,
        backgroundColor: rectangle.color,
      }}
    ></div>
  ));

  return (
    <div
      className="canvas"
      style={{
        width: props.width,
        height: props.height,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {rectanglesRender}
    </div>
  );
}

export default Canvas;
