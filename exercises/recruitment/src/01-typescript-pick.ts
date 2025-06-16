/**
 * Zadanie 1: Implementacja funkcji pick
 *
 * Twoim zadaniem jest zaimplementowanie funkcji pick, która:
 * 1. Przyjmuje obiekt i tablicę kluczy
 * 2. Zwraca nowy obiekt zawierający tylko właściwości z podanymi kluczami
 *
 * Przykład użycia:
 * ```ts
 * const user = {
 *   name: "John",
 *   age: 30,
 *   email: "john@example.com",
 *   address: "New York"
 * };
 *
 * const result = pick(user, ["name", "email"]);
 * // result = { name: "John", email: "john@example.com" }
 * ```
 *
 * Wymagania:
 * 1. Funkcja powinna być typowana w TypeScript
 * 2. Powinna obsługiwać tylko istniejące klucze z obiektu
 * 3. Powinna zwracać nowy obiekt, nie modyfikując oryginalnego
 *
 * Wskazówki:
 * - Użyj generycznych typów TypeScript
 * - Użyj keyof do uzyskania kluczy z typu obiektu
 * - Użyj mapped types do utworzenia nowego typu
 */

// TODO: Zaimplementuj funkcję pick
function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  //   const destination: Partial<typeof obj> = {};
  //   keys.forEach((key) => {
  //     const value = obj[key];
  //     const exist = destination[key] === value;
  //     if (exist) return;
  //     destination[key] = value;
  //   });
  //   return destination;

  return keys.reduce((preValue, key) => {
    if (key in obj) {
      preValue[key] = obj[key];
    }
    return preValue;
  }, {} as Pick<T, K>);
}

// Testy
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  address: "New York",
};

const result1 = pick(user, ["name", "email"]);
console.log(result1); // { name: "John", email: "john@example.com" }

const result2 = pick(user, ["age", "address"]);
console.log(result2); // { age: 30, address: "New York" }

// Dodatkowe testy
const todo = {
  title: "Learn TypeScript",
  completed: false,
  priority: "high",
  tags: ["typescript", "learning"],
};

const result3 = pick(todo, ["title", "completed"]);
console.log(result3); // { title: "Learn TypeScript", completed: false }
