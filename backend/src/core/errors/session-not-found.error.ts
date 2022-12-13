import CoreError from "./core-error.error";
import { HttpStatus } from "@nestjs/common";

export default function SessionNotFoundError() {
  return new CoreError(HttpStatus.NOT_FOUND, "Session not found.");
}