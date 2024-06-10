"use client";

import { useState } from "react";

import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

import importedStyles from "./OptionList.module.css";

export default function OptionList(props) {
  const isAllowedToViewEmpty = props.isAllowedToViewEmpty;
  const isAllowedToViewPrivate = props.isAllowedToViewPrivate;
  const isEditable = props.isEditable;
  const isPrivate = props.isPrivate;
  const onClickCancel = props.onClickCancel;
  const onClickSave = props.onClickSave;
  const options = props.options;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const textCancel = props.textCancel || "Cancel";
  const textEdit = props.textEdit || "Edit";
  const textSave = props.textSave || "Save";
  const title = props.title;

  const [isEditing, setIsEditing] = useState(false);

  function doOnClickCancel(e) {
    if (onClickCancel) {
      onClickCancel(e);
    }

    setIsEditing(false);
  }

  function doOnClickSave(e) {
    if (onClickSave) {
      onClickSave(e);
    }

    setIsEditing(false);
  }

  function renderOption(option, optionIndex) {
    if (!isEditing && !isAllowedToViewEmpty && (option.value == 0 || option.value == "")) {
      return null;
    }

    return (
      <div className={styles.option} key={"option-" + optionIndex}>
        <span className={styles.name}>{option.name}:</span>
        {!isEditing && (
          <span className={styles.value}>
            {option.value}
            {option.postfix ? " " + option.postfix : ""}
          </span>
        )}
        {isEditing && option.element === "input" && <Input max={option.max} min={option.min} onChange={(e) => option.setValue(e.target.value)} style={{ width: "100%" }} type={option.type} value={option.value} />}
        {isEditing && option.element === "select" && (
          <Select onChange={(e) => option.setValue(e.target.value)} style={{ width: "100%" }} value={option.value}>
            {option.options.map((o, oIndex) => (
              <option key={"option-" + oIndex} value={o}>
                {o}
              </option>
            ))}
          </Select>
        )}
      </div>
    );
  }

  if (isPrivate && !isAllowedToViewPrivate) {
    return null;
  }

  if (!isEditing && !isAllowedToViewEmpty) {
    const filteredOptions = options.filter((option) => option.value != 0 && option.value != "");

    if (filteredOptions.length === 0) {
      return null;
    }
  }

  return (
    <div className={styles.option_list} style={style}>
      {title && (
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
      )}
      <div className={styles.options}>{options.map((option, optionIndex) => renderOption(option, optionIndex))}</div>
      <div className={styles.buttons}>
        {!isEditing && isEditable && (
          <Button onClick={(e) => setIsEditing(true)} theme="primary">
            <span aria-hidden className="fa fa-edit"></span> {textEdit}
          </Button>
        )}
        {isEditing && (
          <>
            <Button onClick={doOnClickCancel}>
              <span aria-hidden className="fa fa-times"></span> {textCancel}
            </Button>
            <Button onClick={doOnClickSave} theme="primary">
              <span aria-hidden className="fa fa-save"></span> {textSave}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
