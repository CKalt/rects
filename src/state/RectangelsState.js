import { useReducer } from "react";
import rectanglesReducer from "./RectanglesStateLogicUpdate";

const defaultState = {
  rectangles: [],
  selectedRectangleIds: [],
  mode: "DRAW",
  strokeColor: "#000",
  fillColor: "#fff",
  strokeWidth: 2,
  selectedRectangleStrokeColor: "#f00",
  selectedRectangleFillColor: "#f0f0f0",
};

export default function useRectanglesState() {
  const [state, dispatch] = useReducer(rectanglesReducer, defaultState);

  return {
    state,
    dispatch,
  };
}
