import CoreError from "./core-error.error";
import { HttpStatus } from "@nestjs/common";

export default function TableNotFound() {
  return new CoreError(HttpStatus.NOT_FOUND, "Table not found.")
}