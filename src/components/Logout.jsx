import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    sessionStorage.removeItem('wpAuthInfo');
    window.location = '/';
  }, []);
  return null;
}

export default Logout;
