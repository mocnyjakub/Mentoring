/**
 * Zadanie LeetCode: Poprawne Nawiasy
 * Poziom trudności: Łatwy
 *
 * Opis problemu:
 * Mając string s zawierający tylko znaki '(', ')', '{', '}', '[' i ']',
 * określ czy string wejściowy jest poprawny.
 *
 * String wejściowy jest poprawny jeśli:
 * 1. Otwarte nawiasy muszą być zamknięte przez ten sam typ nawiasów.
 * 2. Otwarte nawiasy muszą być zamknięte we właściwej kolejności.
 * 3. Każdy zamykający nawias ma odpowiadający mu otwierający nawias tego samego typu.
 */

/**
 * Przykłady:
 *
 * Przykład 1:
 * Wejście: s = "()"
 * Wyjście: true
 *
 * Przykład 2:
 * Wejście: s = "()[]{}"
 * Wyjście: true
 *
 * Przykład 3:
 * Wejście: s = "(]"
 * Wyjście: false
 *
 * Przykład 4:
 * Wejście: s = "([])"
 * Wyjście: true
 */

/**
 * Ograniczenia:
 * - 1 <= s.length <= 10^4
 * - s składa się tylko z nawiasów '()[]{}'.
 */

/**
 * Funkcja sprawdzająca czy nawiasy są poprawne
 * @param s - string zawierający tylko znaki nawiasów
 * @returns boolean wskazujący czy string ma poprawne nawiasy
 */
function isValid(s: string): boolean {
  // TODO: Zaimplementuj rozwiązanie
  // Wskazówki:
  // - Rozważ użycie struktury danych stos (stack)
  // - Pomyśl co się dzieje gdy napotkasz otwierający vs zamykający nawias
  // - Jak możesz dopasować otwierające nawiasy z odpowiadającymi im zamykającymi?

  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack: Array<keyof typeof pairs> = [];

  const letters = s.split("");

  if (letters.length <= 1) {
    return false;
  }

  letters.forEach((letter) => {
    if (letter === "(" || letter === "[" || letter === "{") {
      stack.push(letter);
      return;
    }

    if (stack.length > 0) {
      const lastFromStack = stack[stack.length - 1];
      const isMatching = pairs[lastFromStack] === letter;

      if (isMatching) {
        stack.pop();
      }
    }
  });

  const isValid = stack.length === 0;

  return isValid;
}

// Podstawowe przypadki testowe
console.log('Test 1 - "()":', isValid("()")); // Oczekiwane: true
console.log('Test 2 - "()[]{}":', isValid("()[]{}")); // Oczekiwane: true
console.log('Test 3 - "(]":', isValid("(]")); // Oczekiwane: false
console.log('Test 4 - "([])":', isValid("([])")); // Oczekiwane: true

// Dodatkowe przypadki testowe
console.log('Test 5 - "":', isValid("")); // Oczekiwane: true (pusty string)
console.log('Test 6 - "(":', isValid("(")); // Oczekiwane: false
console.log('Test 7 - ")":', isValid(")")); // Oczekiwane: false
console.log('Test 8 - "([)]":', isValid("([)]")); // Oczekiwane: false
console.log('Test 9 - "{[]}":', isValid("{[]}")); // Oczekiwane: true
console.log('Test 10 - "(((":', isValid("(((")); // Oczekiwane: false

/**
 * Pytania do rozważenia podczas rozwiązywania:
 *
 * 1. Jaka struktura danych byłaby najbardziej odpowiednia do tego problemu?
 * 2. Jak obsłużyć dopasowywanie różnych typów nawiasów?
 * 3. Co powinno się stać gdy napotkasz zamykający nawias?
 * 4. Co powinno się stać gdy napotkasz otwierający nawias?
 * 5. Jak określić czy wszystkie nawiasy są poprawnie dopasowane na końcu?
 *
 * Przypadki brzegowe do przemyślenia:
 * - Pusty string
 * - Pojedynczy otwierający nawias
 * - Pojedynczy zamykający nawias
 * - Niedopasowane typy nawiasów
 * - Poprawne nawiasy ale zła kolejność
 * - Wielokrotnie zagnieżdżone nawiasy
 */

/**
 * Wskazówki dotyczące podejścia:
 *
 * Podejście oparte na stosie:
 * 1. Zainicjuj pusty stos
 * 2. Iteruj przez każdy znak w stringu
 * 3. Jeśli to otwierający nawias, wrzuć go na stos
 * 4. Jeśli to zamykający nawias, sprawdź czy pasuje do ostatniego otwierającego nawiasu
 * 5. Po przetworzeniu wszystkich znaków, stos powinien być pusty dla poprawnych nawiasów
 *
 * Złożoność czasowa: O(n) - gdzie n to długość stringa
 * Złożoność pamięciowa: O(n) - w najgorszym przypadku wszystkie znaki to otwierające nawiasy
 */

export { isValid };
