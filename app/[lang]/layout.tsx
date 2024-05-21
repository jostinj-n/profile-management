import "../globals.css";
import type { Metadata } from "next";
import Header from "@/app/component/header/header";
import SideNavbar from "../component/navbar/sideNavbar";
import React, { ReactNode } from "react";
import { Locale } from "@/i18n.config";
import styles from "./layout.module.css";
import { ReduxProvider } from "@/app/redux/provider";
import RootStyleRegistry from "@/app/muiTheme/ThemeRegistry";
import { NotistackProvider } from "@/app/component/NotistackProvider";

export const metadata: Metadata = {
  title: "GardaWorld Workforce app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;
  return (
    <html lang={lang}>
      <body id="__next">
        <RootStyleRegistry>
          <ReduxProvider>
            <div className={styles.gridContainer}>
              <div className={styles.header}>
                <Header />
              </div>
              <div className={styles.sidebar}>
                <SideNavbar lang={lang} />
              </div>
              <div className={styles.main}>
                <NotistackProvider>
                  <main>{children}</main>
                </NotistackProvider>
              </div>
            </div>
          </ReduxProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
