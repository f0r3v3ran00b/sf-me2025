import { LightningElement, api } from 'lwc';

export default class IntegrationCard extends LightningElement {
  @api integration;

  handleEdit() {
    const editEvent = new CustomEvent('edit', {
      detail: { integrationId: this.integration.id },
    });
    this.dispatchEvent(editEvent);
  }

  handleDelete() {
    const deleteEvent = new CustomEvent('delete', {
      detail: { integrationId: this.integration.id },
    });
    this.dispatchEvent(deleteEvent);
  }
}