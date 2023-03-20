import { useEffect } from "react";

function useTimeout(func: (param: string) => void): void {
  useEffect(() => {
    const TWO_SECONDS = 2000;
    const hideMessage = setTimeout(() => func(''), TWO_SECONDS);
    return () => clearTimeout(hideMessage);
  }, [func]);
}

export default useTimeout;
