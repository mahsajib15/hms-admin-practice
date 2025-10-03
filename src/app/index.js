export const dispatch = (action) => {
  console.warn("Dispatch function in src/app/index.js is a placeholder. Implement your actual store dispatch here.", action);
  return {
    unsubscribe: () => {},
    refetch: () => Promise.resolve(),
  };
};