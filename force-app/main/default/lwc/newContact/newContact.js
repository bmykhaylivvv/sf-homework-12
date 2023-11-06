import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact'
import FIRST_NAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LAST_NAME_FIELD from "@salesforce/schema/Contact.LastName";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";

export default class NewContact extends LightningElement {

  @api accountId;

  firstName;
  lastName;
  title;
  email;
  phone;

  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
  objectInfo;

  get defaultRecordType(){
      return this.objectInfo.data?.defaultRecordTypeId
  }

  get isSubmitDisabled() {
      return !(this.firstName && this.lastName && this.title && this.email && this.phone);
  }

  closeModal() {
      this.name = null;
      this.title = null;

      this.dispatchEvent(new CustomEvent('closemodal', {}));
  }

  handleFirstNameChange(event) {
      this.firstName = event.target.value;
  }

  handleLastNameChange(event) {
    this.lastName = event.target.value;
  }

  handleTitleChange(event) {
    this.title = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePhoneChange(event) {
    this.phone = event.target.value;
  }

  submitDetails(event) {
      const fields = {};
      fields[ACCOUNT_FIELD.fieldApiName] = this.accountId;
      fields[FIRST_NAME_FIELD.fieldApiName] = this.firstName;
      fields[LAST_NAME_FIELD.fieldApiName] = this.lastName;
      fields[TITLE_FIELD.fieldApiName] = this.title;
      fields[EMAIL_FIELD.fieldApiName] = this.email;
      fields[PHONE_FIELD.fieldApiName] = this.phone;

      const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
      createRecord(recordInput)
          .then(contact => {
              this.closeModal();
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Success',
                      message: 'Contact successfully created!',
                      variant: 'success',
                  }),
              );
          })
          .catch(error => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Error creating record',
                      message: error.body.message,
                      variant: 'error',
                  }),
              );
          })
  }
}