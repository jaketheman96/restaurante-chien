import { useEffect } from "react";

function useTimeout(func: (param: any) => void, seconds: number): void {
  useEffect(() => {
    const hideMessage = setTimeout(() => func(''), seconds);
    return () => clearTimeout(hideMessage);
  }, [func, seconds]);
}

export default useTimeout;
