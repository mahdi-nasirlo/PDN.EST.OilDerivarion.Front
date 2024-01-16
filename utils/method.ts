import { z } from "zod";

const originalObjectType = z.record(z.string(), z.string());

export const updatedObject = (
  originalObject: z.infer<typeof originalObjectType>
) => {
  let updatedObject: Record<string, string> = {} as Record<string, string>;

  Object.keys(originalObject).forEach((value, index, array) => {
    const newKey = value?.replace(/_/g, "-");

    let typeOfValue = typeof originalObject[value];

    if (typeOfValue !== "string") {
      updatedObject[newKey] = originalObject[value];
    } else
      updatedObject[newKey] =
        typeof originalObject[value] == "string"
          ? originalObject[value].replace(/_/g, "-")
          : "";
  });

  return updatedObject;
};
