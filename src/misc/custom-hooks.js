import { useEffect } from "react";
import { useCallback, useState } from "react";
import { database } from "./firebase";

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
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);

    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });

    return () => {
      userStatusRef.off();
    };
  }, [uid]);

  return presence;
}
