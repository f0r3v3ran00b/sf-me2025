// JavaScript
import { LightningElement, api, track } from 'lwc';

export default class SiteCard extends LightningElement {
    @api site;
    @track isFlipped = false;

    get cardClasses() {
        return `flip-card-inner ${this.isFlipped ? 'flip-card-flipped' : ''}`;
    }

    handleCardClick(event) {
        // Prevent flip when clicking action buttons
        if (!event.target.closest('lightning-button-icon')) {
            this.isFlipped = !this.isFlipped;
        }
    }

    handleAction(event) {
        event.stopPropagation(); // Prevent card flip when clicking buttons
        const action = event.currentTarget.dataset.action;
        this.dispatchEvent(new CustomEvent('siteaction', {
            detail: { action, site: this.site },
        }));
    }
}