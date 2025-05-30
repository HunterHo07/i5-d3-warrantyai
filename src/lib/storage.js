// WarrantyAI - Frontend Storage Utilities (LocalStorage, IndexedDB, Cookies)

// LocalStorage Utilities
export const localStorage = {
  set: (key, value) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage set error:", error);
    }
  },

  get: (key, defaultValue = null) => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("LocalStorage get error:", error);
      return defaultValue;
    }
  },

  remove: (key) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage remove error:", error);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error("LocalStorage clear error:", error);
    }
  },

  exists: (key) => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(key) !== null;
  },
};

// Cookie Utilities
export const cookies = {
  set: (name, value, days = 30) => {
    if (typeof document === "undefined") return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
  },

  get: (name, defaultValue = null) => {
    if (typeof document === "undefined") return defaultValue;
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch {
          return c.substring(nameEQ.length, c.length);
        }
      }
    }
    return defaultValue;
  },

  remove: (name) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  exists: (name) => {
    if (typeof document === "undefined") return false;
    return document.cookie.indexOf(name + "=") !== -1;
  },
};

// IndexedDB Utilities for complex data
export const indexedDB = {
  dbName: "WarrantyAI",
  version: 1,
  stores: ["warranties", "products", "reminders", "files"],

  open: () => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("IndexedDB not available"));
        return;
      }

      const request = window.indexedDB.open(indexedDB.dbName, indexedDB.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        indexedDB.stores.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            store.createIndex("createdAt", "createdAt", { unique: false });
            store.createIndex("updatedAt", "updatedAt", { unique: false });
          }
        });
      };
    });
  },

  add: async (storeName, data) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      
      const dataWithTimestamp = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return new Promise((resolve, reject) => {
        const request = store.add(dataWithTimestamp);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB add error:", error);
      throw error;
    }
  },

  get: async (storeName, id) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB get error:", error);
      throw error;
    }
  },

  getAll: async (storeName) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB getAll error:", error);
      throw error;
    }
  },

  update: async (storeName, data) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const dataWithTimestamp = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return new Promise((resolve, reject) => {
        const request = store.put(dataWithTimestamp);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB update error:", error);
      throw error;
    }
  },

  delete: async (storeName, id) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB delete error:", error);
      throw error;
    }
  },

  clear: async (storeName) => {
    try {
      const db = await indexedDB.open();
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("IndexedDB clear error:", error);
      throw error;
    }
  },
};

// User Preferences Storage
export const userPreferences = {
  get: () => localStorage.get("userPreferences", {
    theme: "dark",
    animations: true,
    notifications: true,
    language: "en",
    currency: "USD",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }),

  set: (preferences) => {
    const current = userPreferences.get();
    const updated = { ...current, ...preferences };
    localStorage.set("userPreferences", updated);
    return updated;
  },

  reset: () => {
    localStorage.remove("userPreferences");
    return userPreferences.get();
  },
};

// Demo Data Storage
export const demoData = {
  save: (data) => {
    localStorage.set("demoData", {
      ...data,
      lastUpdated: new Date().toISOString(),
    });
  },

  load: () => {
    return localStorage.get("demoData", {
      warranties: [],
      products: [],
      reminders: [],
      files: [],
      lastUpdated: null,
    });
  },

  clear: () => {
    localStorage.remove("demoData");
  },

  addWarranty: (warranty) => {
    const data = demoData.load();
    data.warranties.push({
      ...warranty,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    demoData.save(data);
    return data;
  },

  addProduct: (product) => {
    const data = demoData.load();
    data.products.push({
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    demoData.save(data);
    return data;
  },

  addReminder: (reminder) => {
    const data = demoData.load();
    data.reminders.push({
      ...reminder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    demoData.save(data);
    return data;
  },
};

// File Upload Simulation
export const fileSimulation = {
  uploadFile: async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fileData = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
        };

        const data = demoData.load();
        data.files.push(fileData);
        demoData.save(data);

        resolve(fileData);
      }, 1000 + Math.random() * 2000); // Simulate upload delay
    });
  },

  processReceipt: async (fileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI extraction
        const extractedData = {
          product: "Sample Product",
          brand: "Sample Brand",
          model: "SP-2024",
          purchaseDate: new Date().toISOString().split("T")[0],
          warrantyPeriod: "2 years",
          warrantyExpiry: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          price: "$299.99",
          store: "Sample Store",
          confidence: 0.95,
        };

        resolve(extractedData);
      }, 2000 + Math.random() * 3000); // Simulate AI processing delay
    });
  },
};

// Analytics Simulation
export const analytics = {
  track: (event, properties = {}) => {
    if (typeof window === "undefined") return;
    
    const analyticsData = localStorage.get("analytics", []);
    analyticsData.push({
      event,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem("sessionId") || "demo-session",
    });

    // Keep only last 100 events
    if (analyticsData.length > 100) {
      analyticsData.splice(0, analyticsData.length - 100);
    }

    localStorage.set("analytics", analyticsData);
  },

  getEvents: () => {
    return localStorage.get("analytics", []);
  },

  clearEvents: () => {
    localStorage.remove("analytics");
  },
};

export default {
  localStorage,
  cookies,
  indexedDB,
  userPreferences,
  demoData,
  fileSimulation,
  analytics,
};
