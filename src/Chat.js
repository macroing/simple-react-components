"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import ChatMessage from "./ChatMessage";
import FileInputButtonLabel from "./FileInputButtonLabel";
import ImageViewer from "./ImageViewer";
import TextArea from "./TextArea";

import { DEFAULT_IMAGE } from "./ChatUtilities";

import importedStyles from "./Chat.module.css";

const variants = {
  maximized: { height: "75vh", opacity: 1 },
  minimized: { height: "auto", opacity: 1 },
};

export default function Chat(props) {
  const chat = props.chat;
  const chatConfiguration = props.chatConfiguration;
  const chatHandler = props.chatHandler;
  const chatIndex = props.chatIndex;
  const chats = props.chats;
  const defaultImage = props.defaultImage || DEFAULT_IMAGE;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const setChats = props.setChats;
  const styles = props.styles || importedStyles;

  const bodyRef = useRef();
  const inputRef = useRef();
  const timerRef = useRef();

  const [chatMessagesReversed, setChatMessagesReversed] = useState([]);
  const [chatMessagesReversedOld, setChatMessagesReversedOld] = useState([]);
  const [file, setFile] = useState(null);
  const [isImageViewerShowingSrcs, setIsImageViewerShowingSrcs] = useState(false);
  const [isLoadingChatMessages, setIsLoadingChatMessages] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisibleChat, setIsVisibleChat] = useState(true);
  const [isVisibleImageViewer, setIsVisibleImageViewer] = useState(false);
  const [lastTimeTyped, setLastTimeTyped] = useState(null);
  const [src, setSrc] = useState("");
  const [srcs, setSrcs] = useState([]);
  const [text, setText] = useState("");

  function defaultLinkFactory(href, text) {
    return <a href={href}>{text}</a>;
  }

  function generateBody() {
    return (
      <div className={styles.body} ref={bodyRef} style={isMinimized ? { display: "none" } : undefined}>
        {chat?.body?.page && chat?.body?.pages && chat.body.page < chat.body.pages && (
          <div className={styles.load_chat_messages}>
            <Button onClick={onClickLoadChatMessages}>{chat?.body?.loadChatMessagesText || "Load more..."}</Button>
          </div>
        )}
        {chatMessagesReversed.map((chatMessage, chatMessageIndex) => (
          <ChatMessage chat={chat} chatConfiguration={chatConfiguration} chatHandler={chatHandler} chatMessage={chatMessage} chats={chats} defaultImage={defaultImage} key={chatMessage?.key || "chat-message-" + (chatMessagesReversed.length - chatMessageIndex)} setChats={setChats} viewImage={viewImage} />
        ))}
      </div>
    );
  }

  function generateFooter() {
    return (
      <div className={styles.footer} style={isMinimized ? { display: "none" } : undefined}>
        <div className={styles.textarea}>
          <TextArea onChange={onChangeTextArea} onKeyDown={onKeyDownTextArea} resize={false} rows={3} style={{ width: "100%" }} value={text} />
        </div>
        <div className={styles.controls}>
          <div className={styles.keyboard + (isTyping ? " " + styles.keyboard_typing : "")}>
            <span className={"fa fa-keyboard"}></span>
          </div>
          <FileInputButtonLabel accept="image/*" htmlFor={"file-input" + chatIndex} id={"file-input" + chatIndex} inputRef={inputRef} onChange={onSelectFile} style={{ width: "100%" }}>
            <span aria-hidden className="fa fa-image"></span>
          </FileInputButtonLabel>
          <motion.button disabled={text.trim() === ""} onClick={onClickSend} transition={text.trim() === "" ? undefined : { type: "spring", stiffness: 500 }} whileHover={text.trim() === "" ? undefined : { scale: 1.03 }}>
            <span aria-hidden className="fa fa-send"></span>
          </motion.button>
        </div>
      </div>
    );
  }

  function generateHeader() {
    return (
      <div className={styles.header}>
        {generateHeaderImage()}
        {generateHeaderTitle()}
        {generateHeaderIcons()}
      </div>
    );
  }

  function generateHeaderIcons() {
    return (
      <div className={styles.icons}>
        <motion.button className={styles.icon} onClick={isMinimized ? onClickMaximize : onClickMinimize} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
          <span aria-hidden className={isMinimized ? "fa fa-window-maximize" : "fa fa-window-minimize"}></span>
        </motion.button>
        <motion.button className={styles.icon + " " + styles.icon_close} onClick={onClickClose} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
          <span aria-hidden className="fa fa-times-circle"></span>
        </motion.button>
      </div>
    );
  }

  function generateHeaderImage() {
    return (
      <div className={styles.image}>
        <img alt={chat?.header?.image?.alt || ""} src={chat?.header?.image?.src || defaultImage} />
        {chat?.header?.isLoggedIn && <span aria-hidden className={"fa fa-circle " + styles.logged_in}></span>}
      </div>
    );
  }

  function generateHeaderTitle() {
    return <div className={styles.title}>{linkFactory(chat?.header?.title?.href || "/", chat?.header?.title?.text || "")}</div>;
  }

  function generateUploadedImages() {
    return (
      chat?.uploadedImages &&
      chat?.uploadedImages.length > 0 && (
        <div className={styles.uploaded_images} style={isMinimized ? { display: "none" } : undefined}>
          {chat?.uploadedImages.map((uploadedImage, uploadedImageIndex) => (
            <motion.div className={styles.uploaded_image} key={uploadedImage?.key || "uploaded-image-" + uploadedImageIndex} onClick={(e) => viewImage(uploadedImage)} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
              <img alt={uploadedImage?.alt || ""} src={uploadedImage?.src || defaultImage} />
              <motion.div className={styles.close} onClick={(e) => onClickDeleteUploadedImage(e, uploadedImage)} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
                <span aria-hidden className="fa fa-times-circle"></span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )
    );
  }

  function onChangeTextArea(e) {
    setText(onFilterText(e.target.value));
  }

  function onClickClose(e) {
    setIsVisibleChat(false);

    setTimeout(() => {
      if (chatHandler?.onChatClose) {
        chatHandler.onChatClose(chat, chats, setChats);
      }
    }, 100);
  }

  function onClickDeleteUploadedImage(e, uploadedImage) {
    e.stopPropagation();

    if (chatHandler?.onDeleteUploadedImage) {
      chatHandler.onDeleteUploadedImage(chat, uploadedImage, chats, setChats);
    }
  }

  function onClickLoadChatMessages(e) {
    setIsLoadingChatMessages(true);

    if (chatHandler?.onLoadChatMessages) {
      chatHandler.onLoadChatMessages(chat, chats, setChats);
    }
  }

  function onClickMaximize(e) {
    setIsMinimized(false);
  }

  function onClickMinimize(e) {
    setIsMinimized(true);
  }

  function onClickSend(e) {
    if (chatHandler?.onSendChatMessage) {
      chatHandler.onSendChatMessage(chat, text, chats, setChats);
    }

    setText("");
  }

  function onFilterText(text) {
    if (chatHandler?.onFilterText) {
      return chatHandler.onFilterText(text);
    } else {
      return text;
    }
  }

  function onKeyDownTextArea(e) {
    if (chatHandler?.onType) {
      chatHandler.onType(chat, chats, setChats);
    }
  }

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  function uploadImage() {
    if (chatHandler?.onUploadImage) {
      chatHandler.onUploadImage(chat, file, chats, setChats);
    }

    setFile(null);
  }

  function viewImage(image, isImageViewerShowingSrcs = false) {
    if (image?.src) {
      setIsImageViewerShowingSrcs(isImageViewerShowingSrcs);
      setIsVisibleImageViewer(true);
      setSrc(image.src);
    }
  }

  useEffect(() => {
    if (chat?.body?.chatMessages && chat.body.chatMessages.length >= 0) {
      setChatMessagesReversed([...chat.body.chatMessages].reverse());
    }

    if (chat?.body?.images && chat.body.images.length >= 0) {
      setSrcs([...chat.body.images].map((image) => image?.src || defaultImage));
    }

    if (chat?.footer?.lastTimeTyped && chat.footer.lastTimeTyped instanceof Date) {
      setLastTimeTyped(chat.footer.lastTimeTyped);
    }
  }, [chat]);

  useEffect(() => {
    if (!isLoadingChatMessages && chatMessagesReversed.length !== chatMessagesReversedOld.length) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }

    setIsLoadingChatMessages(false);

    setChatMessagesReversedOld(chatMessagesReversed);
  }, [chatMessagesReversed]);

  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, 200);
    }
  }, [isMinimized]);

  useEffect(() => {
    if (lastTimeTyped instanceof Date && new Date().getTime() - lastTimeTyped.getTime() <= 5000) {
      setIsTyping(true);

      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    }
  }, [lastTimeTyped]);

  return (
    <AnimatePresence>
      {isVisibleChat && (
        <div className={styles.chat} tabIndex={0}>
          <motion.div animate={isMinimized ? "minimized" : "maximized"} className={styles.content} exit={{ height: 0, opacity: 0 }} initial={{ height: 0, opacity: 0 }} transition={{ duration: 0.1 }} variants={variants}>
            {generateHeader()}
            {generateBody()}
            {generateUploadedImages()}
            {generateFooter()}
          </motion.div>
          <ImageViewer isVisible={isVisibleImageViewer} setIsVisible={setIsVisibleImageViewer} src={src} srcs={isImageViewerShowingSrcs ? srcs : undefined} />
        </div>
      )}
    </AnimatePresence>
  );
}
