/**
 * Zadanie 1: Podstawowa kolejność wykonywania zadań
 *
 * Uruchom ten kod i sprawdź kolejność logów w konsoli.
 * Następnie odpowiedz na pytania:
 * 1. Dlaczego logi pojawiają się w takiej kolejności?
 * 2. Co to jest microtask queue?
 * 3. Co to jest macrotask queue?
 * 4. Jakie jest różnica między Promise a setTimeout w kontekście Event Loop?
 */

console.log("1. Start");

setTimeout(() => {
  console.log("2. setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");

// Oczekiwana kolejność:
// 1. Start
// 4. End
// 3. Promise
// 2. setTimeout
