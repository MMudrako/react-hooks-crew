'use client';

import React, { useState, useReducer } from "react";

export default function TheSorter() {

  /*
  function reducer(state: SorterState, action: Action) {
    switch(action.type) {

      case "SelectAgent": {
        // load agent into state
      }

      case "StartMissionSearch": {
        // toggle scanning screen
      }

      case "AssignMission": {
        // pick mission and save it into state
      }

      case "Reset": {
        // clear everything
      }

      default:
        return state;
    }
  }
  */

  return (
    <div>

      {/* -------------------- */}
      {/* SCREEN 1: Agent Selection */}
      {/* -------------------- */}
      <section id="screen1">
        {/* Load agents from localStorage */}
        {/* Let user pick one */}
        {/* Button: "Find Mission" (enabled after selection) */}
      </section>


      {/* -------------------- */}
      {/* SCREEN 2: Trait Scanning */}
      {/* -------------------- */}
      <section id="screen2">
        {/* Animated spinner (non-blocking) */}
        {/* "Analyzing traits..." text */}
        {/* Maybe subtle SFX (optional) */}
      </section>


      {/* -------------------- */}
      {/* SCREEN 3: Mission Assignment */}
      {/* -------------------- */}
      <section id="screen3">
        {/* Mission Card UI */}
        {/* Highlight which agent traits match the mission */}
        {/* Required Roles: filled vs. unfilled */}
        {/* Button: Reset */}
      </section>

    </div>
  );
}
