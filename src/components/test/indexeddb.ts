// src/indexeddb.ts
const DB_NAME = "sqlite-db";
const DB_VERSION = 1;
const STORE_NAME = "sqlite-store";

// Function to save the SQLite database file to IndexedDB
export async function saveToIndexedDB(dbFile: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.put(dbFile, "sqlite-db");
      resolve();
    };

    request.onerror = (event) => {
      console.error("Error saving to IndexedDB:", event);
      reject(event);
    };
  });
}

// Function to load the SQLite database file from IndexedDB
export async function loadFromIndexedDB(): Promise<Uint8Array | undefined> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get("sqlite-db");

      getRequest.onsuccess = (event) => {
        const dbFile = (event.target as IDBRequest).result as Uint8Array;
        resolve(dbFile);
      };

      getRequest.onerror = (event) => {
        console.error("Error loading from IndexedDB:", event);
        reject(event);
      };
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event);
      reject(event);
    };
  });
}
