"use client";

import styles from "./page.module.css";
import { AblyProvider } from "ably/react";

import CollectUser from "./components/CollectUser";

const options = { authUrl: "/api/gettoken" };

export default function Home() {
  return (
    <AblyProvider options={options}>
      <main className={styles.main}>
        <CollectUser></CollectUser>
      </main>
    </AblyProvider>
  );
}
