import { useCallback, useState } from "react";

export function useModalState(defaultValue = false) {
  const [isopen, SetisOpen] = useState(defaultValue);

  const open = useCallback(() => SetisOpen(true), []);

  const close = useCallback(() => SetisOpen(false), []);

  return { isopen, open, close };
}
