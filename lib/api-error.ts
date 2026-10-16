import { toast } from "sonner";

export const SESSION_EXPIRED_MESSAGE =
  "Your session has expired. Please log in again.";

const SERVER_MESSAGE =
  "Something went wrong on our side. Please try again in a moment.";
const OFFLINE_MESSAGE =
  "You appear to be offline. Check your internet connection.";
const UNREACHABLE_MESSAGE =
  "Can't reach the server right now. Please try again.";
const GENERIC_MESSAGE = "Something went wrong. Please try again.";

// Plain-language messages for common HTTP statuses
const STATUS_MESSAGES: Record<number, string> = {
  400: "Some details look wrong. Please check them and try again.",
  401: SESSION_EXPIRED_MESSAGE,
  403: "You don't have permission to do that.",
  404: "We couldn't find that. It may have been deleted already.",
  408: "The request timed out. Please try again.",
  413: "That file is too large.",
  429: "Too many attempts. Please wait a moment and try again.",
};

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Turns a failed fetch Response into an ApiError with a message that is safe
 * and useful to show to the user.
 *  - 5xx: generic "our side" message (no technical details leaked)
 *  - JSON { error | message }: shown as-is (e.g. "Invalid email or password")
 *  - otherwise: friendly text for the status code, or the fallback
 */
export async function apiErrorFromResponse(
  res: Response,
  fallback: string,
): Promise<ApiError> {
  if (res.status >= 500) return new ApiError(SERVER_MESSAGE, res.status);

  let serverMessage = "";
  try {
    const body = await res.json();
    const raw = body?.error ?? body?.message;
    if (typeof raw === "string") serverMessage = raw.trim();
  } catch {
    // Body wasn't JSON (e.g. plain text from our routes) - use status mapping
  }

  const message = serverMessage || STATUS_MESSAGES[res.status] || fallback;
  return new ApiError(message, res.status);
}

export function getErrorMessage(
  error: unknown,
  fallback: string = GENERIC_MESSAGE,
): string {
  if (error instanceof ApiError) return error.message;

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return OFFLINE_MESSAGE;
  }

  // fetch() itself failing (server down, DNS, CORS...) throws a TypeError
  if (error instanceof TypeError) return UNREACHABLE_MESSAGE;

  return fallback;
}

/**
 * Shows an error as a toast popup (top-right, auto-hides after a few seconds)
 * and keeps the technical details in the dev console only.
 */
export function toastError(error: unknown, fallback?: string) {
  const message = getErrorMessage(error, fallback);

  if (process.env.NODE_ENV !== "production") {
    console.error("[expendtrack]", error);
  }

  const needsLogin =
    error instanceof ApiError && message === SESSION_EXPIRED_MESSAGE;

  // id = message, so the same error never stacks up as duplicate toasts
  toast.error(message, {
    id: message,
    duration: 5000,
    ...(needsLogin
      ? {
          action: {
            label: "Log in",
            onClick: () => {
              window.location.href = "/login";
            },
          },
        }
      : {}),
  });

  return message;
}
