import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "選択してください",
  label,
  disabled = false,
  className = "",
}: SelectProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {label && (
          <Listbox.Label className="label-text text-xs opacity-70 mb-1">{label}</Listbox.Label>
        )}
        <div className="relative">
          <Listbox.Button
            className="
            select select-bordered w-full 
            text-left text-sm 
            hover:select-primary 
            focus:select-primary focus:outline-none 
            disabled:select-disabled
          "
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 opacity-60" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
              menu bg-base-100 rounded-box z-50 
              absolute mt-1 max-h-60 w-full overflow-auto 
              border border-base-300 
              py-1 shadow-lg 
              focus:outline-none text-sm
            "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `menu-item ${
                      active ? "bg-primary text-primary-content" : ""
                    } ${option.disabled ? "disabled" : ""}`
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <div className="flex items-center py-2 pl-10 pr-4">
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
