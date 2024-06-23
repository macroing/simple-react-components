import DesktopMenuBar from "./DesktopMenuBar";
import MobileMenuBar from "./MobileMenuBar";

export default function MenuBar(props) {
  const columns = props.columns;
  const items = props.items;
  const linkFactory = props.linkFactory;
  const logo = props.logo;
  const styleDesktopMenuBar = props.styleDesktopMenuBar;
  const styleMobileMenuBar = props.styleMobileMenuBar;
  const theme = props.theme;

  return (
    <>
      <DesktopMenuBar columns={columns} items={items} linkFactory={linkFactory} logo={logo} style={styleDesktopMenuBar} theme={theme} />
      <MobileMenuBar items={items} linkFactory={linkFactory} logo={logo} style={styleMobileMenuBar} theme={theme} />
    </>
  );
}
