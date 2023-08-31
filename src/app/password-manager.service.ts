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

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private _fireStore: Firestore) {}

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
}
