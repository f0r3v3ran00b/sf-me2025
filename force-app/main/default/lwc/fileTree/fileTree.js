import { LightningElement, api } from 'lwc';

export default class FileTree extends LightningElement {
  @api tree = [];

  handleSelect(event) {
    const { name } = event.detail;
    const selectedEvent = new CustomEvent("nodeselect", { detail: name });
    this.dispatchEvent(customEvent);
  }
}