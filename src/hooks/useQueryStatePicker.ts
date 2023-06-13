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
      const url = new URL(router.asPath, "http://dummy.com")
      console.log(router.pathname, router.asPath, url.pathname)
      router
        .replace(url.pathname + "?" + name + "=" + options.defaultValue)
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
      const url = new URL(router.asPath, "http://dummy.com")
      router
        .replace(url.pathname + "?" + name + "=" + value)
        .finally(() => console.log("useQueryStatePicker update"));
    }
  }

  return [currentValue, updateValue];
}
