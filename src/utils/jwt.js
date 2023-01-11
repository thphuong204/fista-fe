import jwt_decode from 'jwt-decode';

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};