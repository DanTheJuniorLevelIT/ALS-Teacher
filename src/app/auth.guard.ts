import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');

  // Check if the token is not present
  if (!token) {
    const router = new Router(); // Or inject router via the provider
    router.navigate(['/login']); // Redirect to the login page if token is not found
    return false;
  }

  return true; // Allow access if the token is found

  // const token = localStorage.getItem('authToken');
    
  //   if (!token) {
  //     const router = new Router();
  //     router.navigate(['/login']);
  //     return false;
  //   }

  //   const decodedToken: any = jwt_decode(token);
  //   const currentTime = Date.now() / 1000;

  //   if (decodedToken.exp < currentTime) {
  //     const router = new Router();
  //     router.navigate(['/login']);
  //     localStorage.removeItem('authToken');
  //     return false;
  //   }

    // return true;
};

