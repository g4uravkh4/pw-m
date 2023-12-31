import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private _fireStore: Firestore, private auth: Auth) {}

  addSite(data: object) {
    const dbInstance = collection(this._fireStore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this._fireStore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this._fireStore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  delete(id: string) {
    const docInstance = doc(this._fireStore, 'sites', id);
    return deleteDoc(docInstance);
  }

  // passeord queries
  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this._fireStore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPasswords(siteId: string) {
    const dbInstance = collection(this._fireStore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }

  updatePassowrd(siteId: string, passwordId: string, data: object) {
    const dbInstance = doc(
      this._fireStore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(dbInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const dbInstance = doc(
      this._fireStore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return deleteDoc(dbInstance);
  }

  //login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
