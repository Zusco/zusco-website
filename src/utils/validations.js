export function isEmail(string) {
  const emailCheck =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return string.match(emailCheck);
}

export function includesNumber(string) {
  const includesNumber = /\d+/g;
  return string.match(includesNumber);
}

export function includesUppercase(string) {
  const uppercase = /[A-Z]/;
  return uppercase.test(string);
}

/* eslint-disable no-useless-escape */
export function includesSpecialCharacter(string) {
  const includesSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return includesSpecialCharacter.test(string);
}

export function isValidPassword() {
  const test = {
    match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    text: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
  };
  return test;
}

export const hasValue = (value) => !!(value && value !== "");
