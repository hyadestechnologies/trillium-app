import type { User } from '../types/user';

const userInfoId = 'user_info';

// Get user info from local storage or null if not possible
export function getUserInfo(): User | null {
  if (typeof Storage !== 'undefined') {
    const userStr = localStorage.getItem(userInfoId);
    if (userStr !== null) return JSON.parse(userStr);
  }
  return null;
}
// Set user info to local storage if possible
export function setUserInfo(user: User): void {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(userInfoId, JSON.stringify(user));
  }
}
