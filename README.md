@macroing/simple-react-components
=================================
`@macroing/simple-react-components` is a simple React components library.

Getting Started
---------------
To clone this repository, you can type the following in Git Bash.

```bash
git clone https://github.com/macroing/simple-react-components.git
```

To add this library to your project, you can type the following in Git Bash.

```bash
npm install @macroing/simple-react-components
```

Examples
--------
Below follows a few examples that demonstrates various features in `@macroing/simple-react-components`.

#### MenuBar Example
The following example demonstrates how you can create your own implementation of the `MenuBar` component.
```jsx
import Link from "next/link";
import { useEffect, useState } from "react";

import { MenuBar } from "@macroing/simple-react-components";

export default function CustomMenuBar(props) {
  const [items, setItems] = useState([]);
  const [logo, setLogo] = useState({ alt: "Logo", href: "/", src: "/logo.png" });

  function linkFactory(href, onClick, children) {
    return (
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  useEffect(() => {
    setItems([
      {
        badge: null,
        columns: 1,
        href: "/",
        icon: "fa fa-home",
        id: 0,
        items: [],
        text: "Home",
      },
      {
        badge: "2",
        columns: 1,
        href: null,
        icon: "fa fa-user",
        id: 1,
        items: [
          {
            items: [
              {
                badge: null,
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
                badge: null,
                href: "/settings",
                icon: "fa fa-cog",
                text: "Settings",
              },
              {
                badge: null,
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
        badge: null,
        columns: 1,
        component: <div style={{ whiteSpace: "nowrap" }}>Your shopping cart is empty.</div>,
        href: null,
        icon: "fa fa-shopping-cart",
        id: 2,
        items: null,
        text: "Shopping Cart",
      },
      {
        badge: null,
        columns: 1,
        href: "/admin",
        icon: "fa fa-dashboard",
        id: 3,
        items: [],
        text: "Admin",
      },
    ]);
  }, []);

  return <MenuBar columns={1} items={items} linkFactory={linkFactory} logo={logo} />;
}
```

Note
----
This library has not reached version 1.0.0 and been released to the public yet. Therefore, you can expect that backward incompatible changes are likely to occur between commits. When this library reaches version 1.0.0, it will be tagged and available on the "releases" page. At that point, backward incompatible changes should only occur when a new major release is made.