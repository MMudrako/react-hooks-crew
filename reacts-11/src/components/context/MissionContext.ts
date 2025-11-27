"use client";
import { createContext, useContext } from "react";
import { Mission } from '../hookDemos/level1/TheMissionArchitect'

//Declares the context object for global data sharing.
export const MissionContext = createContext<Mission>({ missionMode: 'stealth' });

export function useMission() {

    return useContext(MissionContext);
}