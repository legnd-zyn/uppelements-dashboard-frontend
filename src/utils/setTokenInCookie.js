export function setTokenCookie(token) {
  // Set the cookie expiration to 1 hour from now
  let expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 2000); // 2 hour in milliseconds

  // Format the cookie string
  let cookieString =
    "token=" + token + ";expires=" + expirationDate.toUTCString() + ";path=/";

  // Set the cookie
  document.cookie = cookieString;
}
