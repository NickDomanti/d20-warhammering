import type { ClassNameValue } from 'tailwind-merge';

export default function useMergedSlotClasses<
  T extends Record<string, ClassNameValue>,
>(ui: T | undefined, fixed: T) {
  return computed(() =>
    Object.entries(fixed).reduce(
      (acc, [k, v]) => {
        const fromProps = ui?.[k];

        if (fromProps) acc[k] = `${v} ${fromProps}`;
        else acc[k] = v;

        return acc;
      },
      { ...ui },
    ),
  );
}
