import UserService from "../userService";

class MockDatabase {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async find(query: { id: number }): Promise<User | null> {
    return this.users.find((user) => user.id === query.id) || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async remove(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

interface User {
  id?: number;
  name: string;
  email: string;
  [key: string]: any;
}

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    const mockDatabase = new MockDatabase();
    userService = new UserService(mockDatabase);
  });

  test("creates a new user", async () => {
    const userData = { name: "Ali", email: "sw@test.com" };

    const createdUser = await userService.createUser(userData);

    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.id).toBeDefined();
  });

  test("throws an error when creating a user with invalid data", async () => {
    const userData = { name: "Ali" };

    await expect(userService.createUser(userData as User)).rejects.toThrow(
      "Invalid user data."
    );
  });

  test("gets an existing user by ID", async () => {
    const user = await userService.createUser({ name: "Ali", email: "test@test.com" });
    const foundUser = await userService.getUserById(user.id!);

    expect(foundUser.id).toBe(user.id);
    expect(foundUser.name).toBe(user.name);
    expect(foundUser.email).toBe(user.email);
  });

  test("throws an error when getting a user with invalid ID", async () => {
    await userService.createUser({ name: "Ali", email: "test@test.com" });

    await expect(userService.getUserById(5)).rejects.toThrow("User not found.");
  });

  test("updates an existing user", async () => {
    const user = await userService.createUser({ name: "Ali", email: "test@test.com" });

    const updatedData = {
      name: "Salma",
      email: "updated@test.com",
    };
    const updatedUser = await userService.updateUser(user.id!, updatedData);

    expect(updatedUser.name).toBe(updatedData.name);
    expect(updatedUser.email).toBe(updatedData.email);
  });

  test("deletes an existing user", async () => {
    const user = await userService.createUser({ name: "Ali", email: "test@test.com" });

    await userService.deleteUser(user.id!);

    await expect(userService.getUserById(user.id!)).rejects.toThrow("User not found.");
  });
});
