export const isValidPhone = (phone: string) => {
  // Remove everything that is not a digit
  const tel = phone.replace(/\D/g, "");

  // Check if it has 10 (landline) or 11 digits (mobile with 9)
  if (!(tel.length === 10 || tel.length === 11)) return false;

  // If it is a cell phone, the ninth digit must be 9
  if (tel.length === 11 && tel[2] !== "9") return false;

  // Checks if DDD is valid (01 to 99, without 00)
  const ddd = tel.substring(0, 2);
  if (!/^[1-9]{2}$/.test(ddd)) return false;

  // Eliminates repeated numbers like "11111111111"
  if (/^(\d)\1+$/.test(tel)) return false;

  return true;
};
