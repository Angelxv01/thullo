import { useEffect } from "react";

const useDelay = (delay = 1000, callback: () => void) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay]);

  return;
};

export default useDelay;
