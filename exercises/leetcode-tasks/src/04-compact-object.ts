/**
 * Zadanie: Compact Object
 *
 * Zaimplementuj funkcję, która usuwa wszystkie falsy wartości z obiektu lub tablicy.
 * Operacja powinna być rekurencyjna i działać na zagnieżdżonych obiektach i tablicach.
 *
 * Falsy wartości to: null, undefined, false, 0, "", NaN
 *
 * Przykład 1:
 * Input: obj = [null, 0, false, 1]
 * Output: [1]
 * Wyjaśnienie: Wszystkie falsy wartości zostały usunięte z tablicy.
 *
 * Przykład 2:
 * Input: obj = {"a": null, "b": [false, 1]}
 * Output: {"b": [1]}
 * Wyjaśnienie: obj["a"] i obj["b"][0] miały falsy wartości i zostały usunięte.
 *
 * Przykład 3:
 * Input: obj = [null, 0, 5, [0], [false, 16]]
 * Output: [5, [], [16]]
 * Wyjaśnienie: obj[0], obj[1], obj[3][0], i obj[4][0] były falsy i zostały usunięte.
 */

// function compactObject(source: unknown): any {
//   if (Array.isArray(source)) {
//     const destination: any = [];

//     source.forEach((element) => {
//       const compactedValue = compactObject(element);

//       if (compactedValue) {
//         destination.push(compactedValue);
//       }
//     });

//     return destination;
//   }

//   if (source instanceof Object) {
//     const values = Object.entries(source).reduce((acc, curr) => {
//       const [key, value] = curr;

//       const compactVal = compactObject(value);

//       if (!compactVal) {
//         return acc;
//       }

//       return {
//         ...acc,
//         [key]: compactVal,
//       };
//     }, {});

//     return values;
//   }

//   return source;
// }

// Testy

type JSONValue =
  | null
  | undefined
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

function compactObject(source: unknown): JSONValue {
  // Type guard dla tablic
  if (Array.isArray(source)) {
    return source
      .map((element) => compactObject(element))
      .filter((value): value is JSONValue => Boolean(value));
  }

  // Type guard dla obiektów
  if (source !== null && typeof source === "object") {
    const result: { [key: string]: JSONValue } = {};

    for (const [key, value] of Object.entries(source)) {
      const compactedValue = compactObject(value);
      if (Boolean(compactedValue)) {
        result[key] = compactedValue;
      }
    }

    return result;
  }

  // Dla wartości prymitywnych
  return Boolean(source) ? (source as JSONValue) : null;
}

const test1 = [null, 0, false, 1];
console.log("Test 1:", compactObject(test1)); // Oczekiwany wynik: [1]

const test2 = { a: null, b: [false, 1] };
console.log("Test 2:", compactObject(test2)); // Oczekiwany wynik: { "b": [1] }

const test3 = [null, 0, 5, [0], [false, 16]];
console.log("Test 3:", compactObject(test3)); // Oczekiwany wynik: [5, [], [16]]

// Dodatkowe testy
const test4 = {
  name: "",
  age: 0,
  active: false,
  address: {
    street: null,
    city: "New York",
    zip: undefined,
  },
  tags: ["", "important", null, "test"],
};
console.log("Test 4:", compactObject(test4));
// Oczekiwany wynik: { address: { city: "New York" }, tags: ["important", "test"] }

const test5 = {
  a: [null, 0, { b: false, c: "value" }],
  d: { e: "", f: [null, 1, 2] },
};
console.log("Test 5:", compactObject(test5));
// // Oczekiwany wynik: { a: [{ c: "value" }], d: { f: [1, 2] } }
