import { useEffect, useRef } from "react";

export default function useUpdateEffect(effect, dependencies) {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    return effect();
  }, dependencies);
}
