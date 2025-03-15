"use client";

import { useEffect, useState } from "react";

import Chat from "./Chat";

import { DEFAULT_IMAGE } from "./ChatUtilities";

import importedStyles from "./ChatContainer.module.css";

export default function ChatContainer(props) {
  const chatConfiguration = props.chatConfiguration;
  const chatHandler = props.chatHandler;
  const chats = props.chats;
  const defaultImage = props.defaultImage || DEFAULT_IMAGE;
  const linkFactory = props.linkFactory;
  const setChats = props.setChats;
  const styles = props.styles || importedStyles;

  const [chatsReversed, setChatsReversed] = useState([]);

  useEffect(() => {
    const newChats = [...chats];
    const newChatsReversed = newChats.reverse();

    setChatsReversed(newChatsReversed);
  }, [chats]);

  return (
    <div className={styles.chat_container}>
      {chatsReversed.map((chat, chatIndex) => (
        <Chat chat={chat} chatConfiguration={chatConfiguration} chatHandler={chatHandler} chatIndex={chatIndex} chats={chats} defaultImage={defaultImage} key={chat.key || "chat-" + chatIndex} linkFactory={linkFactory} setChats={setChats} />
      ))}
    </div>
  );
}
