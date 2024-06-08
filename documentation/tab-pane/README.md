# `TabPane`

The `TabPane` component represents a tab pane.

The `TabPane` component uses the following properties:

| Name       | Description                                                                                                 | Optional |
| ---------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| `children` | The `children` property consists of a function that renders the content of the current tab.                 | No       |
| `styles`   | The `styles` property contains the class names for all elements.                                            | Yes      |
| `tabIndex` | The `tabIndex` property contains the index of the tab to start at.                                          | Yes      |
| `tabs`     | The `tabs` property contains an array of tabs. The content of the array is the text to render for each tab. | No       |

## Example

The following example demonstrates how you can use the `TabPane` component.

```jsx
<TabPane tabIndex={0} tabs={["Tab 1", "Tab 2", "Tab 3"]}>
  {(currentTabIndex, currentTab) => <div>{currentTab}</div>}
</TabPane>
```
