import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const token = localStorage.getItem('token'); // Retrieve token from local storage
  // const router = new Router(); // Create a new Router instance

  // if (!token) {
  //   router.navigate(['/login']); // Redirect to login if no token is found
  //   return false;
  // }

  // return true;
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token'); // Retrieve token safely

    if (!token) {
      router.navigate(['/login']); // Redirect to login if no token is found
      return false;
    }
    return true;
  } else {
    return false;
  }
};
