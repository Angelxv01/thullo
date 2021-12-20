const isString = (input: unknown): input is string => {
  return typeof input === "string" || input instanceof String;
};

export const formatDate = (input: unknown) =>
  isString(input)
    ? new Date(input).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
