export function usernameValidation(username: String): boolean {
  const usernameRegex = new RegExp(/^[a-zA-Z_]+$/);
  return usernameRegex.test(username.toString());
}
export function emailValidation(email: String): boolean {
  return (
    email.indexOf('@') !== -1 &&
    email.trim().length >= 3 &&
    email.substring(email.indexOf('@'), email.length).indexOf('.') != -1
  );
}
export function passwordValidation(password: String): boolean {
  const passwordRegex = new RegExp(/^(?=.\S{7,24}$)(?=.*[a-z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_{|}~])/);
  return passwordRegex.test(password.toString());
}
