/**
 * Zadanie 2: Zagnieżdżone zadania w Event Loop
 *
 * Uruchom ten kod i sprawdź kolejność logów w konsoli.
 * Następnie odpowiedz na pytania:
 * 1. Dlaczego Promise wykonuje się przed setTimeout, nawet jeśli jest zagnieżdżony?
 * 2. Co się stanie, jeśli dodamy kolejny Promise.resolve() w then()?
 * 3. Jak działa kolejka microtasków w przypadku zagnieżdżonych Promise?
 */

console.log("1. Start");

setTimeout(() => {
  console.log("2. setTimeout start");

  Promise.resolve().then(() => {
    console.log("3. Promise inside setTimeout");
  });

  console.log("4. setTimeout end");
}, 0);

Promise.resolve().then(() => {
  console.log("5. Promise start");

  setTimeout(() => {
    console.log("6. setTimeout inside Promise");
  }, 0);

  console.log("7. Promise end");
});

console.log("8. End");

// Oczekiwana kolejność:
// 1. Start
// 8. End
// 5. Promise start
// 7. Promise end
// 2. setTimeout start
// 4. setTimeout end
// 3. Promise inside setTimeout
// 6. setTimeout inside Promise
