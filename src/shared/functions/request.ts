const authTokenId = 'access_token';

export function getAuthToken(): string | null {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(authTokenId);
  }
  return null;
}
export function setAuthToken(token: string) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(authTokenId, token);
  }
}
export function deleteAuthToken() {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem(authTokenId);
  }
}
