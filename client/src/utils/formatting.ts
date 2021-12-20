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
export const getAbbreviation = (input: unknown) =>
  isString(input)
    ? input
        .split(" ")
        .reduce((acc, word) => (acc += word[0]), "")
        .substring(0, 2)
        .toUpperCase()
    : "";
