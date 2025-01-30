/*
The factory design pattern is used when we have a superclass with multiple sub-classes and based on input, we need to return one of the sub-class
OR
It is a creational design pattern used to create objects without specifying the exact class of the object that will be created. This pattern allows for the creation of different types of objects based on a provided input
*/

// with factory pattern
class UserFactory {
    static createUser(type, data) {
      switch (type) {
        case "admin":
          // or we can make a new admin class that returns data and methods according to admin
          return {
            role: "admin",
            permissions: data.permissions,
          };
        case "customer":
          return {
            role: "customer",
            cart: data.cart || [],
          };
        default:
          throw new Error("Invalid user type");
      }
    }
  }
  
// without factory pattern
function createUser(type, data) {
  if (type === "admin") {
    return {
      role: "admin",
      permissions: data.permissions,
    };
  } else if (type === "customer") {
    return {
      role: "customer",
      cart: data.cart || [],
    };
  } else {
    throw new Error("Invalid user type");
  }
}



const admin1 = UserFactory.createUser("admin", {
  permissions: ["manage_users", "edit_content"],
});
const customer1 = UserFactory.createUser("customer", {
  cart: ["item1", "item2"],
});

console.log(admin1);
console.log(customer1)