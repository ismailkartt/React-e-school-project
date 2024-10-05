import userMenuData from "../../helpers/data/user-menu.json";


export const getMenuItems = (role) => {
    if (!role || !userMenuData) {
      return;
    }
    const menu = userMenuData[role.toLowerCase()];
    return menu;
  };