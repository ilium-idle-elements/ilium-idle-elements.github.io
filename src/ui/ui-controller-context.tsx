import React, { createContext, useState } from "react";

export enum DISPLAY_CONTENT {
  CREATION = "CREATION",
  SETTINGS = "SETTINGS",
  PRESTIGE = "PRESTIGE",
}

export type UiControllerContextProps = {
  drawerOpen: boolean;
  setDrawerOpen: Function;
  selectedContent: DISPLAY_CONTENT;
  setSelectedContent: Function;
};

export const UiControllerContext = createContext<UiControllerContextProps>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  selectedContent: DISPLAY_CONTENT.CREATION,
  setSelectedContent: () => {},
});

export function UiControllerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(
    DISPLAY_CONTENT.CREATION
  );

  const fullContext = {
    drawerOpen,
    setDrawerOpen,
    selectedContent,
    setSelectedContent,
  };

  return (
    <UiControllerContext.Provider value={fullContext}>
      {children}
    </UiControllerContext.Provider>
  );
}
