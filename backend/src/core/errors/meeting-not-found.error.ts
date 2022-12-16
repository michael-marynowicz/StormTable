import CoreError from "./core-error.error";
import { HttpStatus } from "@nestjs/common";

export default function MeetingNotFound() {
  return new CoreError(HttpStatus.NOT_FOUND, "Meeting not found.")
}