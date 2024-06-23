# `MenuBar`

The `MenuBar` component represents a menu bar. It uses either the `DesktopMenuBar` or the `MobileMenuBar` components when rendering. This depends on the window resolution.

The `MenuBar` component uses the following properties:

| Name                  | Description                                                                            | Optional |
| --------------------- | -------------------------------------------------------------------------------------- | -------- |
| `columns`             | The `columns` property describes how many columns the menus should have.               | Yes      |
| `items`               | The `items` property contains the items of the menu bar.                               | No       |
| `linkFactory`         | The `linkFactory` property is a function that returns a link.                          | Yes      |
| `logo`                | The `logo` property contains the logo of the menu bar.                                 | Yes      |
| `styleDesktopMenuBar` | The `styleDesktopMenuBar` property is used for styling the `DesktopMenuBar` component. | Yes      |
| `styleMobileMenuBar`  | The `styleMobileMenuBar` property is used for styling the `MobileMenuBar` component.   | Yes      |
| `theme`               | The `theme` property defines the theme to use. Either `"primary"` or `"secondary"`.    | Yes      |

## The `items` property

The `items` property consists of an array with objects. Each object contains the following properties:

| Name        | Description                                                                                                | Optional |
| ----------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| `badge`     | The `badge` property contains the badge to render for the current menu.                                    | Yes      |
| `columns`   | The `columns` property describes how many columns the current menu should have.                            | Yes      |
| `component` | The `component` property contains a component to render in the current menu.                               | Yes      |
| `href`      | The `href` property contains the URL for the current menu.                                                 | Yes      |
| `icon`      | The `icon` property contains the icon to be rendered for the current menu. For example Font Awesome icons. | Yes      |
| `id`        | The `id` property contains the unique ID for the current menu.                                             | No       |
| `items`     | The `items` property contains the items of the current menu.                                               | Yes      |
| `text`      | The `text` property contains the text to be rendered for the current menu.                                 | No       |

## The `items` property

The `items` property described in the table above consists of an array with objects. Each object contains the following properties:

| Name    | Description                                                      | Optional |
| ------- | ---------------------------------------------------------------- | -------- |
| `items` | The `items` property contains the items of the current sub-menu. | No       |

## The `items` property

The `items` property described in the table above consists of an array with objects. Each object contains the following properties:

| Name       | Description                                                                                                          | Optional |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| `badge`    | The `badge` property contains the badge to render for the current menu item.                                         | Yes      |
| `heading`  | The `heading` property defines whether the current menu item should be a heading or not.                             | Yes      |
| `href`     | The `href` property contains the URL for the current menu item link. Use this instead of `onClick` to render a link. | Yes      |
| `icon`     | The `icon` property contains the icon to be rendered for the current menu item. For example Font Awesome icons.      | Yes      |
| `indented` | The `indented` property defines whether the current menu item should be indented or not.                             | Yes      |
| `onClick`  | The `onClick` property contains an on-click function. Use this instead of `href` to render a button.                 | Yes      |
| `text`     | The `text` property contains the text to be rendered for the current menu item.                                      | No       |

## The `linkFactory` property

The `linkFactory` property is a function that looks like the following by default:

```jsx
function linkFactory(className, href, onClick, children) {
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
```

## The `logo` property

The `logo` property consists of an object. It has the following properties:

| Name   | Description                                                                                        | Optional |
| ------ | -------------------------------------------------------------------------------------------------- | -------- |
| `alt`  | The `alt` property contains the alternative text to be rendered if the image cannot be downloaded. | No       |
| `href` | The `href` property contains the URL of the logo.                                                  | No       |
| `src`  | The `src` property contains the source of the image.                                               | No       |

## Styling

The `DesktopMenuBar` component uses the following CSS variables:

- `--src-desktop-menu-bar-badge-background-color`
- `--src-desktop-menu-bar-badge-color`
- `--src-desktop-menu-bar-columns`
- `--src-desktop-menu-bar-primary-color-0`
- `--src-desktop-menu-bar-primary-color-1`
- `--src-desktop-menu-bar-primary-color-2`
- `--src-desktop-menu-bar-primary-color-3`
- `--src-desktop-menu-bar-secondary-color`

The `MobileMenuBar` component uses the following CSS variables:

- `--src-mobile-menu-bar-badge-background-color`
- `--src-mobile-menu-bar-badge-color`
- `--src-mobile-menu-bar-primary-color-0`
- `--src-mobile-menu-bar-primary-color-1`
- `--src-mobile-menu-bar-primary-color-2`
- `--src-mobile-menu-bar-primary-color-3`
- `--src-mobile-menu-bar-secondary-color`

## Example

The following example demonstrates how you can create your own implementation of the `MenuBar` component.

```jsx
import Link from "next/link";
import { useEffect, useState } from "react";

import { MenuBar } from "@macroing/simple-react-components";

export default function CustomMenuBar(props) {
  const [items, setItems] = useState([]);
  const [logo, setLogo] = useState({ alt: "Logo", href: "/", src: "/logo.png" });

  function linkFactory(className, href, onClick, children) {
    return (
      <Link className={className} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  useEffect(() => {
    setItems([
      {
        href: "/",
        icon: "fa fa-home",
        id: 0,
        text: "Home",
      },
      {
        badge: "2",
        icon: "fa fa-user",
        id: 1,
        items: [
          {
            items: [
              {
                href: "/profile",
                icon: "fa fa-user",
                text: "Profile",
              },
              {
                badge: "1",
                href: "/messages",
                icon: "fa fa-comment",
                text: "Messages",
              },
              {
                badge: "1",
                href: "/notifications",
                icon: "fa fa-bell",
                text: "Notifications",
              },
              {
                href: "/settings",
                icon: "fa fa-cog",
                text: "Settings",
              },
              {
                icon: "fa fa-sign-out",
                onClick: (e) => {},
                text: "Log out",
              },
            ],
          },
        ],
        text: "Account",
      },
      {
        component: <div style={{ whiteSpace: "nowrap" }}>Your shopping cart is empty.</div>,
        icon: "fa fa-shopping-cart",
        id: 2,
        text: "Shopping Cart",
      },
      {
        href: "/admin",
        icon: "fa fa-dashboard",
        id: 3,
        text: "Admin",
      },
    ]);
  }, []);

  return <MenuBar columns={1} items={items} linkFactory={linkFactory} logo={logo} />;
}
```
