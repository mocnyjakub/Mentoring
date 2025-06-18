/**
 * Zadanie: Praktyczne zastosowanie operatora satisfies
 *
 * Operator satisfies pozwala na sprawdzenie, czy wartość spełnia dany typ,
 * zachowując jednocześnie jej dokładny typ. Jest to szczególnie przydatne
 * gdy chcemy zachować literalne typy, a jednocześnie upewnić się, że
 * implementacja jest zgodna z oczekiwanym interfejsem.
 *
 * W tym zadaniu zaimplementujemy system konfiguracji dla różnych
 * środowisk (development, production, test) używając satisfies.
 */

type Colors = "red" | "green" | "blue";
type RGB = [red: number, green: number, blue: number];

const paletteBad: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ~~~~ The typo is now correctly detected
};

const greenNormalizedBad = paletteBad.green.toUpperCase();

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
  //  ~~~~ The typo is now caught!
} satisfies Record<Colors, string | RGB>;

const greenNormalized = palette.green.toUpperCase();

// Definicja typów dla konfiguracji
type Environment = "development" | "production" | "test";

// Definiujemy dokładne typy dla URL-i
type ApiUrls = {
  development: "http://localhost:3000";
  production: "https://api.production.com";
  test: "http://localhost:3001";
};

type BaseConfig = {
  apiUrl: ApiUrls[Environment]; // Używamy mapped type dla URL-i
  timeout: number;
  retries: number;
};

type EnvironmentConfig = {
  [K in Environment]: BaseConfig;
};

// Implementacja konfiguracji
const config = {
  development: {
    apiUrl: "http://localhost:3000",
    timeout: 5000,
    retries: 3,
  },
  production: {
    apiUrl: "https://api.production.com",
    timeout: 3000,
    retries: 2,
  },
  test: {
    apiUrl: "http://localhost:3001",
    timeout: 1000,
    retries: 1,
  },
} satisfies EnvironmentConfig;

// Przykład 1: Zachowanie literalnych typów
const devConfig = config.development;
// TypeScript wie, że apiUrl to dokładnie "http://localhost:3000"
// a nie tylko string

// Przykład 2: Sprawdzenie zgodności z typem
type ApiEndpoint = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requiresAuth: boolean;
};

const endpoints = {
  users: {
    path: "/api/users",
    method: "GET",
    requiresAuth: true,
  },
  login: {
    path: "/api/auth/login",
    method: "POST",
    requiresAuth: false,
  },
} satisfies Record<string, ApiEndpoint>;

// Przykład 3: Złożona konfiguracja z zagnieżdżonymi typami
type FeatureFlag = {
  enabled: boolean;
  rolloutPercentage: number;
  targetUsers?: string[];
};

type FeatureConfig = {
  [key: string]: FeatureFlag;
};

const features = {
  darkMode: {
    enabled: true,
    rolloutPercentage: 100,
  },
  newDashboard: {
    enabled: false,
    rolloutPercentage: 50,
    targetUsers: ["premium", "beta"],
  },
} satisfies FeatureConfig;

// Testy
console.log("Development config:", config.development);
console.log("API Endpoints:", endpoints);
console.log("Feature flags:", features);

// Przykład użycia w praktyce
function getApiConfig(env: Environment): BaseConfig {
  return config[env];
}

function isFeatureEnabled(featureName: keyof typeof features): boolean {
  return features[featureName].enabled;
}

// Testy funkcji
console.log("Production API config:", getApiConfig("production"));
console.log("Is dark mode enabled:", isFeatureEnabled("darkMode"));
console.log("Is new dashboard enabled:", isFeatureEnabled("newDashboard"));

// Przykład 4: Sprawdzenie literalnych typów
const devUrl = config.development.apiUrl;
// devUrl jest typu "http://localhost:3000"

const prodUrl = config.production.apiUrl;
// prodUrl jest typu "https://api.production.com"

const testUrl = config.test.apiUrl;
// testUrl jest typu "http://localhost:3001"

export {};
