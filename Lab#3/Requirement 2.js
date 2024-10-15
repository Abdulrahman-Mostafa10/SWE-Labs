// Inventory Management System

const printError = (value, name) => {
  if (value < 10) {
    console.log(
      `ALERT: Item ${name} is below 10 units! Current quantity: ${value}`
    );
  }
};

class InventoryItem {
  constructor(name, category, quantity, price, unit, customFields = {}) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = price;
    this.unit = unit;
    this.addedAt = new Date();
    this.customFields = customFields;
  }
}

class InventorySystem {
  constructor() {
    this.inventory = [];
    this.transactions = [];
    this.categories = new Set();
    this.customFields = {};
  }

  addItem(name, category, quantity, price, unit, customFields = {}) {
    const newItem = new InventoryItem(
      name,
      category,
      quantity,
      price,
      unit,
      customFields
    );
    printError(quantity, name);
    this.inventory.push(newItem);
    this.categories.add(category);
    this.transactions.push({ type: "add", item: newItem });
    this.updateDashboard();
  }

  deleteItem(index) {
    const item = this.inventory[index];
    if (item) {
      this.transactions.push({ type: "delete", item: item });
      this.inventory.splice(index, 1);
      this.updateDashboard();
    } else {
      console.log("Item not found.");
    }
  }

  editItem(index, name, category, quantity, price, unit, customFields = {}) {
    const item = this.inventory[index];
    if (item) {
      const updatedItem = new InventoryItem(
        name,
        category,
        quantity,
        price,
        unit,
        customFields
      );
      printError(updatedItem.quantity, updatedItem.name);

      updatedItem.addedAt = item.addedAt;
      this.transactions.push({
        type: "edit",
        oldItem: item,
        newItem: updatedItem,
        item: updatedItem,
      });
      this.inventory[index] = updatedItem;
      this.updateDashboard();
    } else {
      console.log("Item not found.");
    }
  }

  calculateTotalValue() {
    return this.inventory.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  recordSale(itemName, quantitySold) {
    const item = this.inventory.find((item) => item.name === itemName);
    if (item && item.quantity >= quantitySold) {
      item.quantity -= quantitySold;
      printError(item.quantity, item.name);

      this.transactions.push({
        type: "sale",
        item: item,
        quantitySold,
        date: new Date(),
      });
      console.log(`Sale: ${quantitySold} ${item.unit} of ${itemName}`);
      this.updateDashboard();
    } else {
      console.log("Sale failed: Insufficient stock or item not found.");
    }
  }

  restockItem(itemName, quantityRestocked) {
    const item = this.inventory.find((item) => item.name === itemName);
    if (item) {
      item.quantity += quantityRestocked;
      printError(item.quantity, item.name);

      this.transactions.push({
        type: "restock",
        item: item,
        quantityRestocked,
        date: new Date(),
      });
      console.log(
        `Restocked: ${quantityRestocked} ${item.unit} of ${itemName}`
      );
      this.updateDashboard();
    } else {
      console.log("Restock failed: Item not found.");
    }
  }

  searchInventory(query) {
    const lowerQuery = query.toLowerCase();
    const results = this.inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        item.price.toString().includes(lowerQuery)
    );
    console.log("Search Results:");
    results.forEach((item) => {
      console.log(
        `${item.name} (${item.quantity} ${item.unit}) - Category: ${item.category}, Price: $${item.price}`
      );
    });
  }

  viewTransactions() {
    console.log("Transaction History:");
    this.transactions.forEach((transaction, index) => {
      console.log(
        `${index + 1}. [${transaction.type.toUpperCase()}] - ${
          transaction.item.name || transaction.item
        } on ${new Date(
          transaction.date
        ).toLocaleString()}\nDetails: ${JSON.stringify(transaction)}`
      );
    });
  }

  viewInventoryAging() {
    console.log("=== Inventory Aging ===");
    this.inventory.forEach((item) => {
      const daysInStock = Math.floor(
        (new Date() - new Date(item.addedAt)) / (1000 * 60 * 60 * 24)
      );
      console.log(`${item.name}: ${daysInStock} days in stock.`);
    });
  }

  updateDashboard() {
    console.log("=== Dashboard ===");
    console.log(`Total Items: ${this.inventory.length}`);
    console.log(`Total Value: $${this.calculateTotalValue().toFixed(2)}`);
    console.log(`Categories: ${[...this.categories].join(", ")}`);
  }

  viewInventory() {
    console.log("=== Inventory ===");
    this.inventory.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) - $${
          item.price
        }, ${item.category}, Added on: ${item.addedAt.toLocaleString()}`
      );
    });
  }

  exportData() {
    console.log("Exporting CSV:");
    const headers = "Name,Category,Quantity,Price,Unit,AddedAt";
    const data = this.inventory.map(
      (item) =>
        `${item.name},${item.category},${item.quantity},${item.price},${item.unit},${item.addedAt}`
    );
    console.log([headers, ...data].join("\n"));
  }

  bulkImport(items) {
    items.forEach((item) => {
      this.addItem(
        item.name,
        item.category,
        item.quantity,
        item.price,
        item.unit
      );
    });
    console.log("Bulk import complete.");
  }

  addCustomField(fieldName) {
    if (!this.customFields[fieldName]) {
      this.customFields[fieldName] = null;
      console.log(`Custom field '${fieldName}' added.`);
    } else {
      console.log(`Field '${fieldName}' already exists.`);
    }
  }

  updateCustomFieldForItem(itemName, fieldName, value) {
    const item = this.inventory.find((item) => item.name === itemName);
    if (item && fieldName in this.customFields) {
      item.customFields[fieldName] = value;
      console.log(`Custom field '${fieldName}' updated for ${itemName}.`);
    } else {
      console.log("Item or field not found.");
    }
  }
}

class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

// Example Usage
const inventorySystem = new InventorySystem();
const admin = new User("Alice", "admin");

inventorySystem.addItem("Laptop", "Electronics", 10, 1200, "pcs");
inventorySystem.addItem("T-Shirt", "Clothing", 50, 20, "pcs");
inventorySystem.addItem("Smartphone", "Electronics", 5, 800, "pcs");

inventorySystem.addCustomField("Warranty");
inventorySystem.updateCustomFieldForItem("Laptop", "Warranty", "2 years");

inventorySystem.viewInventory();
inventorySystem.searchInventory("Electronics");
inventorySystem.editItem(1, "T-Shirt", "Clothing", 2, 22, "pcs");
inventorySystem.recordSale("Laptop", 2);
inventorySystem.viewTransactions();
inventorySystem.restockItem("Smartphone", 4);
inventorySystem.viewInventoryAging();
inventorySystem.updateDashboard();
inventorySystem.exportData();
inventorySystem.bulkImport([
  {
    name: "Keyboard",
    category: "Electronics",
    quantity: 20,
    price: 50,
    unit: "pcs",
  },
  {
    name: "Jacket",
    category: "Clothing",
    quantity: 15,
    price: 80,
    unit: "pcs",
  },
]);
inventorySystem.viewInventory();
inventorySystem.updateDashboard();
