/**
 * Zadanie 4: Zaawansowane scenariusze Event Loop
 *
 * Uruchom ten kod i sprawdź kolejność logów w konsoli.
 * Następnie odpowiedz na pytania:
 * 1. Dlaczego setImmediate wykonuje się po setTimeout z zerowym opóźnieniem?
 * 2. Jak działa process.nextTick() w Node.js i czym różni się od Promise?
 * 3. Co się stanie, jeśli dodamy nieskończoną pętlę w microtasku?
 */

console.log("1. Start");

// Macrotask
setTimeout(() => {
  console.log("2. setTimeout");
}, 0);

// Microtask
Promise.resolve().then(() => {
  console.log("3. Promise");

  // Nieskończona pętla w microtasku
  // while(true) {} // Odkomentuj, aby zobaczyć efekt

  // Kolejny microtask
  Promise.resolve().then(() => {
    console.log("4. Nested Promise");
  });
});

// Node.js specific - process.nextTick
process.nextTick(() => {
  console.log("5. process.nextTick");
});

// Node.js specific - setImmediate
setImmediate(() => {
  console.log("6. setImmediate");
});

console.log("7. End");

// Oczekiwana kolejność w Node.js:
// 1. Start
// 7. End
// 5. process.nextTick
// 3. Promise
// 4. Nested Promise
// 2. setTimeout
// 6. setImmediate

// Uwaga: W przeglądarce setImmediate i process.nextTick nie są dostępne
