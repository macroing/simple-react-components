"use client";

import { useRef, useState } from "react";

import importedStyles from "./TabPane.module.css";

export default function TabPane(props) {
  let { children, styles, tabIndex, tabs, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  //If no tabs property has been assigned, an empty array will be used.
  if (tabs === null || tabs === undefined) {
    tabs = [];
  }

  const tabPaneMobileMenuBarIconRef = useRef();
  const tabPaneMobileMenuContentRef = useRef();

  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex || 0);
  const [isTabVisible, setIsTabVisible] = useState(new Array(tabs.length).fill(true));

  function onClickTabClose(e, tabIndexToClose) {
    e.stopPropagation();

    const newIsTabVisible = [...isTabVisible];

    newIsTabVisible[tabIndexToClose] = false;

    setIsTabVisible(newIsTabVisible);

    if (currentTabIndex === tabIndexToClose) {
      let newCurrentTabIndex = -1;

      for (let i = tabIndexToClose - 1; i >= 0; i--) {
        if (isTabVisible[i]) {
          newCurrentTabIndex = i;

          break;
        }
      }

      if (newCurrentTabIndex === -1) {
        for (let i = tabs.length - 1; i > tabIndexToClose; i--) {
          if (isTabVisible[i]) {
            newCurrentTabIndex = i;

            break;
          }
        }
      }

      setCurrentTabIndex(newCurrentTabIndex);
    }
  }

  function onTabPaneMobileMenuToggle() {
    tabPaneMobileMenuBarIconRef.current.classList.toggle(styles.icon_close);
    tabPaneMobileMenuContentRef.current.classList.toggle(styles.content_visible);
  }

  function renderContent() {
    return <div className={styles.tab}>{children(currentTabIndex, tabs[currentTabIndex])}</div>;
  }

  function renderMenu() {
    return (
      <div className={styles.menu}>
        {tabs.map((tab, tabIndex) =>
          isTabVisible[tabIndex] ? (
            <button className={styles.button + (currentTabIndex === tabIndex ? " " + styles.active : "")} key={"tab-" + tabIndex} onClick={() => setCurrentTabIndex(tabIndex)}>
              {tab}
              <div className={styles.close} onClick={(e) => onClickTabClose(e, tabIndex)}>
                <span aria-hidden className="fa fa-close"></span>
              </div>
            </button>
          ) : null
        )}
      </div>
    );
  }

  function renderMobileMenu() {
    return (
      <div className={styles.mobile_menu}>
        <div className={styles.bar}>
          <div className={styles.text}>{tabs[currentTabIndex]}</div>
          {tabs.length > 1 && (
            <div className={styles.icon} onClick={onTabPaneMobileMenuToggle} ref={tabPaneMobileMenuBarIconRef}>
              <div className={styles.middle}></div>
            </div>
          )}
        </div>
        <div className={styles.content} onClick={onTabPaneMobileMenuToggle} ref={tabPaneMobileMenuContentRef}>
          {tabs.map((tab, tabIndex) => (
            <button className={styles.button + (currentTabIndex === tabIndex ? " " + styles.active : "")} key={"tab-" + tabIndex} onClick={() => setCurrentTabIndex(tabIndex)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tab_pane} {...rest}>
      {renderMobileMenu()}
      {renderMenu()}
      {renderContent()}
    </div>
  );
}
