'use client';

import React from 'react';
import Image from 'next/image';
export default function Intro() {
    return (
        <section className="text-center px-4 max-w-3xl mx-auto">

            {/* =====================
          HERO: React's Eleven
         ===================== */}
            <section className="flex flex-col items-center text-center gap-4">
                {/* Hero Image */}
                <div className="w-full max-w-4xl h-64 bg-gray-200">
                    {/* React’s Eleven hero image placeholder */}
                </div>

                <h1 className="text-4xl font-bold">
                    {`React’s`} Eleven
                </h1>

                <p className="text-lg text-gray-600">
                    A covert squad of React Hooks.
                </p>
            </section>

            {/* =====================
          VALUE PROPOSITION
         ===================== */}
            <section className="max-w-3xl mx-auto text-center">
                <p className="text-base text-gray-700 leading-relaxed">
                    This project is a gamified learning environment where React Hooks are personified as elite operatives inside a fictional HQ.
                    Instead of passively consuming tutorials, you learn by deploying, observing, and interacting with hooks under real UI conditions.

                    Welcome to Imaginaria.
                    A fictional world designed to teach real engineering concepts through strategy, systems, and decision-making. This is the operational landscape where missions unfold, agents are trained, and tradeoffs matter. Every region, language, and alliance exists to give context to the problems your hooks are built to solve.

                    Imaginaria is not a setting for {`lore’s`}  sake. It is a framework for thinking — a way to make abstract React concepts tangible through cause, effect, and consequence.
                </p>
            </section>

            {/* =====================
          IMAGINARIA ORIENTATION
         ===================== */}
            <section className="flex flex-col items-center gap-4">
                {/* Imaginaria Image */}
                < Image
                    className="w-full max-w-4xl h-72 border border-black"
                    alt="Imaginaria Land"
                    src={`/ImaginariaLand.jpg`}
                    width={5464}
                    height={3070} />


                <p className="text-sm text-gray-500">
                    Imaginaria — a fictional world used to contextualize systems,
                    decisions, and missions.
                </p>
            </section>

            {/* =====================
          REGIONS ACCORDION
         ===================== */}
            <section className="max-w-3xl mx-auto w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Regions of Imaginaria
                </h2>

                <div className="flex flex-col gap-2">
                    {/* Accordion Item */}
                    <details className="border rounded-md p-4">
                        <summary className="cursor-pointer font-medium">
                            Northland
                        </summary>
                        <p className="mt-2 text-sm text-gray-600">
                            Northern Alliance of fortified states known for advanced
                            manufacturing, research, and cold-region infrastructure.
                        </p>
                    </details>

                    <details className="border rounded-md p-4">
                        <summary className="cursor-pointer font-medium">
                            Midlands
                        </summary>
                        <p className="mt-2 text-sm text-gray-600">
                            Trade crossroads connecting all regions, rich in agriculture,
                            rare minerals, and diplomatic influence.
                        </p>
                    </details>

                    <details className="border rounded-md p-4">
                        <summary className="cursor-pointer font-medium">
                            Southland
                        </summary>
                        <p className="mt-2 text-sm text-gray-600">
                            Resource-rich southern territories exporting exotic goods,
                            energy resources, and strategic materials.
                        </p>
                    </details>
                </div>
            </section>



        </section>
    );
}
