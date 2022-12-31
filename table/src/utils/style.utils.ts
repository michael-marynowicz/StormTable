import ViewportModel from "../app/models/viewport.model";

export function transform(transform: ViewportModel) {
  let result = `--transform-x: ${transform.position.x}px; --transform-y: ${transform.position.y}px; --transform-rotation: ${transform.rotation}deg;`;

  if (transform.size.width !== -1) {
    result += `--transform-width: ${transform.size.width}px;`
  } else {
    result += "--transform-width: initial;"
  }

  if (transform.size.height !== -1) {
    result += `--transform-height: ${transform.size.height}px;`
  } else {
    result += "--transform-height: initial;"
  }

  return result;
}
