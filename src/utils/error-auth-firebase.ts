export function setErrorMsg(code: string): string {
  switch (code) {
    case "auth/invalid-login-credentials":
      return "Incorrect email and password. Please try again."
    case "auth/email-already-in-use":
      return "The email address already exists. Please check your address again."

    default:
      return "Oops, something went wrong. Please try again later."
  }
}
