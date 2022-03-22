import { useRef, useEffect } from "react";

export function usePrevious(value: any) {
  const ref = useRef<any>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
