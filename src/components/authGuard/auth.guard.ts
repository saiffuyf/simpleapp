import { CanActivateFn,Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const router = new Router(); // Create a new Router instance

  if (!token) {
    router.navigate(['/login']); // Redirect to login if no token is found
    return false;
  }

  return true;
};
