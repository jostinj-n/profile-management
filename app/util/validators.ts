import { languageOptions } from "./options";

export function nameIsValid(name: string): boolean {
  return name.length >= 2;
}

export function languageIsValid(language: string): boolean {
  return !!languageOptions.find((o) => o.value === language);
}
