export function getRectangleUnderPoint(rectangles, point) {
    return rectangles.find((rectangle) => {
      const { x, y, width, height } = rectangle;
      return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
    });
  }
  
  export function handleRectangleMouseDown(rectangle, e, state, setState) {
    const { isSelectionMode } = state;
    if (isSelectionMode) {
      setState((prevState) => ({
        ...prevState,
        isDragging: true,
        dragStartPoint: { x: e.clientX, y: e.clientY },
        selectedRectangleIds: {
          ...prevState.selectedRectangleIds,
          [rectangle.id]: true,
        },
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isDragging: true,
        dragStartPoint: { x: e.clientX, y: e.clientY },
        rectangles: prevState.rectangles.map((r) =>
          r.id === rectangle.id ? { ...r, isDragging: true } : r
        ),
      }));
    }
  }
  
  export function handleCanvasMouseUp(e, state, setState) {
    setState((prevState) => ({
      ...prevState,
      isDragging: false,
      dragStartPoint: null,
      rectangles: prevState.rectangles.map((r) => ({ ...r, isDragging: false })),
    }));
  }
  