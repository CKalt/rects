let idCounter = 0;

export default function generateId() {
  idCounter++;
  return idCounter;
}
