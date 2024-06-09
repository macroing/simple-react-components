# `Dialog`

The `Dialog` component represents a dialog.

The `Dialog` component uses the following properties:

| Name                  | Description                                                                                      | Optional |
| --------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| `buttonFactoryCancel` | The `buttonFactoryCancel` property defines a function that returns a cancel button.              | Yes      |
| `buttonFactoryOK`     | The `buttonFactoryOK` property defines a function that returns an OK button.                     | Yes      |
| `children`            | The `children` property provides the children to render.                                         | No       |
| `isVisible`           | The `isVisible` property tells whether this `Dialog` component is visible or not.                | No       |
| `onClickCancel`       | The `onClickCancel` property defines a function to be called when clicking on the cancel button. | Yes      |
| `onClickOK`           | The `onClickOK` property defines a function to be called when clicking on the OK button.         | Yes      |
| `setIsVisible`        | The `setIsVisible` property is used to set the state of the `isVisible` property.                | No       |
| `style`               | The `style` property is used for styling.                                                        | Yes      |
| `styles`              | The `styles` property contains the class names for all elements.                                 | Yes      |
| `textCancel`          | The `textCancel` property contains the text for the cancel button.                               | Yes      |
| `textOK`              | The `textOK` property contains the text for the OK button.                                       | Yes      |
| `title`               | The `title` property contains the title for this `Dialog` component.                             | Yes      |

## The `buttonFactoryCancel` property

The `buttonFactoryCancel` property is a function that looks like the following by default:

```jsx
function buttonFactoryCancel(onClick, children) {
  return <Button onClick={onClick}>{children}</Button>;
}
```

## The `buttonFactoryOK` property

The `buttonFactoryOK` property is a function that looks like the following by default:

```jsx
function buttonFactoryOK(onClick, children) {
  return (
    <Button onClick={onClick} theme="primary">
      {children}
    </Button>
  );
}
```

## Styling

The `Dialog` component uses the following CSS variables:

- `--src-dialog-background-color`
- `--src-dialog-border-color`
- `--src-dialog-color`
- `--src-dialog-header-background-color`
- `--src-dialog-header-border-color`
- `--src-dialog-header-color`

## Example

The following example demonstrates how you can use the `Dialog` component.

```jsx
import { useState } from "react";

import { Button, Dialog } from "@macroing/simple-react-components";

export default function DialogPage(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={(e) => setIsVisible(true)}>Show Dialog</Button>
      <Dialog isVisible={isVisible} setIsVisible={setIsVisible} title="Dialog">
        This is the Dialog component.
      </Dialog>
    </>
  );
}
```
