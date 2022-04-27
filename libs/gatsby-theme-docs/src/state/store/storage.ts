import { useEffect, useMemo, useState } from 'react';

const toStorage = (value) => JSON.stringify(value);

const fromStorage = (value) => (value !== null ? JSON.parse(value) : null);

export const useStorageListener = (key, onChange) => {
  const handleStorageChange = (event) => {
    if (event.key === key) {
      onChange(fromStorage(event.newValue));
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  });
};

const writeItem = (storage, key, value) =>
  new Promise<void>((resolve, reject) => {
    try {
      storage.setItem(key, toStorage(value));
      resolve();
    } catch (error) {
      reject(error);
    }
  });

export const useStorageWriter = (storage, key, state) => {
  const [writeError, setWriteError] = useState(undefined);

  useEffect(() => {
    writeItem(storage, key, state).catch(setWriteError);
  }, [state, key, storage]);
  useEffect(() => {
    setWriteError(undefined);
  }, [key]);

  return writeError;
};

const readItem = (storage, key) => {
  try {
    const storedValue = storage.getItem(key);

    return fromStorage(storedValue);
  } catch (e) {
    return null;
  }
};

export const useStorageReader = (storage, key, defaultValue) =>
  useMemo(() => {
    const storedValue = readItem(storage, key);
    return storedValue !== null ? storedValue : defaultValue;
  }, [key, storage, defaultValue]);
