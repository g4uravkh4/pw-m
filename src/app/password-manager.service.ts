import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
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
}
