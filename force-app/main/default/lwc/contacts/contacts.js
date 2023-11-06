import { LightningElement, api, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/ContactsController.getRelatedContacts';

export default class Contacts extends LightningElement {
  @api recordId;
  @track isModalOpen = false;

  @wire(getRelatedContacts, {accountId: '$recordId'})
  retrievedContacts;

  get contactData() {
      return this.retrievedContacts?.data;
  }

  get contactError() {
      return this.retrievedContacts?.error ? JSON.stringify(this.retrievedContacts?.error) : '';
  }

  createNewContact(event) {
      this.isModalOpen = true;
  }

  closeModal() {
      this.isModalOpen = false;
  }
}