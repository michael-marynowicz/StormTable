export default interface ViewportModel {
  rotation: number;
  position: { x: number, y: number }
  size: { width: number, height: number }
}

export function fromPosition(x: number, y: number): ViewportModel {
  return {
    rotation: 0,
    position: { x, y},
    size: { width: -1, height: -1 }
  }
}
