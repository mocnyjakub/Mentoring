/**
 * Zadanie 3: Async/Await i Event Loop
 *
 * Uruchom ten kod i sprawdź kolejność logów w konsoli.
 * Następnie odpowiedz na pytania:
 * 1. Jak async/await wpływa na kolejność wykonywania zadań?
 * 2. Czy await zawsze tworzy nowy microtask?
 * 3. Jak działa await w kontekście Promise.resolve()?
 */

async function main() {
  console.log("1. Start main");

  await Promise.resolve();
  console.log("2. After first await");

  setTimeout(() => {
    console.log("3. Inside setTimeout");
  }, 0);

  await Promise.resolve();
  console.log("4. After second await");

  Promise.resolve().then(() => {
    console.log("5. Inside then");
  });

  console.log("6. End main");
}

console.log("7. Before main");
main();
console.log("8. After main");

// Oczekiwana kolejność:
// 7. Before main
// 1. Start main
// 2. After first await
// 4. After second await
// 6. End main
// 8. After main
// 5. Inside then
// 3. Inside setTimeout
