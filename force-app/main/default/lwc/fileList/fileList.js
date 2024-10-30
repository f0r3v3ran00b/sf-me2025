// fileList.js
import { LightningElement, api, track } from 'lwc';

export default class FileList extends LightningElement {
  @api _data = [];
  @api treeDetails;
  @track sortedData = [];
  @track columns = [
    { label: 'Name', fieldName: 'name', sortable: true },
    { label: 'Type', fieldName: 'type', sortable: true },
    { label: 'Size', fieldName: 'size', sortable: true },
  ];
  defaultSortDirection = 'asc';
  sortDirection = 'asc';
  sortedBy;

  connectedCallback() {
    this.sortedData = this;

  }

  handleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    this.sortedData = this;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }

  sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.sortedData));
    let keyValue = (a) => {
      return a[fieldname];
    };
    parseData.sort((x, y) => {
      let a = keyValue(x);
      let b = keyValue(y);
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    });
    this.sortedData = parseData;
  }

  handleRowAction(event) {
    const selectedItem = event.detail.selectedRows[0];
    const fileSelectionEvent = new CustomEvent('fileselection', {
      detail: selectedItem,
    });
    this.dispatchEvent(fileSelectionEvent);
  }
}