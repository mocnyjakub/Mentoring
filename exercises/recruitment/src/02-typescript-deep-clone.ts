/**
 * Zadanie 2: Implementacja funkcji deepClone
 *
 * Twoim zadaniem jest zaimplementowanie funkcji deepClone, która:
 * 1. Tworzy głęboką kopię obiektu (wszystkie zagnieżdżone obiekty i tablice są kopiowane)
 * 2. Obsługuje różne typy danych w JavaScript
 * 3. Zachowuje referencje do obiektów cyklicznych
 *
 * Przykład użycia:
 * ```ts
 * const original = {
 *   name: "John",
 *   age: 30,
 *   address: {
 *     city: "New York",
 *     zip: "10001"
 *   },
 *   hobbies: ["reading", "coding"],
 *   metadata: {
 *     createdAt: new Date(),
 *     tags: new Set(["user", "admin"])
 *   }
 * };
 *
 * const cloned = deepClone(original);
 * // cloned jest głęboką kopią original
 * // modyfikacja cloned nie wpływa na original
 * ```
 *
 * Wymagania:
 * 1. Funkcja powinna być typowana w TypeScript
 * 2. Powinna obsługiwać podstawowe typy JavaScript:
 *    - Obiekty (włącznie z obiektami cyklicznymi)
 *    - Tablice
 *    - Mapy i Set
 *    - Date
 *    - RegExp
 *    - Typy prymitywne (string, number, boolean, null, undefined)
 * 3. Powinna zachowywać referencje do obiektów cyklicznych
 * 4. Powinna zwracać nowy obiekt, nie modyfikując oryginalnego
 *
 * Wskazówki:
 * - Użyj WeakMap do przechowywania referencji do obiektów cyklicznych
 * - Rozważ użycie konstruktora obiektu do tworzenia kopii
 * - Pamiętaj o obsłudze przypadków brzegowych
 */

// TODO: Zaimplementuj funkcję deepClone
function deepClone<T extends object>(value: T): T {
  // 1. Sprawdź typy prymitywne
  // 2. Sprawdź specjalne typy
  // 3. Obsłuż tablice
  // 4. Obsłuż obiekty
  // 5. Obsłuż obiekty cykliczne

  const seen = new WeakMap();

  function clone(value: unknown): unknown {
    // 1. Sprawdzamy czy to obiekt cykliczny
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return seen.get(value);
      }
    }

    // 2. Obsługa typów prymitywnych
    if (
      value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "undefined"
    ) {
      return value;
    }

    // 3. Obsługa tablic
    if (Array.isArray(value)) {
      const copy = value.map((item) => clone(item));
      seen.set(value, copy);
      return copy;
    }

    // 4. Obsługa obiektów
    if (typeof value === "object") {
      const copy = Object.entries(value).reduce((acc, [key, val]) => {
        return {
          ...acc,
          [key]: clone(val),
        };
      }, {} as T);

      seen.set(value, copy);
      return copy;
    }
  }

  return clone(value) as T;
}

// Test 1: Podstawowa kopia
const testObject = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
  },
  hobbies: ["reading", "coding"],
  metadata: {
    createdAt: new Date(),
    tags: new Set(["user", "admin"]),
  },
};
const cloned1 = deepClone(testObject);
console.log(cloned1);

// console.log(
//   "Test 1 - Podstawowa kopia:",
//   cloned1.name === testObject.name && cloned1.address !== testObject.address
// );

// Test 2: Obiekt cykliczny
// const cyclic: any = { name: "Cyclic" };
// cyclic.self = cyclic;
// const cloned2 = deepClone(cyclic);
// console.log(
//   "Test 2 - Obiekt cykliczny:",
//   cloned2.self === cloned2 && cloned2 !== cyclic
// );

// // Test 3: Typy specjalne
// const specialTypes = {
//   date: new Date(),
//   regex: /test/g,
//   set: new Set([1, 2, 3]),
//   map: new Map([["key", "value"]]),
// };
// const cloned3 = deepClone(specialTypes);
// console.log(
//   "Test 3 - Typy specjalne:",
//   cloned3.date instanceof Date &&
//     cloned3.regex instanceof RegExp &&
//     cloned3.set instanceof Set &&
//     cloned3.map instanceof Map
// );
