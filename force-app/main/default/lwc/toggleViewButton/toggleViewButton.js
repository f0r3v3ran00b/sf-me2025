// toggleViewButton.js
import { LightningElement, api } from 'lwc';

export default class ToggleViewButton extends LightningElement {
    @api viewMode = 'datatable'; // 'datatable' or 'card'

    get iconName() {
        return this.viewMode === 'datatable' ? 'utility:tile_card_list' : 'utility:table';
    }

    get buttonTitle() {
        return this.viewMode === 'datatable' ? 'Switch to Card View' : 'Switch to Table View';
    }

    handleToggle() {
        const newViewMode = this.viewMode === 'datatable' ? 'card' : 'datatable';
        this.dispatchEvent(new CustomEvent('toggle', { detail: { viewMode: newViewMode } }));
    }
}