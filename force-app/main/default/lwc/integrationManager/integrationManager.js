import { LightningElement, track } from 'lwc';

export default class IntegrationManager extends LightningElement {
  @track integrations = [
    { id: '1', name: 'My S3 Bucket', type: 'AWS S3', icon: '🪣', domain: 'amazonaws.com', url: 'https://s3.amazonaws.com/my-bucket', username: 'aws-user' },
    { id: '2', name: 'Company Dropbox', type: 'Dropbox', icon: '📦', domain: 'dropbox.com', url: 'https://www.dropbox.com/home/Company', username: 'company@example.com' },
    { id: '3', name: 'Azure Storage', type: 'Azure', icon: '☁️', domain: 'azure.com', url: 'https://myaccount.blob.core.windows.net', username: 'azure-user' },
    { id: '4', name: 'FTP Server', type: 'FTP', icon: '🖧', domain: 'ftp.example.com', url: 'ftp://ftp.example.com', username: 'ftp-user' },
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

  // Integration Types Options for lightning-combobox
  integrationTypeOptions = [
    { label: 'AWS S3', value: 'AWS S3' },
    { label: 'Dropbox', value: 'Dropbox' },
    { label: 'Azure', value: 'Azure' },
    { label: 'FTP', value: 'FTP' },
  ];

  connectedCallback() {
    // Prepare data for display
    this.integrations = this.integrations.map(integration => {
      return {
        ...integration,
        iconName: this.getIconName(integration.type),
      };
    });
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

  // Open the modal to add a new integration
  openAddIntegrationModal() {
    this.isAddingNew = true;
    this.newIntegration = {};
    this.modalTitle = 'Add New Integration';
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

  // Handle input field changes
  handleInputChange(event) {
    const field = event.target.dataset.field;
    this.newIntegration = { ...this.newIntegration, [field]: event.target.value };
  }

  // Save the new or edited integration
  handleSaveIntegration() {
    if (this.isAddingNew) {
      // Simple validation
      if (this.newIntegration.name && this.newIntegration.type) {
        this.newIntegration.id = Date.now().toString();
        this.integrations = [...this.integrations, this.newIntegration];
        this.closeModal();
      } else {
        // Implement error handling (e.g., show a toast message)
      }
    } else {
      // Handle edit functionality
      if (this.editingIntegrationId && this.newIntegration.name && this.newIntegration.type) {
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
}