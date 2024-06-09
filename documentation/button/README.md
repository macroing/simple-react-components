# `Button`

The `Button` component represents a button.

The `Button` component uses the following properties:

| Name       | Description                                                                         | Optional |
| ---------- | ----------------------------------------------------------------------------------- | -------- |
| `children` | The `children` property contains the children to render.                            | No       |
| `disabled` | The `disabled` property defines whether this `Button` component is disabled or not. | Yes      |
| `styles`   | The `styles` property contains the class name for the `button` element.             | Yes      |
| `theme`    | The `theme` property defines the theme to use. Either `"primary"` or `"secondary"`. | Yes      |
| `...rest`  | Any other property will be passed to the underlying `button` element.               | Yes      |

## Example

The following example demonstrates how you can use the `Button` component.

```jsx
import { Button } from "@macroing/simple-react-components";

export default function ButtonPage(props) {
  return <Button>Button</Button>;
}
```
