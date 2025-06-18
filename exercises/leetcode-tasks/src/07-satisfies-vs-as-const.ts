/**
 * Zadanie: Różnica między satisfies a as const
 *
 * Operator satisfies i as const służą do różnych celów w TypeScript:
 * - satisfies: sprawdza zgodność z typem zachowując literalne typy
 * - as const: zamienia wszystkie typy na readonly i literalne
 */

// Przykład 1: Podstawowa różnica
const colors1 = {
  primary: "blue",
  secondary: "red",
} as const;
// Typ: { readonly primary: "blue"; readonly secondary: "red" }

const colors2 = {
  primary: "blue",
  secondary: "red",
} satisfies { primary: string; secondary: string };
// Typ: { primary: "blue"; secondary: "red" }

// Przykład 2: Tablice
const numbers1 = [1, 2, 3] as const;
// Typ: readonly [1, 2, 3]

const numbers2 = [1, 2, 3] satisfies number[];
// Typ: number[]

// Przykład 3: Złożone struktury
type Config = {
  api: {
    url: string;
    timeout: number;
  };
  features: string[];
};

const config1 = {
  api: {
    url: "http://localhost:3000",
    timeout: 5000,
  },
  features: ["auth", "logging"],
} as const;
// Wszystko jest readonly i literalne

const config2 = {
  api: {
    url: "http://localhost:3000",
    timeout: 5000,
  },
  features: ["auth", "logging"],
} satisfies Config;
// Zachowuje typy z Config, ale nie wszystko jest readonly

// Przykład 4: Funkcje
const handlers1 = {
  onClick: () => console.log("clicked"),
  onHover: () => console.log("hovered"),
} as const;
// Funkcje są readonly

const handlers2 = {
  onClick: () => console.log("clicked"),
  onHover: () => console.log("hovered"),
} satisfies {
  onClick: () => void;
  onHover: () => void;
};
// Funkcje nie są readonly

// Przykład 5: Union Types
type Status = "loading" | "success" | "error";

const status1 = "loading" as const;
// Typ: "loading"

const status2 = "loading" satisfies Status;
// Typ: "loading"

// Przykład 6: Modyfikacja wartości
const user1 = {
  name: "John",
  age: 30,
} as const;
// user1.name = 'Jane'; // ❌ Błąd: Cannot assign to 'name' because it is a read-only property

const user2 = {
  name: "John",
  age: 30,
} satisfies { name: string; age: number };
// user2.name = 'Jane'; // ✅ OK: Można modyfikować

// Testy
console.log("Colors 1:", colors1);
console.log("Colors 2:", colors2);
console.log("Numbers 1:", numbers1);
console.log("Numbers 2:", numbers2);
console.log("Config 1:", config1);
console.log("Config 2:", config2);
console.log("Status 1:", status1);
console.log("Status 2:", status2);

export {};
