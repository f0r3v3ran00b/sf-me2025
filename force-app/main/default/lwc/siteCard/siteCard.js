import { LightningElement, api } from 'lwc';

export default class SiteCard extends LightningElement {
    @api site;

    handleAction(event) {
        const action = event.currentTarget.dataset.action;
        this.dispatchEvent(new CustomEvent('siteaction', {
            detail: { action, site: this.site },
        }));
    }
}