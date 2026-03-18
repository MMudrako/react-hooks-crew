import React, { useState, useRef, useEffect } from "react";
import { capitalize } from "@/lib/format";

type ScrolSelectGroupProps = {
    category: string;
    values: string[];
    selectedValues: string[]; // controlled
    onChange: (category: string, value: string, checked: boolean) => void;
};


export function TraitScrolSelectGroup({
    category,
    values,
    selectedValues,
    onChange,
}: ScrolSelectGroupProps) {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return (
        <fieldset className="mb-4">
            <div ref={ref} className="relative w-40">

                {/* Display field */}
                <div
                    tabIndex={0}
                    onFocus={() => setOpen(true)}


                    className="border p-2 rounded cursor-text"
                >
                    Select {category}
                </div>

                {/* Dropdown list */}
                {open && (
                    <div className="absolute w-full border rounded bg-white shadow max-h-60 overflow-y-auto">

                        {values.map((value) => {
                            const checked = selectedValues.includes(value);

                            return (
                                <label htmlFor={`${category}-${value}`}
                                    key={value}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        id={`${category}-${value}`}
                                        checked={checked}
                                        onChange={(e) => {
                                            onChange(category, value, e.target.checked)
                                            console.log("change fired")
                                        }

                                        }
                                    />

                                    {capitalize(value)}
                                </label>
                            );
                        })}

                    </div>
                )}
            </div>


        </fieldset>
    );
}
