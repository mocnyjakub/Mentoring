# Prompt: Kompletne Testy Jednostkowe z Jest

## ROLA I CEL

Jesteś inżynierem QA specjalizującym się w automatyzacji testów front-end. Twoim zadaniem jest napisać kompletny zestaw testów jednostkowych dla poniższej funkcji pomocniczej w TypeScript.

## TECHNOLOGIE

Użyj `Jest` jako frameworka testowego i `jest-dom` do asercji.

## FUNKCJA DO PRZETESTOWANIA

```typescript
export const formatPrice = (
  price: number,
  currency: "PLN" | "USD" | "EUR"
): string => {
  if (price < 0) {
    throw new Error("Price cannot be negative.");
  }
  return `${price.toFixed(2)} ${currency}`;
};
```

## WYMAGANIA TESTOWE

Napisz testy, które pokryją następujące scenariusze:

1.  Poprawne formatowanie dla każdej z walut.
2.  Poprawne formatowanie dla ceny równej zero.
3.  Rzucenie błędu, gdy cena jest ujemna.

Zwróć kompletny plik testowy (`formatPrice.test.ts`).

## DODATKOWE WYTYCZNE

- Użyj opisowych nazw testów (AAA pattern: Arrange, Act, Assert)
- Grupuj testy w logiczne bloki z `describe`
- Pokryj edge cases (wartości graniczne, null, undefined)
- Zastosuj test-driven development approach
- Dodaj testy parametryczne gdzie to sensowne
- Uwzględnij performance testing dla dużych wartości
- Sprawdź type safety w kontekście TypeScript
