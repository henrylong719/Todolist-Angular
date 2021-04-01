import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  /*
  BehaviorSubject
  1. It needs an initial value as it must always return a value on subscription even if it hasn't received a next()
  2. Upon subscription, it returns the last value of the subject. A regular observable only triggers when it receives an onnext
  3. at any point, you can retrieve the last value of the subject in a non-observable code using the getValue() method.
*/

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  authUrl: string = 'http://localhost:5000/api/users/';

  login(email: string, password: string) {
    console.log(email, password);
    return this.http
      .post<AuthResponseData>(`${this.authUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.name,
            resData.email,
            resData._id,
            resData.isAdmin,
            resData.token,
            resData.expiresIn
          );
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.authUrl}/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.name,
            resData.email,
            resData._id,
            resData.isAdmin,
            resData.token,
            resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    name: string,
    email: string,
    _id: string,
    isAdmin: boolean,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, name, _id, isAdmin, token, expirationDate);

    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      name: string;
      _id: string;
      isAdmin: boolean;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.name,
      userData._id,
      userData.isAdmin,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    console.log('time up');
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }
}
