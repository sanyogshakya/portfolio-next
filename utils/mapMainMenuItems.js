import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  return menuItems.map((menuItem) => ({
    id: uuid(),
    destination: menuItem.destination?.uri,
    label: menuItem.title,
    subMenuItems: (menuItem.submenuItems || []).map((subMenuItem) => ({
      id: uuid(),
      destination: subMenuItem.destination?.uri,
      label: subMenuItem.title,
    })),
  }));
};
