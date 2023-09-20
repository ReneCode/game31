"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { AblyProvider } from "ably/react";

// import Message from "./components/Message";

// https://github.com/ably-labs/react-hooks/issues/8
// https://ably.com/blog/realtime-chat-app-nextjs-vercel

const Message = dynamic(() => import("./components/Message"), { ssr: false });

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
