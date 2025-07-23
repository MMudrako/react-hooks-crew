"use client";
import { createContext, useContext } from "react";

//Declares the context object for global data sharing.
export const MissionContext = createContext({ mission: 'stealth' });

export function useMission() {

    return useContext(MissionContext);
}