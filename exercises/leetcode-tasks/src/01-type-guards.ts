/**
 * Zadanie 1: Implementacja systemu type guardów
 *
 * Zaimplementuj system type guardów dla różnych typów danych.
 * Stwórz funkcje sprawdzające:
 * - Czy obiekt jest instancją danej klasy
 * - Czy obiekt ma określoną strukturę
 * - Czy wartość jest określonego typu
 *
 * Przykład użycia:
 * const result = isUser({ name: 'John', age: 30 });
 * if (result) {
 *   // TypeScript powinien wiedzieć, że to User
 * }
 *
 * Wymagania:
 * 1. Implementacja powinna być typowana w TypeScript
 * 2. System powinien obsługiwać:
 *    - Sprawdzanie typów podstawowych
 *    - Sprawdzanie typów złożonych
 *    - Sprawdzanie instancji klas
 * 3. Type guardy powinny być bezpieczne typowo
 * 4. System powinien obsługiwać zagnieżdżone struktury
 * 5. System powinien obsługiwać unie typów
 *
 * Wskazówki:
 * - Użyj type predicates
 * - Wykorzystaj discriminated unions
 * - Pamiętaj o type narrowing
 */

type User = {
  name: string;
  age: number;
  role: string;
};

type DatabaseConfig = {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
};

// TODO: Zaimplementuj system type guardów

const isNumber = (value: unknown): value is number => typeof value === "number";
const isUser = (value: unknown): value is User =>
  typeof value === "object" &&
  value !== null &&
  "name" in value &&
  "age" in value &&
  "role" in value &&
  typeof value.age === "number" &&
  typeof value.name === "string" &&
  typeof value.role === "string";

const isDate = (value: unknown): value is Date =>
  value !== null && value instanceof Date;

type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const isApiResponse = <T>(value: unknown): value is ApiResponse<T> =>
  typeof value === "object" &&
  value !== null &&
  "status" in value &&
  (value.status === "success" || value.status === "error") &&
  ((value.status === "success" && "data" in value) ||
    (value.status === "error" &&
      "message" in value &&
      typeof value.message === "string"));

const isDatabaseConfig = (value: unknown): value is DatabaseConfig => {
  if (typeof value !== "object" || value === null || !("database" in value)) {
    return false;
  }

  const database = (value as any).database;
  if (typeof database !== "object" || database === null) {
    return false;
  }

  if (!("host" in database) || typeof database.host !== "string") {
    return false;
  }

  if (!("port" in database) || typeof database.port !== "number") {
    return false;
  }

  if (
    !("credentials" in database) ||
    typeof database.credentials !== "object" ||
    database.credentials === null
  ) {
    return false;
  }

  const credentials = database.credentials;
  return (
    "username" in credentials &&
    typeof credentials.username === "string" &&
    "password" in credentials &&
    typeof credentials.password === "string"
  );
};
// Testy
console.log("Test 1: Sprawdzanie typów podstawowych");
let value1: unknown;

if (isNumber(value1)) {
  console.log(value1.toFixed(2)); // TypeScript powinien wiedzieć, że to number
}

console.log("\nTest 2: Sprawdzanie typów złożonych");
// const user = { name: "John", age: 30, role: "admin" };
let user: unknown;
if (isUser(user)) {
  console.log(user.name.toUpperCase()); // TypeScript powinien wiedzieć, że to User
}

console.log("\nTest 3: Sprawdzanie instancji klas");
const date = new Date();
if (isDate(date)) {
  console.log(date.toISOString()); // TypeScript powinien wiedzieć, że to Date
}

console.log("\nTest 4: Sprawdzanie zagnieżdżonych struktur");
// const config = {
//   database: {
//     host: "localhost",
//     port: 5432,
//     credentials: {
//       username: "admin",
//       password: "secret",
//     },
//   },
// };
let config: unknown;
if (isDatabaseConfig(config)) {
  console.log(config.database.credentials.username); // TypeScript powinien wiedzieć, że to DatabaseConfig
}

export {};
