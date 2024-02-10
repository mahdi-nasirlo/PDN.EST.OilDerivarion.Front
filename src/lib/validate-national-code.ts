export function validateNationalCode(code: any) {
  const regex = /^(\d{10})$/;
  if (!regex.test(code)) {
    return false; // Code format is invalid
  }

  const digits = code.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let remainder = sum % 11;
  if (remainder < 2) {
    return digits[9] === remainder;
  } else {
    return digits[9] === 11 - remainder;
  }
}
