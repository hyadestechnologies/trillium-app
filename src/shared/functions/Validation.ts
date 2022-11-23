export function emailValidation(email: String) {
  return (
    email.indexOf('@') !== -1 &&
    email.trim().length >= 3 &&
    email.substring(email.indexOf('@'), email.length).indexOf('.') != -1
  );
}

const passwordRegex = new RegExp(/^(?=.\S{7,24}$)(?=.*[a-z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_{|}~])/);
export { passwordRegex };
