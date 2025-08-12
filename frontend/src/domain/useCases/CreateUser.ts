import { User } from "../entities/User";

import { UserRepository } from "../repositories/UserRepository";

import { isValidUsername as validUsername } from "../validators/isValidUsername";
import { isValidPassword as validPassword } from "../validators/isValidPassword";

export interface AddUserParams {
  name: string;
  password: string;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async exec(user: AddUserParams): Promise<User | Error> {
    const isValidUsername = validUsername(user.name);
    const isValidPassword = validPassword(user.password);

    const isValidUser = isValidUsername && isValidPassword;

    if (isValidUser) {
      const createdUser = await this.userRepository.create(user);

      return createdUser;
    }

    if (!isValidUser) {
      if (!isValidUser) return Error("The username is invalid");

      if (!isValidPassword) return Error("The password is invalid");
    }

    return Error("It was not possible to create user");
  }
}
