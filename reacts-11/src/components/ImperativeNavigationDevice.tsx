import {
    forwardRef,
    useImperativeHandle,
    useRef
} from "react";

import { sanitizeInput } from "@/lib/safeguard";

export type FieldDeviceHandle = {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
};

const FieldDeviceInput = forwardRef<
    FieldDeviceHandle,
    { placeholder?: string }
>(({ placeholder }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({

        focus: () => {
            inputRef.current?.focus();
            console.log(" Navigator requested focus()");
        },

        clear: () => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            console.log(" Navigator requested clear()");
        },

        getValue: () => {
            const safeInput = sanitizeInput(inputRef.current?.value || "");
            return safeInput;
        }

    }), []);

    return (
        <div className="w-[280px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4">

            <h4 className="font-oxanium text-emerald-400 mb-2">
                Field Device
            </h4>

            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className="
                    w-full
                    bg-black
                    border
                    border-zinc-600
                    rounded
                    px-2
                    py-1
                    text-green-400
                    font-mono
                    focus:outline-none
                    focus:border-emerald-400
                "
            />

        </div>
    );
});

FieldDeviceInput.displayName = "FieldDeviceInput";

export default FieldDeviceInput;
