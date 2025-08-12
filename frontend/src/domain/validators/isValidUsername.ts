export const isValidUsername = (username: string) => {
  username = username.trim();

  if (username.length < 6) return false;

  if (/\s{2,}/.test(username)) return false;

  if (/^(.)\1{5,}$/.test(username)) return false;

  if (/[<>\/\\]/.test(username)) return false;

  if (/[\u{1F000}-\u{1FAFF}]/u.test(username)) return false;

  if (/^\d+$/.test(username)) return false;

  return true;
};
