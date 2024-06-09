import Button from "../button/Button";

import importedStyles from "./Dialog.module.css";

export default function Dialog(props) {
  const buttonFactoryCancel = props.buttonFactoryCancel || defaultButtonFactoryCancel;
  const buttonFactoryOK = props.buttonFactoryOK || defaultButtonFactoryOK;
  const children = props.children;
  const isVisible = props.isVisible;
  const onClickCancel = props.onClickCancel;
  const onClickOK = props.onClickOK;
  const setIsVisible = props.setIsVisible;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const textCancel = props.textCancel || "Cancel";
  const textOK = props.textOK || "OK";
  const title = props.title || "";

  function defaultButtonFactoryCancel(onClick, children) {
    return <Button onClick={onClick}>{children}</Button>;
  }

  function defaultButtonFactoryOK(onClick, children) {
    return (
      <Button onClick={onClick} theme="primary">
        {children}
      </Button>
    );
  }

  function doOnClickCancel(e) {
    if (onClickCancel) {
      onClickCancel(e);
    }

    setIsVisible(false);
  }

  function doOnClickOK(e) {
    if (onClickOK) {
      onClickOK(e);
    }

    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.dialog_container}>
      <div className={styles.dialog} style={style}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.buttons}>
          {buttonFactoryCancel(doOnClickCancel, textCancel)}
          {buttonFactoryOK(doOnClickOK, textOK)}
        </div>
      </div>
    </div>
  );
}
