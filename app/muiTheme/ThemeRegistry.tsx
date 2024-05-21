"use client";

import { CacheProvider } from "@emotion/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { gardaTheme } from "@/app/muiTheme/theme";
import { CssBaseline } from "@mui/material";

export default function RootStyleRegistry({
  children,
}: {
  children: JSX.Element;
}) {
  const [{ cache, flush }] = useState(() => {
    const newCache = createCache({ key: "my" });
    newCache.compat = true;
    const prevInsert = newCache.insert;
    let inserted: string[] = [];
    newCache.insert = (...args) => {
      const serialized = args[1];
      if (newCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const newFlush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: newCache, flush: newFlush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={gardaTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
