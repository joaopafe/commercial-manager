import { User } from "../entities/User";

import { UserRepository } from "../repositories/UserRepository";

import { isValidUsername as validUsername } from "../validators/isValidUsername";
import { isValidPassword as validPassword } from "../validators/isValidPassword";
import { userAlreadyExists } from "../validators/userAlreadyExists";

export class EditUser {
  constructor(private userRepository: UserRepository) {}

  async exec(user: User): Promise<User | Error> {
    const isValidUsername = validUsername(user.name);
    const isValidPassword = validPassword(user.password);

    const isValidUser = isValidUsername && isValidPassword;

    if (isValidUser) {
      const users = await this.userRepository.list();

      if (users) {
        const userExists = userAlreadyExists(user.code, users);

        if (userExists) {
          const editedUser = await this.userRepository.update(user);

          return editedUser;
        }

        return Error("The user code is invalid");
      }

      return Error("It was not possible to get the users");
    }

    if (!isValidUser) {
      if (!isValidUser) return Error("The username is invalid");

      if (!isValidPassword) return Error("The password is invalid");
    }

    return Error("It was not possible to edit the user");
  }
}
