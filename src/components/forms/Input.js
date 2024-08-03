import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <div className="relative">
            <label htmlFor="" className="absolute left-5 -top-3 rounded px-3">
                {label}
            </label>
            <input ref={ref} {...props} className="px-3 pt-3 pb-3 rounded-xl text-xl w-full border border-slate-300" />

            {error && <p className="text-base font-medium text-orange-500 text-right uppercase w-full">{error}</p>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;