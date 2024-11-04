import { LightningElement, track } from 'lwc';
import processIntegrations from '@salesforce/apex/IntegrationController.processIntegrations';

export default class SiteRegistrationCards extends LightningElement {
  @track integrations = [
    {
      id: '1',
      name: 'My S3 Bucket',
      type: 'AWS S3',
      iconName: 'utility:cloud',
      domain: 'amazonaws.com',
      url: 'https://s3.amazonaws.com/my-bucket',
      accessKey: 'AKIA...',
      secretKey: 'SECRET...',
      bucketName: 'my-bucket',
    },
    {
      id: '2',
      name: 'Company Dropbox',
      type: 'Dropbox',
      iconName: 'utility:open_folder',
      apiToken: 'TOKEN...',
    },
    {
      id: '3',
      name: 'Azure Storage',
      type: 'Azure',
      iconName: 'utility:connected_apps',
      storageAccount: 'myaccount',
      accessKey: 'ACCESS_KEY...',
    },
    {
      id: '4',
      name: 'FTP Server',
      type: 'FTP',
      iconName: 'utility:world',
      url: 'ftp://ftp.example.com',
      username: 'ftp-user',
      password: 'PASSWORD',
      port: 21,
    },
  ];

  @track isModalOpen = false;
  @track isAddingNew = false;
  @track newIntegration = {};
  @track modalTitle = '';
  @track modalButtonLabel = '';
  @track editingIntegrationId = null;

  @track isJsonModalOpen = false;
  integrationsJson = '';

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

  // Map integration types to SLDS icons
  getIconName(type) {
    switch (type) {
      case 'AWS S3':
        return 'utility:cloud';
      case 'Dropbox':
        return 'utility:open_folder';
      case 'Azure':
        return 'utility:connected_apps';
      case 'FTP':
        return 'utility:world';
      default:
        return 'utility:apps';
    }
  }

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

  // Getter to precompute display fields for each integration
  get integrationsWithDisplayFields() {
    return this.integrations.map(integration => {
      const fieldsConfig = this.integrationFields[integration.type] || [];
      const displayFields = fieldsConfig.map(field => {
        return {
          label: field.label,
          name: field.name,
          value: integration[field.name] || '',
        };
      });
      return {
        ...integration,
        displayFields,
      };
    });
  }

  // Open the modal to add a new integration
  openAddIntegrationModal() {
    this.isAddingNew = true;
    this.newIntegration = {};
    this.modalTitle = 'Add New Site';
    this.modalButtonLabel = 'Add New Site';
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
    const requiredFields = this.integrationFields[this.newIntegration.type].filter(field => !field.optional);
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

    // Convert integrations array to JSON
    this.integrationsJson = JSON.stringify(this.integrations, null, 2);

    // Display the JSON in a modal dialog
    this.isJsonModalOpen = true;

    // Call the Apex method
    processIntegrations({ integrationsJson: this.integrationsJson })
      .then(() => {
        console.log('Integrations processed successfully');
      })
      .catch(error => {
        console.error('Error processing integrations:', error);
      });
  }

  // Handle Edit button click
  handleEditIntegration(event) {
    const integrationId = event.target.dataset.id;
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
  handleDeleteIntegration(event) {
    const integrationId = event.target.dataset.id;
    this.integrations = this.integrations.filter(integration => integration.id !== integrationId);

    // Convert integrations array to JSON
    this.integrationsJson = JSON.stringify(this.integrations, null, 2);

    // Display the JSON in a modal dialog
    this.isJsonModalOpen = true;

    // Call the Apex method
    processIntegrations({ integrationsJson: this.integrationsJson })
      .then(() => {
        console.log('Integrations processed successfully');
      })
      .catch(error => {
        console.error('Error processing integrations:', error);
      });
  }

  // Method to close the JSON modal
  closeJsonModal() {
    this.isJsonModalOpen = false;
  }
}