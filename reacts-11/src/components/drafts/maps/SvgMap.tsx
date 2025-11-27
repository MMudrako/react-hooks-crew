'use client';
import { forwardRef } from 'react';
import ImaginariaMap from "../../data/Imaginaria.svg"

type Region = "NorthLand" | "Midlands" | "Southlands";


interface PathData {
    id: string;
    d: string;
    fill: string;

}

type RegionsMap = Record<Region, PathData[]>;

interface MapProps {
    regions: RegionsMap;
    onPathClick?: (region: Region, pathId: string) => void;
}

export const SvgMap = forwardRef<SVGSVGElement, MapProps>(
    ({ regions, onPathClick }, ref) => {
        return (
            <svg ref={ref} viewBox='0 0 200 200' className='w-full h-auto'>
                {(Object.keys(regions) as (keyof RegionsMap)[]).map((region) => (
                    <g key={region} id={region}>
                        {regions[region].map((path) => (
                            <path key={path.id}
                                id={path.id}
                                d={path.d}
                                stroke="black"
                                stroke-linecap="round" />
                        ))}
                    </g>
                ))}
            </svg>
        )
    }
)