export const loadState = (
  state: string
): Record<string, unknown> | undefined => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (
  state: string,
  serializedState: Record<string, unknown>
) => {
  const stringifyState = JSON.stringify(serializedState);
  localStorage.setItem(state, stringifyState);
};

export const removeState = (state: string) => {
  localStorage.removeItem(state);
};
