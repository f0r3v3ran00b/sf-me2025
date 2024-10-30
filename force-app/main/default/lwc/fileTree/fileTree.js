import { LightningElement, api } from 'lwc';

export default class FileTree extends LightningElement {
  @api tree = [];
  @api treeDetails;

  handleSelect(event) {
    const { name } = event.detail;
    console.log('Selected file detail:', event.detail);
    const selectedEvent = new CustomEvent("nodeselect", { detail: name });
    this.dispatchEvent(selectedEvent);
    console.log('Event dispatched');
    console.log(`Tree details: ${this.treeDetails}`);
  }
}