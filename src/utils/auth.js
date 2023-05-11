

const AccessTokenKey = "token";
const RefreshTokenKey = "staj-mehnat_web_refresh_token";
import { removeItem } from '@/utils/storage';

//set functions
export function setAccessToken(token) {
  return localStorage.setItem(AccessTokenKey, token);
}
export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token);
}
//remove functions
export function removeAccessToken() {
  return localStorage.removeItem(AccessTokenKey);
}
export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}
// get functions
export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey);
}
export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}

export function clearForLogout() {
  Cookies.remove(accessTokenKey);
  Cookies.remove(refreshTokenKey);
  removeItem('user');
  return true;
}
