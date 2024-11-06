import { LightningElement, api, track } from 'lwc';

export default class SiteDatatable extends LightningElement {
    @api sites = [];
    @track selectedRows = [];

    columns = [
        { label: 'Name', fieldName: 'name', sortable: true },
        { label: 'Type', fieldName: 'type', sortable: true },
        {
            type: 'action',
            typeAttributes: { rowActions: this.getRowActions },
        },
    ];

    getRowActions(row, doneCallback) {
        const actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Test Connection', name: 'test' },
        ];
        doneCallback(actions);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        // Handle actions accordingly
    }

    handleSelectionChange(event) {
        this.selectedRows = event.detail.selectedRows;
    }
}