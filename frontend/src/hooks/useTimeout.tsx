import { useEffect } from "react";

function useTimeout(func: any, seconds: number, input: any): void {
  useEffect(() => {
    const hideMessage = setTimeout(() => func(input), seconds);
    return () => clearTimeout(hideMessage);
  }, [func, seconds, input]);
}

export default useTimeout;
