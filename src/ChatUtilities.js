import { transform } from "@macroing/transformer.js";

export const DEFAULT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEYklEQVR4nLzW/zfVdxwH8HvbnWGi4VwRuXR0HaXVxtBs15TaZCvGfEu+ZkozVrIb6tLOGrMwi6Gj1KyLOWRNEs6VI1nzpcIyhn05yZfGWs1dpe353P/Qxw+P973uvXye78/r9Xpfyd6r74hEovURQLQ8RAEbn+mEqSGfQdmHBnBvyrswzH0E5vupYY3qZ9jxTTFMc5iFL+Tz9336PvDWxmBoOLkGLhI94R9xu10GllW+1fDMOV61h/NP8Ni/U/DRt7lQG7gH6jikQLW0DfZWzMD2vk1w3MgYPmv/Mj+ljIEVlW9C6fZlQiSQzMT8g6W5mjn8y/VhcaIL3LN6Dg4F1sATPzwNB7LyYIldIlx90B3endOBQYnfw9hjt+GCxgreTi+DE+evCpLghpS7VjgfDxsnI2HRpYdwpcURGGbmB62yWEv1u3uhr6MSStX34fjURigPZkWlmyfAO+uXwM6z62BtRLwgCcRL/8BiOH2HT078CU2DWA85nnfhdDzr4Zdo7r5zPuvqjRQmO+eSzQThrChlgzkTGN+EZY7zULHoOb5HYytIgqQmXm9oVzSsHr4IZ9YZQUuXcDib/AAm666F4enc/czsJmg72Q5fNOW+t6yYhrr9Q9DILhB6R++G1o0ZQiQQO7zEK1JsiOWzKSdQlSTmQ7kJNDs9ALfaHIWqo3rwNRN2b2QrO8ZiZhUsSGuB6hu8B5KhbbA2lZ9dlnZZkASHFLwKqW4PPJnH7t1c+yn02hYAZ5fcgj5x//et5duwvb0C5kbx/ccDX2FiBWfXhte1MEzGnlju9Rf0bosSJMGppEwsKyp/hAMLBXCi9RPYYWEDvz78Ox/XsaL6z+rCAqOdsHTEAxbLOS8nldthTx675ErqPThazJ43kZYJkUByfZY1YN3LmVN1gNeil+MLW5I4Z2zmNXBTAytEtZhnw8UsTt+q98fgA/kC3OXBVzVbPoIZ4SXwLX/2gVYpTCeXmn2OJdZaBcut2Qd2FRf4eOpjmKp6CtbpcdqkdflD/aFmGGFQyHzq/XDwHju8x2UfzPbjBM1bylP6kJEgZ7Kk24PVcjNhF5Q6yqDYile6Zl8cnO8+D3tD2BPmpobwSMtpprF1gM4Kdkzmr1tgm5oVlW/L2fWognNBL6FbkARDodew3O9g7/UPcMpffj4ITrhVQdOSA1Aj56tbNa9CL8s6aKJl/ThNszPCHh+HJxNOwSjjxXBHK/90TFOcEAnEC82sVueGQdg1Psz/n8sddBpdCT0nWe+Fww2wo4f1pqPkdyQ373T4t30OlKuz4Jf5vAcurmkw+YIXfDjnIUiCIn8JFtlvH0AfmRzWOh2GVw6yTgbHWPXfTfAMuDTC7woj1zQwUo/z6oud7IYZd96PtW6uTKbPDgi1Z0+4eoqESCAJkHGmJ6h4JneWcK93vDcKN5eegX31ldD8OiduTRH7XKt8DOsD+L1hbD/vn24iE5QbsD/6o3hXgiN5zs9+lS1Egv8CAAD//1W2eYamjudSAAAAAElFTkSuQmCC";

export function computeDateTimeTextDefault(chatMessage) {
  if (chatMessage?.createdAt && chatMessage.createdAt instanceof Date) {
    const date = chatMessage.createdAt;

    const today = new Date();

    const comparisonDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    const difference = today.getTime() - comparisonDate.getTime();

    const secondsAgo = Math.max(Math.floor(difference / 1000), 0);
    const minutesAgo = Math.max(Math.floor(secondsAgo / 60), 0);
    const hoursAgo = Math.max(Math.floor(minutesAgo / 60), 0);
    const daysAgo = Math.max(Math.floor(hoursAgo / 24), 0);
    const monthsAgo = Math.max(Math.floor(daysAgo / 30), 0);
    const yearsAgo = Math.max(Math.floor(monthsAgo / 12), 0);

    if (daysAgo <= 0) {
      if (hoursAgo > 0) {
        return hoursAgo + " hour";
      } else if (minutesAgo > 0) {
        return minutesAgo + " min";
      } else {
        return secondsAgo + " sec";
      }
    } else if (yearsAgo > 0) {
      return yearsAgo + " year";
    } else if (monthsAgo > 0) {
      return monthsAgo + " mon";
    } else {
      return daysAgo + " day";
    }
  } else {
    return "";
  }
}

