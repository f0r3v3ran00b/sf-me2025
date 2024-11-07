// viewSwitcher/viewSwitcher.js
import { LightningElement, api } from 'lwc';

export default class ViewSwitcher extends LightningElement {
    @api viewMode = 'card';

    get containerClass() {
        return `slds-button-group view-switcher ${this.viewMode}`;
    }

    get datatableViewClass() {
        return `slds-button slds-button_icon view-button ${this.viewMode === 'datatable' ? 'active' : ''}`;
    }

    get cardViewClass() {
        return `slds-button slds-button_icon view-button ${this.viewMode === 'card' ? 'active' : ''}`;
    }

    handleViewChange(event) {
        const selectedView = event.currentTarget.dataset.view;
        this.viewMode = selectedView;

        this.dispatchEvent(new CustomEvent('viewchange', {
            detail: {
                viewMode: selectedView
            }
        }));    

        this.dispatchEvent(new CustomEvent('viewchange', {
            detail: {
                viewMode: selectedView
            }
        }));
    }
    
}