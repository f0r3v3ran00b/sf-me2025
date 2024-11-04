// siteModal.js
import { LightningElement, api, track } from 'lwc';

export default class SiteModal extends LightningElement {
  @api isModalOpen = false;
  @api site = {};
  @api modalTitle = 'Add New Site';
  @api siteTypeOptions;
  @api siteFields;

  @track currentSite = {};
  @track currentFields = [];
  @track isAddingNew = false;

  connectedCallback() {
    this.currentSite = { ...this.site };
    this.isAddingNew = !this.site.id;

    if (this.isAddingNew) {
      this.currentSite.type = '';
    } else {
      this.updateCurrentFields();
    }
  }

  updateCurrentFields() {
    if (this.currentSite && this.currentSite.type) {
      const fields = this.siteFields[this.currentSite.type] || [];
      this.currentFields = fields.map(field => ({
        ...field,
        value: this.currentSite[field.name] || '',
      }));
    } else {
      this.currentFields = [];
    }
  }

  handleTypeChange(event) {
    this.currentSite.type = event.detail.value;
    this.updateCurrentFields();
  }

  handleInputChange(event) {
    const field = event.target.dataset.field;
    const value = event.target.value;
    this.currentSite = { ...this.currentSite, [field]: value };
  }

  handleSave() {
    // Validate required fields
    if (!this.currentSite.name || !this.currentSite.type) {
      alert('Please fill in the required fields.');
      return;
    }
    this.dispatchEvent(new CustomEvent('save', { detail: this.currentSite }));
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }
}