export function computeDateTimeTextTooltipDefault(chatMessage, chatConfiguration = createChatConfiguration()) {
  return chatMessage?.createdAt?.toLocaleString(chatConfiguration?.locales || "en-US") || "";
}

export function createBody(chatMessages = [], images = [], loadChatMessagesText = "Load more...", page = 1, pages = 2) {
  return { chatMessages, images, loadChatMessagesText, page, pages };
}

export function createChat(body = createBody(), currentUser = createUserJohnDoe(), footer = createFooter(), header = createHeader(), key = null, uploadedImages = [], metadata = {}) {
  return { body, currentUser, footer, header, key, uploadedImages, ...metadata };
}

export function createChatConfiguration(locales = "en-US", wordAnd = "and", wordLike = "like", wordUnread = "unread", wordUser = "user") {
  return { locales, words: { and: wordAnd, like: wordLike, unread: wordUnread, user: wordUser } };
}

export function createChatDefault() {
  return createChat(createBody(), createUserJohnDoe(), createFooter(), createHeader(), null, [], { _id: 1 });
}

export function createChatHandler(computeDateTimeText = computeDateTimeTextDefault, computeDateTimeTextTooltip = computeDateTimeTextTooltipDefault, isSameUser = isSameUserDefault, onChatClose = onChatCloseDefault, onDeleteUploadedImage = onDeleteUploadedImageDefault, onFilterText = onFilterTextDefault, onLike = onLikeDefault, onLoadChatMessages = onLoadChatMessagesDefault, onSendChatMessage = onSendChatMessageDefault, onType = onTypeDefault, onUploadImage = onUploadImageDefault) {
  return { computeDateTimeText, computeDateTimeTextTooltip, isSameUser, onChatClose, onDeleteUploadedImage, onFilterText, onLike, onLoadChatMessages, onSendChatMessage, onType, onUploadImage };
}

export function createFooter(lastTimeTyped = new Date()) {
  return { lastTimeTyped };
}

export function createHeader(image = createImage(), isLoggedIn = true, title = createHeaderTitle()) {
  return { image, isLoggedIn, title };
}

export function createHeaderTitle(href = "/", text = "John Doe") {
  return { href, text };
}

export function createImage(alt = "", key = null, src = DEFAULT_IMAGE) {
  return { alt, key, src };
}

export function createLike(key = null, kind = "thumbs-up", user = createUserJohnDoe()) {
  return { key, kind, user };
}

export function createMessage(createdAt = new Date(), images = [], isUnread = false, key = null, likes = [], text = "Hello, World!", user = createUserJohnDoe(), metadata = {}) {
  return { createdAt, images, isUnread, key, likes, text, user, ...metadata };
}

export function createUser(image = DEFAULT_IMAGE, isLoggedIn = true, isSelf = true, isSelfImageVisible = false, name = "John Doe", metadata = {}) {
  return { image, isLoggedIn, isSelf, isSelfImageVisible, name, ...metadata };
}

export function createUserJaneDoe() {
  return createUser(DEFAULT_IMAGE, true, false, false, "Jane Doe", { _id: 2 });
}

export function createUserJohnDoe() {
  return createUser(DEFAULT_IMAGE, true, true, true, "John Doe", { _id: 1 });
}

export function isSameUserDefault(userA, userB) {
  return userA?._id === userB?._id;
}

export function onChatCloseDefault(chat, chats, setChats) {
  setChats(transformOnChatClose(chats, (currentChat) => currentChat._id === chat._id));
}

export function onDeleteUploadedImageDefault(chat, uploadedImage, chats, setChats) {
  setChats(transformOnDeleteUploadedImage(chats, (currentChat) => currentChat._id === chat._id, uploadedImage));
}

export function onFilterTextDefault(text) {
  return text;
}

export function onLikeDefault(chat, chatMessage, kind, chats, setChats) {
  setChats(
    transformOnLike(
      chats,
      (currentChat) => currentChat._id === chat._id,
      (currentChatMessage) => currentChatMessage._id === chatMessage._id,
      (user) => user._id === 1,
      () => createUserJohnDoe(),
      kind
    )
  );
}

export function onLoadChatMessagesDefault(chat, chats, setChats) {
  setChats(
    transformOnLoadChatMessages(
      chats,
      (currentChat) => currentChat._id === chat._id,
      (currentChat) => [createMessage(new Date(), currentChat?.uploadedImages?.length > 0 ? [...currentChat?.uploadedImages] : [], true, null, [], "Hello, World!", createUserJohnDoe(), { _id: currentChat.body.chatMessages.length + 1 })]
    )
  );
}

