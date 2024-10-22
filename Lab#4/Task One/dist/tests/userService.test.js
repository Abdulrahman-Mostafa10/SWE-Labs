"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../userService"));
class MockDatabase {
    users;
    constructor() {
        this.users = [];
    }
    async save(user) {
        this.users.push(user);
    }
    async find(query) {
        return this.users.find((user) => user.id === query.id) || null;
    }
    async update(user) {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
    }
    async remove(user) {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
describe("UserService", () => {
    let userService;
    beforeEach(() => {
        const mockDatabase = new MockDatabase();
        userService = new userService_1.default(mockDatabase);
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
        await expect(userService.createUser(userData)).rejects.toThrow("Invalid user data.");
    });
    test("gets an existing user by ID", async () => {
        const user = await userService.createUser({ name: "Ali", email: "test@test.com" });
        const foundUser = await userService.getUserById(user.id);
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
        const updatedUser = await userService.updateUser(user.id, updatedData);
        expect(updatedUser.name).toBe(updatedData.name);
        expect(updatedUser.email).toBe(updatedData.email);
    });
    test("deletes an existing user", async () => {
        const user = await userService.createUser({ name: "Ali", email: "test@test.com" });
        await userService.deleteUser(user.id);
        await expect(userService.getUserById(user.id)).rejects.toThrow("User not found.");
    });
});
