import { produce } from "immer";

const updateRectangle = (rectangles, id, updates) =>
  produce(rectangles, (draftRectangles) => {
    const index = draftRectangles.findIndex((r) => r.id === id);
    if (index >= 0) {
      Object.assign(draftRectangles[index], updates);
    }
  });

const createRectangle = (rectangles, id, updates) =>
  produce(rectangles, (draftRectangles) => {
    draftRectangles.push({ id, ...updates });
  });

const deleteRectangle = (rectangles, id) =>
  produce(rectangles, (draftRectangles) => {
    const index = draftRectangles.findIndex((r) => r.id === id);
    if (index >= 0) {
      draftRectangles.splice(index, 1);
    }
  });

const moveRectangle = (rectangles, id, dx, dy) =>
  produce(rectangles, (draftRectangles) => {
    const index = draftRectangles.findIndex((r) => r.id === id);
    if (index >= 0) {
      draftRectangles[index].x += dx;
      draftRectangles[index].y += dy;
    }
  });

export { updateRectangle, createRectangle, deleteRectangle, moveRectangle };
