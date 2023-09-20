"use client";

import styles from "./page.module.css";
import { AblyProvider } from "ably/react";

import Message from "./components/Message";

const options = { authUrl: "/api/auth" };

export default function Home() {
  return (
    <AblyProvider options={options}>
      <main className={styles.main}>
        <Message></Message>
      </main>
    </AblyProvider>
  );
}
