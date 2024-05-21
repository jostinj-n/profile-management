// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect } from "@jest/globals";
import * as english from "./en.json";
import * as french from "./fr.json";

const haveSameKeys = (
  first: Record<string, any>,
  second: Record<string, any>,
) => {
  const firstKeys = Object.keys(first).sort();
  const secondKeys = Object.keys(second).sort();

  if (JSON.stringify(firstKeys) !== JSON.stringify(secondKeys)) {
    console.log(
      "Keys difference ",
      firstKeys.filter((k) => !secondKeys.includes(k)),
      secondKeys.filter((k) => !firstKeys.includes(k)),
    );
    return false;
  }

  for (const key of firstKeys) {
    const firstValue = first[key];
    const secondValue = second[key];

    if (typeof firstValue === "object" && typeof secondValue === "object") {
      if (!haveSameKeys(firstValue, secondValue)) {
        return false;
      }
    }
  }
  return true;
};

describe("Dictionaries keys presence check", () => {
  it("english and french should have the same keys", () => {
    expect(haveSameKeys(english, french)).toBe(true);
  });
});
