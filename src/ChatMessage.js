"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Icon from "./Icon";
import IconButton from "./IconButton";
import TooltipContainer from "./TooltipContainer";

import { DEFAULT_IMAGE, computeDateTimeTextDefault, computeDateTimeTextTooltipDefault } from "./ChatUtilities";

import importedStyles from "./ChatMessage.module.css";

export default function ChatMessage(props) {
  const chat = props.chat;
  const chatConfiguration = props.chatConfiguration;
  const chatHandler = props.chatHandler;
  const chatMessage = props.chatMessage;
  const chats = props.chats;
  const defaultImage = props.defaultImage || DEFAULT_IMAGE;
  const setChats = props.setChats;
  const styles = props.styles || importedStyles;
  const viewImage = props.viewImage;

  const intervalRef = useRef();
  const timerRef = useRef();

  const [dateTimeText, setDateTimeText] = useState(computeDateTimeText());
  const [dateTimeTextTooltip, setDateTimeTextTooltip] = useState(computeDateTimeTextTooltip());
  const [hasLiked, setHasLiked] = useState(false);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesAngry, setLikesAngry] = useState([]);
  const [likesHeart, setLikesHeart] = useState([]);
  const [likesLaugh, setLikesLaugh] = useState([]);
  const [likesThumbsUp, setLikesThumbsUp] = useState([]);
  const [nameList, setNameList] = useState("");

  function computeDateTimeText() {
    return chatHandler?.computeDateTimeText ? chatHandler.computeDateTimeText(chatMessage) : computeDateTimeTextDefault(chatMessage);
  }

  function computeDateTimeTextTooltip() {
    return chatHandler?.computeDateTimeTextTooltip ? chatHandler.computeDateTimeTextTooltip(chatMessage, chatConfiguration) : computeDateTimeTextTooltipDefault(chatMessage, chatConfiguration);
  }

  function equals(a, b, configuration = { isOrderIgnoredForMap: true, isOrderIgnoredForObject: true }) {
    if (typeof a !== "object" && typeof b !== "object") {
      return Object.is(a, b);
    } else if (a === null && b === null) {
      return true;
    } else if (a === null || b === null || typeof a !== typeof b) {
      return false;
    } else if (a === b) {
      return true;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (!equals(a[i], b[i], configuration)) {
            return false;
          }
        }

        return true;
      }
    } else if (Array.isArray(a) || Array.isArray(b)) {
      return false;
    } else if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    } else if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    } else if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      } else {
        const aKeyValues = [];
        const bKeyValues = [];

        for (const [k, v] of a) {
          if (!b.has(k)) {
            return false;
          } else {
            aKeyValues.push([k, v]);
          }
        }

        for (const [k, v] of b) {
          if (!a.has(k)) {
            return false;
          } else {
            bKeyValues.push([k, v]);
          }
        }

        for (let i = 0; i < aKeyValues.length; i++) {
          if (!configuration || configuration.isOrderIgnoredForMap) {
            let hasFoundKeyValuePair = false;

            for (let j = 0; j < bKeyValues.length; j++) {
              if (equals(aKeyValues[i][0], bKeyValues[j][0], configuration)) {
                if (!equals(aKeyValues[i][1], bKeyValues[j][1], configuration)) {
                  return false;
                } else {
                  hasFoundKeyValuePair = true;
                }
              }
            }

            if (!hasFoundKeyValuePair) {
              return false;
            }
          } else if (!equals(aKeyValues[i][0], bKeyValues[i][0], configuration) || !equals(aKeyValues[i][1], bKeyValues[i][1], configuration)) {
            return false;
          }
        }

        return true;
      }
    } else if (!configuration || configuration.isOrderIgnoredForObject) {
      for (const [k, v] of Object.entries(a)) {
        if (!(k in b)) {
          return false;
        } else if (!equals(v, b[k], configuration)) {
          return false;
        }
      }

      return true;
    } else {
      const aKeyValues = [];
      const bKeyValues = [];

      for (const [k, v] of Object.entries(a)) {
        if (!(k in b)) {
          return false;
        } else {
          aKeyValues.push([k, v]);
        }
      }

      for (const [k, v] of Object.entries(b)) {
        if (!(k in a)) {
          return false;
        } else {
          bKeyValues.push([k, v]);
        }
      }

      for (let i = 0; i < aKeyValues.length; i++) {
        if (!equals(aKeyValues[i][0], bKeyValues[i][0], configuration) || !equals(aKeyValues[i][1], bKeyValues[i][1], configuration)) {
          return false;
        }
      }
    }
  }

  function generateName(name, isWordUserFirstLetterUpperCase = false) {
    if (typeof name === "string") {
      return name;
    } else if (isWordUserFirstLetterUpperCase) {
      return toUpperCaseFirstLetter(getWordUser());
    } else {
      return toLowerCase(getWordUser());
    }
  }

  function generateNameList(names) {
    if (Array.isArray(names)) {
      const wordAnd = toLowerCase(getWordAnd());

      let nameList = "";

      for (let i = 0; i < names.length; i++) {
        if (i === 0) {
          nameList += generateName(names[i], true);
        } else if (i > 0 && i + 1 < names.length) {
          nameList += ", ";
          nameList += generateName(names[i]);
        } else {
          nameList += " ";
          nameList += wordAnd;
          nameList += " ";
          nameList += generateName(names[i]);
        }
      }

      return nameList;
    } else if (typeof names === "string") {
      return generateName(names);
    } else {
      return generateName(names, true);
    }
  }

  function getLocales() {
    return chatConfiguration?.locales || "en-US";
  }

  function getWordAnd() {
    return chatConfiguration?.words?.and || "and";
  }

  function getWordLike() {
    return chatConfiguration?.words?.like || "like";
  }

  function getWordUnread() {
    return chatConfiguration?.words?.unread || "unread";
  }

  function getWordUser() {
    return chatConfiguration?.words?.user || "user";
  }

  function isSameUser(userA, userB) {
    return chatHandler?.isSameUser ? chatHandler.isSameUser(userA, userB) : equals(userA, userB);
  }

  function onClickLikeIconButton(kind) {
    if (chatHandler?.onLike) {
      chatHandler.onLike(chat, chatMessage, kind, chats, setChats);
    }

    setIsShowingPopup(false);
  }

  function onClickLikeButton(e) {
    if (chatHandler?.onLike) {
      chatHandler.onLike(chat, chatMessage, "thumbs-up", chats, setChats);
    }

    clearTimeout(timerRef.current);

    setIsShowingPopup(false);
  }

  function onClickViewImage(image) {
    if (viewImage) {
      viewImage(image, true);
    }
  }

  function onMouseEnterLikeButton(e) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsShowingPopup(true);
    }, 1000);
  }

  function onMouseEnterPopup(e) {
    clearTimeout(timerRef.current);

    setIsShowingPopup(true);
  }

  function onMouseLeaveLikeButton(e) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsShowingPopup(false);
    }, 1000);
  }

  function onMouseLeavePopup(e) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsShowingPopup(false);
    }, 1000);
  }

  function renderLikeText() {
    if (nameList) {
      return <div className={styles.text}>{nameList}</div>;
    } else {
      return null;
    }
  }

  function renderLikes(likes) {
    return likes?.length ? (
      <TooltipContainer tooltip={renderLikesTooltip(likes)}>
        <Icon className={"fa fa-" + likes[0].kind} />
      </TooltipContainer>
    ) : null;
  }

  function renderLikesTooltip(likes) {
    return likes.filter((like) => like?.user).map((like, likeIndex) => <div key={like?.key || "like-" + like.kind + "-" + likeIndex}>{like?.user?.name || ""}</div>);
  }

  function renderUnread() {
    return (
      chatMessage?.isUnread && (
        <div className={styles.unread}>
          <div className={styles.separator}></div>
          <div className={styles.text}>{toUpperCaseFirstLetter(getWordUnread())}</div>
          <div className={styles.separator}></div>
        </div>
      )
    );
  }

  function toLowerCase(value) {
    if (typeof value === "string") {
      return value.toLocaleLowerCase(getLocales());
    } else {
      return String(value).toLocaleLowerCase(getLocales());
    }
  }

  function toUpperCaseFirstLetter(value) {
    if (typeof value === "string") {
      return value.charAt(0).toLocaleUpperCase(getLocales()) + value.slice(1);
    } else {
      return String(value).charAt(0).toLocaleUpperCase(getLocales()) + String(value).slice(1);
    }
  }

  function updateHasLiked() {
    if (likes.length && chatMessage?.user) {
      let hasLiked = false;

      for (let i = 0; i < likes.length; i++) {
        if (likes[i]?.user && isSameUser(likes[i].user, chatMessage.user)) {
          hasLiked = true;

          break;
        }
      }

      setHasLiked(hasLiked);
    } else {
      setHasLiked(false);
    }
  }

  function renderBubble() {
    return (
      <div className={styles.bubble + (chatMessage?.user?.isSelf ? " " + styles.bubble_self : "")}>
        {chatMessage?.text?.split(/\n+/).map((paragraph, paragraphIndex) => (
          <p key={"paragraph-" + paragraphIndex}>{paragraph}</p>
        ))}
        {chatMessage?.images && chatMessage?.images?.length > 0 && (
          <div className={styles.images}>
            {chatMessage.images.map((image, imageIndex) => (
              <motion.div className={styles.image} key={image?.key || "image-" + imageIndex} onClick={() => onClickViewImage(image?.src ? image : { alt: "", src: defaultImage })} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
                <img alt={image?.alt || ""} src={image?.src || defaultImage} />
              </motion.div>
            ))}
          </div>
        )}
        {chatMessage?.likes && chatMessage?.likes?.length > 0 && (
          <div className={styles.likes}>
            <div className={styles.icons}>
              {renderLikes(likesThumbsUp)}
              {renderLikes(likesHeart)}
              {renderLikes(likesLaugh)}
              {renderLikes(likesAngry)}
              {renderLikeText()}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderFooter() {
    return (
      <div className={styles.footer}>
        <div className={styles.date_time}>
          <TooltipContainer tooltip={dateTimeTextTooltip}>{dateTimeText}</TooltipContainer>
        </div>
        <div className={styles.buttons}>
          <button className={hasLiked ? styles.active : undefined} onClick={onClickLikeButton} onMouseEnter={onMouseEnterLikeButton} onMouseLeave={onMouseLeaveLikeButton}>
            <span aria-hidden className="fa fa-thumbs-up"></span> {toUpperCaseFirstLetter(getWordLike())}
          </button>
        </div>
        {isShowingPopup && (
          <div className={styles.popup + (chatMessage?.user?.isSelf ? " " + styles.popup_self : "")} onMouseEnter={onMouseEnterPopup} onMouseLeave={onMouseLeavePopup}>
            <IconButton className="fa fa-thumbs-up" isLarge={true} onClick={() => onClickLikeIconButton("thumbs-up")} />
            <IconButton className="fa fa-heart" isLarge={true} onClick={() => onClickLikeIconButton("heart")} />
            <IconButton className="fa fa-laugh" isLarge={true} onClick={() => onClickLikeIconButton("laugh")} />
            <IconButton className="fa fa-angry" isLarge={true} onClick={() => onClickLikeIconButton("angry")} />
          </div>
        )}
      </div>
    );
  }

  function renderImage() {
    return (
      !chatMessage?.user?.isSelf && (
        <div className={styles.image}>
          <img alt={chatMessage?.user?.name || ""} src={chatMessage?.user?.image || defaultImage} />
          {chatMessage?.user && chatMessage.user.isLoggedIn && <span aria-hidden className={"fa fa-circle " + styles.logged_in}></span>}
        </div>
      )
    );
  }

  function renderImageSelf() {
    return (
      chatMessage?.user?.isSelf &&
      chatMessage?.user?.isSelfImageVisible && (
        <div className={styles.image + " " + styles.image_self}>
          <img alt={chatMessage?.user?.name || ""} src={chatMessage?.user?.image || defaultImage} />
          {chatMessage?.user && chatMessage.user.isLoggedIn && <span aria-hidden className={"fa fa-circle " + styles.logged_in}></span>}
        </div>
      )
    );
  }

  function updateLikes() {
    if (chatMessage?.likes?.length) {
      setLikes(chatMessage.likes.filter((like) => like?.user && (like?.kind === "angry" || like?.kind === "heart" || like?.kind === "laugh" || like?.kind === "thumbs-up")));
      setLikesAngry(chatMessage.likes.filter((like) => like?.user && like?.kind === "angry"));
      setLikesHeart(chatMessage.likes.filter((like) => like?.user && like?.kind === "heart"));
      setLikesLaugh(chatMessage.likes.filter((like) => like?.user && like?.kind === "laugh"));
      setLikesThumbsUp(chatMessage.likes.filter((like) => like?.user && like?.kind === "thumbs-up"));
    } else {
      setLikes(likes.length === 0 ? likes : []);
      setLikesAngry(likesAngry.length === 0 ? likesAngry : []);
      setLikesHeart(likesHeart.length === 0 ? likesHeart : []);
      setLikesLaugh(likesLaugh.length === 0 ? likesLaugh : []);
      setLikesThumbsUp(likesThumbsUp.length === 0 ? likesThumbsUp : []);
    }
  }

  function updateNameList() {
    if (likes.length === 3) {
      setNameList(generateNameList([likes[0]?.user?.name, likes[1]?.user?.name, likes[2]?.user?.name]));
    } else if (likes.length === 2) {
      setNameList(generateNameList([likes[0]?.user?.name, likes[1]?.user?.name]));
    } else if (likes.length === 1) {
      setNameList(generateNameList([likes[0]?.user?.name]));
    } else if (likes.length === 0) {
      setNameList("");
    } else {
      setNameList(String(likes.length));
    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDateTimeText(computeDateTimeText());
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatMessage) {
      setDateTimeTextTooltip(computeDateTimeTextTooltip());

      updateLikes();
    }
  }, [chatMessage]);

  useEffect(() => {
    updateHasLiked();
    updateNameList();
  }, [likes]);

  return (
    <div className={styles.chat_message}>
      {renderUnread()}
      <div className={styles.content_container + (chatMessage?.user?.isSelf ? " " + styles.content_container_self : "")}>
        <div className={styles.content}>
          {renderImage()}
          <div className={styles.rows + (chatMessage?.user?.isSelf ? " " + styles.rows_self : "")}>
            {renderBubble()}
            {renderFooter()}
          </div>
          {renderImageSelf()}
        </div>
      </div>
    </div>
  );
}
