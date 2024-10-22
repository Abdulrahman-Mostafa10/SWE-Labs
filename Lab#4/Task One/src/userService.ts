interface User {
  id?: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface Database {
  save(user: User): Promise<void>;
  find(criteria: { id: number }): Promise<User | null>;
  update(user: User): Promise<void>;
  remove(user: User): Promise<void>;
}

class UserService {
  private database: Database;
  private currentId: number;

  constructor(database: Database) {
    this.database = database;
    this.currentId = 0;
  }

  async createUser(user: User): Promise<User> {
    if (!user || !user.name || !user.email) {
      throw new Error("Invalid user data.");
    }

    const userId = this.currentId + 1;
    const newUser: User = {
      id: userId,
      ...user,
    };
    await this.database.save(newUser);

    this.currentId = this.currentId + 1;

    return newUser;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.database.find({ id: userId });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }

  async updateUser(userId: number, newData: Partial<User>): Promise<User> {
    const user = await this.getUserById(userId);
    const updatedUser: User = { ...user, ...newData };
    await this.database.update(updatedUser);

    return updatedUser;
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);

    await this.database.remove(user);
  }
}

export default UserService;
