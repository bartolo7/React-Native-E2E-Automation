import screenObject from './screenObject';

const { txtUserName, txtPassword, btnLogin } = screenObject;

const loginUsernamePassword = async (user) => {
  const { name, password } = user;
  await txtUserName()
    .click()
    .sendKeys(name);
  await txtPassword()
    .click()
    .sendKeys(password);
  await btnLogin().click();
};

export default { loginUsernamePassword };
