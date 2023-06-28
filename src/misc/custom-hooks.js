import { useEffect } from "react";
import { useCallback, useState } from "react";

export function useModalState(defaultValue = false) {
  const [isopen, SetisOpen] = useState(defaultValue);

  const open = useCallback(() => SetisOpen(true), []);

  const close = useCallback(() => SetisOpen(false), []);

  return { isopen, open, close };
}

export const useMediaQuery = (query) => {
  const [matches, SetMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    SetMatches(queryList.matches);

    const listener = (evt) => SetMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListerner(listener);
  }, [query]);

  return matches;
};
