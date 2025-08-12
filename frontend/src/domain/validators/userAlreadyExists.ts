import { User } from "../entities/User";

export const userAlreadyExists = (userCode: number, users: User[]) => {
  const userAlreadyExists =
    users.filter((user) => {
      return user.code === userCode;
    }).length === 1;

  return userAlreadyExists;
};
