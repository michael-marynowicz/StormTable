import CoreError from "./core-error.error";
import { HttpStatus } from "@nestjs/common";

export default function UserNotFoundError() {
  return new CoreError(HttpStatus.NOT_FOUND, "User not found.")
}