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
          <Listbox.Label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
            {label}
          </Listbox.Label>
        )}
        <div className="relative">
          <Listbox.Button
            className="
            relative w-full cursor-default rounded-lg
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700
            py-2 pl-3 pr-10 text-left text-sm
            text-gray-900 dark:text-white
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
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
              absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              py-1 shadow-lg ring-1 ring-black ring-opacity-5
              focus:outline-none text-sm
            "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100"
                        : "text-gray-900 dark:text-white"
                    } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 dark:text-primary-400">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
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
