import { elementUtil } from "../../../utils";
import testID from "./testID";
import { isIOS, isAndroid } from "../../../configurations/driverConfig";

const { tab, icon } = testID;

/* Example: if Android access IDs are depending on the language and IOS doe not have that dependancy */
const getTabAccessID = (tab, language) => {
  const tabId = isAndroid ? tab[1][language] : tab[0];
  return elementUtil.getElementByAccessibilityId(tabId);
};

const tabONE = (language = "swedish") => getTabAccessID(tab.MENU_TAB_ONE, language);

const tabTWO = (language = "swedish") => getTabAccessID(tab.MENU_TAB_TWO, language);

const tabTHREE = (language = "swedish") => getTabAccessID(tab.MENU_TAB_THREE, language);

/* Example: if IOS profile button has two layers (index 1) and Android has one layer (index 0) */
const btnProfile = () => elementUtil.getElementsByAccessibilityId(icon.PROFILE_BUTTON).then(layer => layer[isIOS | 0]);

export default {
tabONE,
tabTWO,
tabTHREE,
btnProfile,
};
