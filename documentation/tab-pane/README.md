# `TabPane`

The `TabPane` component represents a tab pane.

The `TabPane` component uses the following properties:

| Name       | Description                                                                                                 | Optional |
| ---------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| `children` | The `children` property consists of a function that renders the content of the current tab.                 | No       |
| `styles`   | The `styles` property contains the class names for all elements.                                            | Yes      |
| `tabIndex` | The `tabIndex` property contains the index of the tab to start at.                                          | Yes      |
| `tabs`     | The `tabs` property contains an array of tabs. The content of the array is the text to render for each tab. | No       |

## Styling

The `TabPane` component uses the following CSS variables:

- `--src-tab-pane-background-color`
- `--src-tab-pane-border-color`
- `--src-tab-pane-button-background-color`
- `--src-tab-pane-button-background-color-active`
- `--src-tab-pane-button-background-color-hover`
- `--src-tab-pane-button-border-color`
- `--src-tab-pane-button-border-color-active`
- `--src-tab-pane-button-border-color-hover`
- `--src-tab-pane-button-close-color`
- `--src-tab-pane-button-color`
- `--src-tab-pane-button-color-active`
- `--src-tab-pane-button-color-hover`
- `--src-tab-pane-color`
- `--src-tab-pane-icon-background-color`
- `--src-tab-pane-menu-background-color`

## Example

The following example demonstrates how you can use the `TabPane` component.

```jsx
import { TabPane } from "@macroing/simple-react-components";

export default function TabPanePage(props) {
  return (
    <TabPane tabIndex={0} tabs={["Tab 1", "Tab 2", "Tab 3"]}>
      {(currentTabIndex, currentTab) => <div>{currentTab}</div>}
    </TabPane>
  );
}
```
