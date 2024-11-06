import { LightningElement, api } from 'lwc';

export default class SiteCardGrid extends LightningElement {
    @api sites = [];

    handleSiteAction(event) {
        // Forward the event to parent with site data
        this.dispatchEvent(new CustomEvent('siteschange', { detail: event.detail }));
    }

    handleAddSite() {
        // Open modal to add new site
        this.dispatchEvent(new CustomEvent('addsite'));
    }
}