export function deleteTokenCookie() {
  // Set the cookie expiration date to a past date
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() - 1); // Set expiration in the past

  // Format the cookie string
  const cookieString =
    "token=;expires=" + expirationDate.toUTCString() + ";path=/";

  // Set the cookie to delete it
  document.cookie = cookieString;
}
