export const LOGOUT = 'LOGOUT';

export default function logout(nextState, redirectTo) {
  redirectTo('/login');
  return {
    type: LOGOUT
  };
}
