import { useEffect } from "react";
import { useRouter } from "next/router";

interface UseQueryStatePickerOptions {
  allowedValues: Set<string>;
  defaultValue: string;
}

export function useQueryStatePicker(
  name: string,
  options: UseQueryStatePickerOptions
): [string, (newValue: string, invalidSetsToDefault?: boolean) => void] {
  const router = useRouter();
  const value = router.query[name];
  const stringValue = value ? value.toString() : undefined;

  useEffect(() => {
    if (!stringValue || !options.allowedValues.has(stringValue)) {
      router
        .replace(router.pathname + "?" + name + "=" + options.defaultValue)
        .finally(() => console.log("useQueryStatePicker checks"));
    }
  }, [router, name, stringValue, options]);

  const currentValue = stringValue ?? options.defaultValue;

  function updateValue(newValue: string, invalidSetsToDefault = false) {
    const value = options.allowedValues.has(newValue)
      ? newValue
      : invalidSetsToDefault
      ? options.defaultValue
      : currentValue;
    if (value !== currentValue) {
      router
        .replace(router.pathname + "?" + name + "=" + value)
        .finally(() => console.log("useQueryStatePicker update"));
    }
  }

  return [currentValue, updateValue];
}
