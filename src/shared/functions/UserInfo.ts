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
    const userOld: User | null = getUserInfo();
    if (userOld !== null) {
      if (user.age === undefined) user.age = userOld.age;
      if (user.creationDate === undefined) user.creationDate = userOld.creationDate;
      if (user.deletedOn === undefined) user.deletedOn = userOld.deletedOn;
      if (user.description === undefined) user.description = userOld.description;
      if (user.email === undefined) user.email = userOld.email;
      if (user.id === undefined) user.id = userOld.id;
      if (user.lastUpdate === undefined) user.lastUpdate = userOld.lastUpdate;
      if (user.name === undefined) user.name = userOld.name;
      if (user.sex === undefined) user.sex = userOld.sex;
      if (user.surname === undefined) user.surname = userOld.surname;
    }

    localStorage.setItem(userInfoId, JSON.stringify(user));
  }
}
