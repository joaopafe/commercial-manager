import { User } from "../entities/User";

import { UserRepository } from "../repositories/UserRepository";

import { userAlreadyExists } from "../validators/userAlreadyExists";

export class RemoveUser {
  constructor(private userRepository: UserRepository) {}

  async exec(userCode: number): Promise<User | Error> {
    const users = await this.userRepository.list();

    if (users) {
      const userExists = userAlreadyExists(userCode, users);

      if (userExists) {
        const removedUser = await this.userRepository.delete(userCode);

        return removedUser;
      }

      return Error("The user code is invalid");
    }

    return Error("It was not possible to get the users");
  }
}
