import { createContext, useReducer } from "react";
import { createRectangle, deleteRectangle, moveRectangle, updateRectangle } from "./RectanglesStateLogicUpdate";

const initialState = { rectangles: [] };

function rectanglesReducer(state, action) {
  switch (action.type) {
    case "CREATE_RECTANGLE":
      return { ...state, rectangles: [...state.rectangles, action.payload] };
    case "DELETE_RECTANGLE":
      return {
        ...state,
        rectangles: state.rectangles.filter(
          (rectangle) => rectangle.id !== action.payload
        ),
      };
    case "UPDATE_RECTANGLE":
      const updatedRectangleIndex = state.rectangles.findIndex(
        (rectangle) => rectangle.id === action.payload.id
      );
      const updatedRectangles = [...state.rectangles];
      updatedRectangles[updatedRectangleIndex] = action.payload;
      return { ...state, rectangles: updatedRectangles };
    case "MOVE_RECTANGLE":
      const movedRectangleIndex = state.rectangles.findIndex(
        (rectangle) => rectangle.id === action.payload.id
      );
      const movedRectangles = [...state.rectangles];
      movedRectangles[movedRectangleIndex] = action.payload;
      return { ...state, rectangles: movedRectangles };
    default:
      return state;
  }
}

export const RectanglesContext = createContext(null);

export const RectanglesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rectanglesReducer, initialState);

  const value = {
    rectanglesState: state,
    createRectangle: (rectangle) =>
      dispatch({ type: "CREATE_RECTANGLE", payload: createRectangle(rectangle) }),
    deleteRectangle: (id) =>
      dispatch({ type: "DELETE_RECTANGLE", payload: id }),
    updateRectangle: (rectangle) =>
      dispatch({ type: "UPDATE_RECTANGLE", payload: updateRectangle(rectangle) }),
    moveRectangle: (rectangle) =>
      dispatch({ type: "MOVE_RECTANGLE", payload: moveRectangle(rectangle) }),
  };

  return (
    <RectanglesContext.Provider value={value}>
      {children}
    </RectanglesContext.Provider>
  );
};
