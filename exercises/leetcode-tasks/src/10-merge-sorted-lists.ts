/**
 * Zadanie LeetCode: Scal Posortowane Listy Połączone
 * Poziom trudności: Łatwy
 *
 * Opis problemu:
 * Masz podane głowy dwóch posortowanych list połączonych list1 i list2.
 *
 * Scal te dwie listy w jedną posortowaną listę. Lista powinna być utworzona
 * przez połączenie węzłów z pierwszych dwóch list.
 *
 * Zwróć głowę scalonej listy połączonej.
 */

/**
 * Przykłady:
 *
 * Przykład 1:
 * Wejście: list1 = [1,2,4], list2 = [1,3,4]
 * Wyjście: [1,1,2,3,4,4]
 *
 * Przykład 2:
 * Wejście: list1 = [], list2 = []
 * Wyjście: []
 *
 * Przykład 3:
 * Wejście: list1 = [], list2 = [0]
 * Wyjście: [0]
 */

/**
 * Ograniczenia:
 * - Liczba węzłów w obu listach jest w zakresie [0, 50]
 * - -100 <= Node.val <= 100
 * - Obie listy list1 i list2 są posortowane w porządku niemalejącym
 */

/**
 * Definicja węzła listy połączonej
 */
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Funkcja scalająca dwie posortowane listy połączone
 * @param list1 - głowa pierwszej posortowanej listy
 * @param list2 - głowa drugiej posortowanej listy
 * @returns głowa scalonej posortowanej listy
 */
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // TODO: Zaimplementuj rozwiązanie
  // Wskazówki:
  // - Stwórz dummy węzeł żeby uprościć logikę
  // - Porównuj wartości węzłów i dołączaj mniejszy
  // - Pamiętaj o węzłach pozostałych w jednej z list
  // - Zwróć następny węzeł po dummy (rzeczywista głowa)
  //   const array1 = listToArray(list1);
  //   const array2 = listToArray(list2);
  //   const sorted = [...array1, ...array2].sort();
  //   const outputList = createList(sorted);
  //   return outputList;

  //   1->2->3
  //   2->4
  // = 1->2->2->3->4

  let currentNode = list1;

  const output = [];

  while (currentNode !== null) {
    // if (currentNode.val <= (list2?.val ?? 0)) {
    // }
    // currentNode = currentNode?.next ?? currentNode;
  }

  return null;
}

// Funkcje pomocnicze do testowania
function createList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// Przypadki testowe
console.log("=== Testy Scalania Posortowanych List ===");

// Podstawowe przypadki testowe
const test1_list1 = createList([1, 2, 4]);
const test1_list2 = createList([1, 3, 4]);
const result1 = mergeTwoLists(test1_list1, test1_list2);
console.log("Test 1 - [1,2,4] + [1,3,4]:", listToArray(result1)); // Oczekiwane: [1,1,2,3,4,4]

const test2_list1 = createList([]);
const test2_list2 = createList([]);
const result2 = mergeTwoLists(test2_list1, test2_list2);
console.log("Test 2 - [] + []:", listToArray(result2)); // Oczekiwane: []

const test3_list1 = createList([]);
const test3_list2 = createList([0]);
const result3 = mergeTwoLists(test3_list1, test3_list2);
console.log("Test 3 - [] + [0]:", listToArray(result3)); // Oczekiwane: [0]

// Dodatkowe przypadki testowe
const test4_list1 = createList([1, 3, 5]);
const test4_list2 = createList([2, 4, 6]);
const result4 = mergeTwoLists(test4_list1, test4_list2);
console.log("Test 4 - [1,3,5] + [2,4,6]:", listToArray(result4)); // Oczekiwane: [1,2,3,4,5,6]

const test5_list1 = createList([1]);
const test5_list2 = createList([2]);
const result5 = mergeTwoLists(test5_list1, test5_list2);
console.log("Test 5 - [1] + [2]:", listToArray(result5)); // Oczekiwane: [1,2]

/**
 * Pytania do rozważenia podczas rozwiązywania:
 *
 * 1. Jak radzić sobie z przypadkiem gdy jedna z list jest pusta?
 * 2. Co zrobić gdy dotrzesz do końca jednej z list?
 * 3. Jak porównywać wartości węzłów i decydować który dołączyć?
 * 4. Dlaczego dummy węzeł może uprościć implementację?
 * 5. Jak utrzymać referencje do poprzedniego węzła podczas budowania wyniku?
 *
 * Przypadki brzegowe do przemyślenia:
 * - Obie listy puste
 * - Jedna lista pusta, druga niepusta
 * - Listy o różnych długościach
 * - Wszystkie elementy w jednej liście mniejsze od drugiej
 * - Identyczne wartości w obu listach
 * - Listy jednowęzłowe
 */

/**
 * Wskazówki dotyczące podejścia:
 *
 * Podejście iteracyjne z dummy węzłem:
 * 1. Stwórz dummy węzeł jako placeholder dla głowy wyniku
 * 2. Użyj wskaźnika current do budowania wyniku
 * 3. Porównuj wartości obecnych węzłów obu list
 * 4. Dołącz węzeł z mniejszą wartością do wyniku
 * 5. Przesuń wskaźnik w liście z której wzięto węzeł
 * 6. Gdy jedna lista się skończy, dołącz resztę drugiej
 * 7. Zwróć dummy.next jako głowę wyniku
 *
 * Alternatywne podejście rekurencyjne:
 * - Porównaj głowy obu list
 * - Wybierz mniejszą jako głowę wyniku
 * - Rekurencyjnie scal resztę tej listy z drugą listą
 *
 * Złożoność czasowa: O(n + m) - gdzie n i m to długości list
 * Złożoność pamięciowa: O(1) dla iteracyjnego, O(n + m) dla rekurencyjnego
 */

export { mergeTwoLists, ListNode, createList, listToArray };
