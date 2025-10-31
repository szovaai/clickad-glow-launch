/// <reference types="vite/client" />

interface TrakrlyAPI {
  pv: () => void;
  click: (data?: Record<string, any>) => void;
}

interface Window {
  Trakrly?: TrakrlyAPI;
}
