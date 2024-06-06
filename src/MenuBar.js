import DesktopMenuBar from "./DesktopMenuBar";
import MobileMenuBar from "./MobileMenuBar";

export default function MenuBar(props) {
  const columns = props.columns;
  const items = props.items;
  const linkFactory = props.linkFactory;
  const logo = props.logo;

  return (
    <>
      <DesktopMenuBar columns={columns} items={items} linkFactory={linkFactory} logo={logo} />
      <MobileMenuBar items={items} linkFactory={linkFactory} logo={logo} />
    </>
  );
}
