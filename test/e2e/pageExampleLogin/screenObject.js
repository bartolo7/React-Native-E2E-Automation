import { elementUtil } from '../../../utils';
import testID from './testID';

const { SCREEN, button, input} = testID;

const screen = () => elementUtil.getElementByAccessibilityId(SCREEN);

const txtUserName = () => elementUtil.getElementByAccessibilityId(input.USERNAME);

const txtPassword = () => elementUtil.getElementByAccessibilityId(input.PASSWORD);

const btnLogin = () => elementUtil.getElementByAccessibilityId(button.LOGIN_UP);


export default {
  screen,
  txtUserName,
  txtPassword,
  btnLogin,
};
