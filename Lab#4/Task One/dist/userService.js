"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    database;
    currentId;
    constructor(database) {
        this.database = database;
        this.currentId = 0;
    }
    async createUser(user) {
        if (!user || !user.name || !user.email) {
            throw new Error("Invalid user data.");
        }
        const userId = this.currentId + 1;
        const newUser = {
            id: userId,
            ...user,
        };
        await this.database.save(newUser);
        this.currentId = this.currentId + 1;
        return newUser;
    }
    async getUserById(userId) {
        const user = await this.database.find({ id: userId });
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
    async updateUser(userId, newData) {
        const user = await this.getUserById(userId);
        const updatedUser = { ...user, ...newData };
        await this.database.update(updatedUser);
        return updatedUser;
    }
    async deleteUser(userId) {
        const user = await this.getUserById(userId);
        await this.database.remove(user);
    }
}
exports.default = UserService;
