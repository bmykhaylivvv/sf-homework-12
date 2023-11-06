import { LightningElement, api } from 'lwc';

export default class Contact extends LightningElement {

  @api contact;

  get name() {
      return this.contact?.Name;
  }

  get title() {
      return this.contact?.Title;
  }
}