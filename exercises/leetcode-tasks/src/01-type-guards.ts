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

// TODO: Zaimplementuj system type guardów

// Testy
console.log("Test 1: Sprawdzanie typów podstawowych");
const value1 = 42;
if (isNumber(value1)) {
  console.log(value1.toFixed(2)); // TypeScript powinien wiedzieć, że to number
}

console.log("\nTest 2: Sprawdzanie typów złożonych");
const user = { name: "John", age: 30, role: "admin" };
if (isUser(user)) {
  console.log(user.name.toUpperCase()); // TypeScript powinien wiedzieć, że to User
}

console.log("\nTest 3: Sprawdzanie instancji klas");
const date = new Date();
if (isDate(date)) {
  console.log(date.toISOString()); // TypeScript powinien wiedzieć, że to Date
}

console.log("\nTest 4: Sprawdzanie zagnieżdżonych struktur");
const config = {
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      username: "admin",
      password: "secret",
    },
  },
};
if (isDatabaseConfig(config)) {
  console.log(config.database.credentials.username); // TypeScript powinien wiedzieć, że to DatabaseConfig
}

export {};
