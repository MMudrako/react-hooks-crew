"use client"
import { useEffect, useRef, forwardRef } from "react";
import regions from "../../data/regionLanguages.json";
import ImaginariaMap from "../../data/Imaginaria.svg"
import { capitalize } from "@/lib/format";

type Country = {
    id: string,
    name: string,
    language: string,
    color: string,

};

const CountryMap: SVGElement = ImaginariaMap

type RegionDescription = {
    name: string,
    theme: string,
    description: string,
    historyAndEconomy: string,
    countries: Country[]
};

type Region = "NorthLand" | "Midlands" | "Southlands";

interface PathData {
    id: string;
    d: string;
}

type RegionsMap = Record<Region, PathData[]>;

interface MapProps {
    regions: RegionsMap;
    onPathClick?: (region: Region, pathId: string) => void
}
//parent Component 
export default function InteractiveMap() {

    const mapRef = useRef<SVGElement>(CountryMap);



    function createCountryPathLabel(path: SVGPathElement) {
        const pathBbox = path.getBBox();
        const text = document.createElementNS("http://www/w3.org/2000/svg", "text");
        text.textContent = capitalize(path.id)
        text.setAttributeNS("http://www/w3.org/2000/svg", "x", `${pathBbox.x + pathBbox.width / 2}`);
        text.setAttributeNS("http://www/w3.org/2000/svg", "y", `${pathBbox.y + pathBbox.height / 2}`);
        text.setAttributeNS("http://www/w3.org/2000/svg", "fontsize", "6");
        text.setAttributeNS("http://www/w3.org/2000/svg", "fill", "black")
        text.setAttributeNS("http://www/w3.org/2000/svg", "text-anchor", "middle")
        path.parentNode?.appendChild(text)
    }

    useEffect(() => {

        const svg = mapRef.current;
        if (!svg) return;
        const handleCountryClick = (e: MouseEvent) => {
            const id = (e.target as SVGPathElement).id;
            console.log("Clicked:", id);
            // setSelectedCountry(id) etc.
        };
        const groups = Array.from(svg.querySelectorAll("g[id]"));
        const allPaths: SVGPathElement[] = [];
        groups.forEach(group => {
            const regionId = group.id;
            const paths: SVGPathElement[] = Array.from(svg.querySelectorAll("path[id]"));

            console.log(`Region ${regionId} has ${paths.length} countries.`);
            paths.forEach(path => {
                path.addEventListener("click", handleCountryClick);
                createCountryPathLabel(path);
                console.log(path.id);
                allPaths.push(path)
            });
        });


        return () => {
            allPaths.forEach(path => {
                path.removeEventListener("click", handleCountryClick)
            });
        }
    }, []);

    return (
        <>

            <CountryMap ref={mapRef} />




        </>



    )

}