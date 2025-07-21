# rffc

`rffc` (Reuse Function From Class) is a tiny, powerful utility that transforms class prototype methods and properties into curried, data-last functions. It promotes a more functional and composable programming style in JavaScript and TypeScript.

---

## ✨ Why `rffc`?

In traditional object-oriented programming, interacting with object methods often looks like `instance.method(args)`. While effective, this can sometimes make function composition and partial application less straightforward. `rffc` bridges this gap by allowing you to:

* **Embrace Functional Composition:** Seamlessly integrate class methods with `pipe`, `compose`, and other higher-order functions from functional programming libraries.
* **Achieve Partial Application (Currying):** Easily create specialized functions by pre-filling method arguments, leading to more reusable and declarative code.
* **Unify Interface:** Access both properties (like `length` or getters) and methods (with or without arguments) with a consistent, functional signature (`fn(instance, ...args)` or `fn(...args)(instance)`).
* **Improve Readability:** For specific functional patterns, `rffc` can make your code more concise and expressive.

---

## 🚀 Installation

Install `rffc` using npm or yarn:

```bash
npm install rffc
```
---

## 📖 Usage

Import `rffc` and start transforming your class interactions:

```typescript
import rffc from "rffc";

// Example 1: Accessing a getter property
class User {
  constructor(public name: string, public age: number) {}
  get fullName() {
    return `${this.name} is ${this.age} years old`;
  }
}

const getFullName = rffc(User).fullName;
console.log(getFullName(new User("Alice", 18))); // Output: "Alice is 18 years old"

// Example 2: Currying a method with arguments
const toLocaleDate = rffc(Date).toLocaleDateString;

// Create specialized date formatters
const toLocaleDateEn = toLocaleDate("en-US");
const toLocaleDateDE = toLocaleDate("de-DE");

console.log(toLocaleDateEn(new Date())); // Output: "7/20/2025" (or current date in en-US format)
console.log(toLocaleDateDE(new Date())); // Output: "20.7.2025" (or current date in de-DE format)

// Direct usage without explicit currying
console.log(toLocaleDate("uk-UA", new Date())); // Output: "20.07.2025" (or current date in uk-UA format)

// Example 3: Using a method that mutates (e.g., Array.prototype.push)
const pushItem = rffc(Array<number>).push;

const myArray = [1, 2, 3];
console.log("Before push:", myArray); // Output: [1, 2, 3]
pushItem(myArray, 4); // The array is mutated directly
console.log("After push:", myArray);  // Output: [1, 2, 3, 4]

// Example 4: Accessing a simple property
const getLength = rffc(Array<any>).length;
console.log(getLength([1, 2, 3])); // Output: 3
console.log(getLength([]));       // Output: 0

// Example 5: Using built-in prototype methods (e.g., String.prototype.toUpperCase)
const toUpperCase = rffc(String).toUpperCase;
console.log(toUpperCase("hello world")); // Output: "HELLO WORLD"
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dasx10/rffc/issues).

---

## 📄 License

This project is [MIT licensed](LICENSE).
