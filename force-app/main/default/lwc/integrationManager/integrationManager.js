import { LightningElement, track } from 'lwc';
import processIntegrations from '@salesforce/apex/IntegrationController.processIntegrations';

export default class IntegrationManager extends LightningElement {
  @track isJsonModalOpen = false;
  integrationsJson = '';
  @track integrations = [
    { id: '1', name: 'My S3 Bucket', type: 'AWS S3', iconName: 'custom:custom1', domain: 'amazonaws.com', url: 'https://s3.amazonaws.com/my-bucket', username: 'aws-user', accessKey: 'AKIA...', secretKey: 'SECRET...' },
    { id: '2', name: 'Company Dropbox', type: 'Dropbox', iconName: 'custom:custom2', domain: 'dropbox.com', url: 'https://www.dropbox.com/home/Company', username: 'company@example.com', apiToken: 'TOKEN...' },
    { id: '3', name: 'Azure Storage', type: 'Azure', iconName: 'custom:custom3', domain: 'azure.com', url: 'https://myaccount.blob.core.windows.net', username: 'azure-user', storageAccount: 'myaccount', accessKey: 'ACCESS_KEY...' },
    { id: '4', name: 'FTP Server', type: 'FTP', iconName: 'utility:world', domain: 'ftp.example.com', url: 'ftp://ftp.example.com', username: 'ftp-user', password: 'PASSWORD' },
  ];

  @track columns = [
    {
      label: 'Name',
      fieldName: 'name',
      type: 'text',
      cellAttributes: {
        iconName: { fieldName: 'iconName' },
        iconPosition: 'left'
      }
    },
    { label: 'Type', fieldName: 'type', type: 'text' },
    { label: 'Domain', fieldName: 'domain', type: 'text' },
    { label: 'URL', fieldName: 'url', type: 'url' },
    { label: 'Username', fieldName: 'username', type: 'text' },
    {
      type: 'action',
      typeAttributes: { rowActions: this.getRowActions }
    },
  ];

  @track isModalOpen = false;
  @track isAddingNew = false;
  @track newIntegration = {};
  @track modalTitle = '';
  @track modalButtonLabel = '';
  @track editingIntegrationId = null;

  // Fields configuration for each integration type
  integrationFields = {
    'AWS S3': [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'Domain', name: 'domain', type: 'text' },
      { label: 'URL', name: 'url', type: 'url' },
      { label: 'Access Key', name: 'accessKey', type: 'password' },
      { label: 'Secret Key', name: 'secretKey', type: 'password' },
      { label: 'Bucket Name', name: 'bucketName', type: 'text' },
    ],
    'Dropbox': [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'API Token', name: 'apiToken', type: 'password' },
    ],
    'Azure': [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'Storage Account', name: 'storageAccount', type: 'text' },
      { label: 'Access Key', name: 'accessKey', type: 'password' },
    ],
    'FTP': [
      { label: 'Name', name: 'name', type: 'text' },
      { label: 'URL', name: 'url', type: 'url' },
      { label: 'Username', name: 'username', type: 'text' },
      { label: 'Password', name: 'password', type: 'password' },
      { label: 'Port', name: 'port', type: 'number' },
    ],
  };

  // Integration Types Options for lightning-combobox
  integrationTypeOptions = [
    { label: 'AWS S3', value: 'AWS S3' },
    { label: 'Dropbox', value: 'Dropbox' },
    { label: 'Azure', value: 'Azure' },
    { label: 'FTP', value: 'FTP' },
  ];

  // Computed property to get the current fields based on selected integration type
  get currentFields() {
    const fields = this.integrationFields[this.newIntegration.type] || [];
    return fields.map(field => {
      return {
        ...field,
        value: this.newIntegration[field.name] || '',
      };
    });
  }

  // Open the modal to add a new integration
  openAddIntegrationModal() {
    this.isAddingNew = true;
    this.newIntegration = {};
    this.modalTitle = 'Add New Site';
    this.modalButtonLabel = 'Add Integration';
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
    this.isAddingNew = false;
    this.editingIntegrationId = null;
    this.newIntegration = {};
  }

  // Handle integration type selection
  handleTypeChange(event) {
    this.newIntegration.type = event.detail.value;
    // Set default icon based on the selected type
    this.newIntegration.iconName = this.getIconName(this.newIntegration.type);
  }

  // Handle input field changes for dynamic fields
  handleDynamicInputChange(event) {
    const field = event.target.dataset.field;
    this.newIntegration = { ...this.newIntegration, [field]: event.target.value };
  }
  // Save the new or edited integration
  handleSaveIntegration() {
    // Simple validation: ensure required fields are filled
    const requiredFields = this.currentFields.filter(field => field.label !== 'Optional');
    const missingFields = requiredFields.filter(field => !this.newIntegration[field.name]);

    if (missingFields.length > 0) {
      // Implement error handling (e.g., show a toast message)
      console.error('Please fill all required fields.');
      return;
    }

    if (this.isAddingNew) {
      this.newIntegration.id = Date.now().toString();
      this.integrations = [...this.integrations, this.newIntegration];
      this.closeModal();
    } else {
      if (this.editingIntegrationId) {
        this.integrations = this.integrations.map(integration =>
          integration.id === this.editingIntegrationId
            ? { ...integration, ...this.newIntegration }
            : integration
        );
        this.closeModal();
      }
    }
  }

  // Handle row action buttons
  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    if (actionName === 'test') {
      this.handleTestIntegration(row.id);
    } else if (actionName === 'edit') {
      this.handleEditIntegration(row.id);
    } else if (actionName === 'delete') {
      this.handleDeleteIntegration(row.id);
    }
  }

  // Handle Test button click
  handleTestIntegration(integrationId) {
    // Implement integration test logic here
    console.log(`Testing integration ${integrationId}`);
  }

  // Handle Edit button click
  handleEditIntegration(integrationId) {
    const integration = this.integrations.find(intg => intg.id === integrationId);
    if (integration) {
      this.isAddingNew = false;
      this.newIntegration = { ...integration };
      this.modalTitle = 'Edit Integration';
      this.modalButtonLabel = 'Save Changes';
      this.isModalOpen = true;
      this.editingIntegrationId = integrationId;
    }
  }

  // Handle Delete button click
  handleDeleteIntegration(integrationId) {
    this.integrations = this.integrations.filter(integration => integration.id !== integrationId);
  }

  // Map integration types to SLDS icons
  getIconName(type) {
    switch (type) {
      case 'AWS S3':
        return 'custom:custom1';
      case 'Dropbox':
        return 'custom:custom2';
      case 'Azure':
        return 'custom:custom3';
      case 'FTP':
        return 'utility:world';
      default:
        return 'utility:apps';
    }
  }

  // Define row actions
  getRowActions(row, doneCallback) {
    const actions = [
      { label: 'Test', name: 'test', iconName: 'utility:refresh' },
      { label: 'Edit', name: 'edit', iconName: 'utility:edit' },
      { label: 'Delete', name: 'delete', iconName: 'utility:delete', destructive: true },
    ];
    doneCallback(actions);
  }
}