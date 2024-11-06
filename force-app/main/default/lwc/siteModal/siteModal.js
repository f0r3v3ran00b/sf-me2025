import { LightningElement, api, track } from 'lwc';

export default class SiteModal extends LightningElement {
    @api isModalOpen = false;
    @api site = {};
    @track siteType = '';
    @track siteFields = [];
    @track siteData = {};

    // Sample site type options and fields
    siteTypeOptions = [
        { label: 'AWS S3', value: 'AWS S3' },
        { label: 'Dropbox', value: 'Dropbox' },
        // Add more types...
    ];

    siteFieldsConfig = {
        'AWS S3': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            // Add more fields...
        ],
        'Dropbox': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            // Add more fields...
        ],
    };

    connectedCallback() {
        if (this.site && this.site.type) {
            this.siteType = this.site.type;
            this.siteData = { ...this.site };
            this.updateSiteFields();
        }
    }

    updateSiteFields() {
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

    handleInputChange(event) {
        const fieldName = event.target.dataset.field;
        const value = event.target.value;
    
        // Update the currentSite data
        this.currentSite = { ...this.currentSite, [fieldName]: value };
    
        // Update the value in currentFields
        this.currentFields = this.currentFields.map(field => {
            if (field.name === fieldName) {
                return { ...field, value };
            }
            return field;
        });
    }

    handleInputChange(event) {
        const fieldName = event.target.name;
        this.siteData[fieldName] = event.target.value;
    }

    handleSave() {
        // Validate required fields
        // ... Validation logic ...

        this.dispatchEvent(new CustomEvent('save', { detail: this.siteData }));
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}