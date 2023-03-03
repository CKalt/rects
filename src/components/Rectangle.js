import React from "react";
import PropTypes from "prop-types";
import { generateId } from "../utils/generateId";

function Rectangle({ x, y, width, height, color, isSelected, onSelect }) {
  const id = generateId();

  function handleSelect(event) {
    event.stopPropagation();
    onSelect(id);
  }

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      stroke={isSelected ? "blue" : "black"}
      strokeWidth={isSelected ? 3 : 1}
      onClick={handleSelect}
      cursor="pointer"
    />
  );
}

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Rectangle;
