import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;
  public usuario$: Observable<any>;
  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = authState(this.auth);

    this.usuario$ = authState(this.auth).pipe(
      map((user) => {
        if (user) {
          console.log(user);
          return user;
        }
        return of(null);
      })
    );
  }

  async registro(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(email: any, password: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUsuarioFire() {
    const user = this.auth.currentUser;

    return user;
  }
}
