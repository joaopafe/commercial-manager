export const isValidPassword = (password: string) => {
  if (password !== password.trim()) return false;

  if (password.length < 8) return false;

  if (!/[a-zA-Z]/.test(password)) return false;

  if (!/\d/.test(password)) return false;

  return true;
};
