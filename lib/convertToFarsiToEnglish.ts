const convertToFarsiToEnglish = (farsiNumber: string): string => {
  const farsiDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  const digitMap: Record<string, string> = {};
  for (let i = 0; i < farsiDigits.length; i++) {
    digitMap[farsiDigits[i]] = englishDigits[i];
  }

  return farsiNumber.replace(/[۰-۹]/g, (match) => digitMap[match]);
};

export const convertObjectToFarsiToEnglish = (
  obj: Record<string, any>
): Record<string, any> => {
  const convertedObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "string") {
        // Convert Farsi numbers in string values
        convertedObj[key] = convertToFarsiToEnglish(value);
      } else if (typeof value === "object" && value !== null) {
        // Recursively convert Farsi numbers in nested objects
        convertedObj[key] = convertObjectToFarsiToEnglish(value);
      } else {
        // Keep non-string, non-object values unchanged
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
};
