"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AvatarContextValue {
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
}

const AvatarContext = createContext<AvatarContextValue>({
  avatarUrl: null,
  setAvatarUrl: () => {},
});

export function AvatarProvider({ children, initial }: { children: ReactNode; initial?: string | null }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initial ?? null);
  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  return useContext(AvatarContext);
}
