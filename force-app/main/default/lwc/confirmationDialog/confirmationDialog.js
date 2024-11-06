import { LightningElement, api } from 'lwc';

export default class ConfirmationDialog extends LightningElement {
    @api message;
    @api isOpen = false;

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }
}