export function onSendChatMessageDefault(chat, text, chats, setChats) {
  setChats(
    transformOnSendChatMessage(
      chats,
      (currentChat) => currentChat._id === chat._id,
      (currentChat) => createMessage(new Date(), currentChat?.uploadedImages?.length > 0 ? [...currentChat?.uploadedImages] : [], true, null, [], text, { ...currentChat.currentUser }, { _id: currentChat.body.chatMessages.length + 1 })
    )
  );
}

export function onTypeDefault(chat, chats, setChats) {
  setChats(transformOnType(chats, (currentChat) => currentChat._id === chat._id));
}

export function onUploadImageDefault(chat, file, chats, setChats) {
  setChats(transformOnUploadImage(chats, (currentChat) => currentChat._id === chat._id, createImage("John Doe", chat?.uploadedImages?.length ? chat.uploadedImages.length + 1 : 1, DEFAULT_IMAGE)));
}

export function transformOnChatClose(chats, chatPredicate) {
  return transform(chats, ({ parents, transformArray, value }) => {
    if (parents.length === 0 && Array.isArray(value)) {
      return transformArray(value, (element) => !chatPredicate(element));
    } else {
      return value;
    }
  });
}

export function transformOnDeleteUploadedImage(chats, chatPredicate, uploadedImage) {
  return transform(chats, ({ equals, parents, transformArray, value, valueKey }) => {
    if (parents.length > 1 && chatPredicate(parents[1]) && valueKey === "uploadedImages" && Array.isArray(value)) {
      return transformArray(value, (element) => !equals(element, uploadedImage));
    } else {
      return value;
    }
  });
}

export function transformOnLike(chats, chatPredicate, chatMessagePredicate, userPredicate, userFactory, kind) {
  return transform(chats, ({ parentKey, parents, transformArray, transformObject, value, valueIndex, valueKey }) => {
    if (parents.length > 4 && chatPredicate(parents[1]) && chatMessagePredicate(parents[4])) {
      if (valueKey === "likes" && Array.isArray(value)) {
        return transformArray(
          value,
          (element) => !userPredicate(element.user),
          (array, arrayFiltered) => (arrayFiltered.length === 0 || (arrayFiltered.length === 1 && arrayFiltered[0].kind !== kind)) && array.push(createLike(null, kind, userFactory()))
        );
      } else if (parentKey === "chatMessages" && valueIndex !== null && typeof value === "object" && value.id === 1 && (!value.likes || value.likes.length === 0)) {
        return transformObject(value, null, (object) => (object.likes = [createLike(null, kind, userFactory())]));
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
}

export function transformOnLoadChatMessages(chats, chatPredicate, chatMessageFactory) {
  return transform(chats, ({ parents, transformArray, value, valueKey }) => {
    if (parents.length > 1 && chatPredicate(parents[1])) {
      if (valueKey === "chatMessages" && Array.isArray(value)) {
        return transformArray(value, null, (array) => array.push(...chatMessageFactory(parents[1])));
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
}

export function transformOnSendChatMessage(chats, chatPredicate, chatMessageFactory) {
  return transform(chats, ({ parents, transformArray, value, valueKey }) => {
    if (parents.length > 1 && chatPredicate(parents[1])) {
      if (valueKey === "chatMessages" && Array.isArray(value)) {
        return transformArray(value, null, (array) => array.unshift(chatMessageFactory(parents[1])));
      } else if (valueKey === "uploadedImages" && Array.isArray(value)) {
        return [];
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
}

export function transformOnUploadImage(chats, chatPredicate, uploadedImage) {
  return transform(chats, ({ parents, transformArray, value, valueKey }) => {
    if (parents.length > 1 && chatPredicate(parents[1]) && valueKey === "uploadedImages" && Array.isArray(value)) {
      return transformArray(value, null, (array) => array.push(uploadedImage));
    } else {
      return value;
    }
  });
}

export function transformOnType(chats, chatPredicate) {
  return transform(chats, ({ parents, value, valueKey }) => {
    if (parents.length > 1 && chatPredicate(parents[1])) {
      if (valueKey === "lastTimeTyped") {
        return new Date();
      } else {
        return value;
      }
    } else {
      return value;
    }
  });
}

export default { DEFAULT_IMAGE, computeDateTimeTextDefault, computeDateTimeTextTooltipDefault, createBody, createChat, createChatConfiguration, createChatDefault, createChatHandler, createFooter, createHeader, createHeaderTitle, createImage, createLike, createMessage, createUser, createUserJaneDoe, createUserJohnDoe, isSameUserDefault, onChatCloseDefault, onDeleteUploadedImageDefault, onFilterTextDefault, onLikeDefault, onLoadChatMessagesDefault, onSendChatMessageDefault, onTypeDefault, onUploadImageDefault, transformOnChatClose, transformOnDeleteUploadedImage, transformOnLike, transformOnLoadChatMessages, transformOnSendChatMessage, transformOnUploadImage, transformOnType };
