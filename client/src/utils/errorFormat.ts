export const errorFormat = (error: unknown) => {
  let errMessage = "An unknown error occurred";

  if (error instanceof Error) {
    errMessage = error.message;
  } else if (typeof error === "string") {
    errMessage = error;
  } else if (typeof error === "object" && error !== null) {
    errMessage = JSON.stringify(error);
  }

  return errMessage;
};
