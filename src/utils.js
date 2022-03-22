import React, { useRef, useEffect } from "react";

export function usePrevious(value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
