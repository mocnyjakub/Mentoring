/**
 * 🚀 Najdłuższy Wspólny Prefiks - LeetCode Easy/Medium (Implementacja Senior)
 *
 * PROBLEM:
 * Napisz funkcję do znalezienia najdłuższego wspólnego prefiksu w tablicy stringów.
 * Jeśli nie ma wspólnego prefiksu, zwróć pusty string "".
 *
 * PRZYKŁADY:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 *
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * Wyjaśnienie: Nie ma wspólnego prefiksu między podanymi stringami.
 *
 * OGRANICZENIA:
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] składa się tylko z małych liter angielskich jeśli nie jest pusty.
 *
 * 🎯 OCZEKIWANIA NA POZIOMIE SENIOR:
 *
 * 1. **Bezpieczeństwo Typów i Walidacja Inputu**
 *    - Odpowiednie typy TypeScript z generykami jeśli potrzebne
 *    - Obsługa edge cases (pusta tablica, puste stringi, pojedynczy string)
 *    - Rozważenie custom typów dla lepszej czytelności
 *
 * 2. **Wydajność Algorytmu**
 *    - Złożoność czasowa: Rozważ O(S) gdzie S to suma wszystkich znaków
 *    - Złożoność pamięciowa: Dąż do O(1) dodatkowej przestrzeni
 *    - Pomyśl o strategiach early termination
 *
 * 3. **Różne Podejścia**
 *    - Skanowanie pionowe (znak po znaku)
 *    - Skanowanie poziome (string po stringu)
 *    - Podejście divide and conquer
 *    - Podejście binary search dla optymalizacji
 *
 * 4. **Obsługa Błędów i Odporność**
 *    - Guard clauses dla nieprawidłowych inputów
 *    - Graceful handling edge cases
 *    - Rozważ co się dzieje z Unicode/znakami specjalnymi
 *
 * 5. **Jakość Kodu**
 *    - Czysta, czytelna implementacja
 *    - Znaczące nazwy zmiennych (isValidPrefix, commonLength, itp.)
 *    - Odpowiednia dokumentacja JSDoc
 *    - Rozważ optymalizacje wydajności (early returns)
 *
 * 6. **Rozważania Testowe**
 *    - Edge cases: pusta tablica, pojedynczy string, brak wspólnego prefiksu
 *    - Przypadki wydajnościowe: bardzo długie stringi, wiele stringów
 *    - Obsługa Unicode jeśli ma zastosowanie
 */

// 📝 Definicje typów (rozważ czy poprawiają czytelność)
type StringArray = readonly string[];
type PrefixResult = string;

const isStringArray = (value: unknown): value is Array<string> =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((e) => typeof e === "string");
/**
 * Znajduje najdłuższy wspólny prefiks w tablicy stringów.
 *
 * @param strs - Tablica stringów do znalezienia wspólnego prefiksu
 * @returns Najdłuższy wspólny prefiks lub pusty string jeśli nie istnieje
 *
 * @example
 * ```typescript
 * longestCommonPrefix(["flower","flow","flight"]) // Zwraca "fl"
 * longestCommonPrefix(["dog","racecar","car"]) // Zwraca ""
 * ```
 *
 * @throws {Error} Gdy tablica inputu jest pusta (zdecyduj o strategii obsługi błędów)
 */
function longestCommonPrefix(strs: string[]): string {
  // 🚧 TODO: Zaimplementuj swoje rozwiązanie tutaj
  // Rozważ:
  // - Walidację inputu i edge cases
  // - Wybór podejścia algorytmicznego
  // - Warunki early termination
  // - Optymalizacje wydajności

  if (!isStringArray(strs)) {
    throw new Error("Input must be a non-empty array of strings");
  }

  let output = "";
  const base = strs[0];

  // Znajdź najkrótszy string na początku
  const minLength = Math.min(...strs.map((s) => s.length));
  for (let i = 0; i < minLength; i++) {
    const currentChar = base[i];
    if (!strs.every((word) => word[i] === currentChar)) {
      return output;
    }
    output += currentChar;
  }

  return output;
}

console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""

// Test edge cases
console.log(longestCommonPrefix([""])); // Output: ""
console.log(longestCommonPrefix(["a"])); // Output: "a"
console.log(longestCommonPrefix(["abc", "abc", "abc"])); // Output: "abc"

// Test braku wspólnego prefiksu
console.log(longestCommonPrefix(["abc", "def", "ghi"])); // Output: ""

// Test różnych długości
console.log(longestCommonPrefix(["ab", "a"])); // Output: "a"
console.log(longestCommonPrefix(["", "b"])); // Output: ""

function benchmark(fn: Function, input: string[][], iterations: number = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn(input[i % input.length]);
  }
  return performance.now() - start;
}

const input = [
  ["flower", "flow", "flight"],
  ["dog", "racecar", "car"],
  ["ab", "a"],
  ["", "b"],
  ["abc", "abc", "abc"],
];

// console.log(benchmark(longestCommonPrefix, input));

// const charArrays = ["flower", "flow", "👨‍👩‍👧‍👦def"].map((str) => Array.from(str));
// console.log(charArrays);

export {};
