import { LightningElement, track } from 'lwc';

export default class RegisterSiteContainer extends LightningElement {
    @track viewMode = 'datatable'; // 'datatable' or 'card'
    @track sites = []; // Shared site data
    @track filteredSites = []; // For search functionality
    @track searchKey = '';
    @track isModalOpen = false;
    @track modalTitle = 'Register New Site';
    @track siteToEdit = {};

    // Site type options and fields configuration
    siteTypeOptions = [
        { label: 'FTP', value: 'FTP' },
        { label: 'SFTP', value: 'SFTP' },
        { label: 'AWS S3', value: 'AWS S3' },
        { label: 'Azure Blob Storage', value: 'Azure Blob Storage' },
        { label: 'Dropbox', value: 'Dropbox' },
        { label: 'Google Cloud Storage', value: 'Google Cloud Storage' },
    ];

    siteFields = {
        'FTP': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'URL', name: 'url', type: 'url', required: true },
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Port', name: 'port', type: 'number' },
        ],
        'SFTP': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Host', name: 'host', type: 'text', required: true },
            { label: 'Username', name: 'username', type: 'text', required: true },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Private Key', name: 'privateKey', type: 'textarea' },
            { label: 'Port', name: 'port', type: 'number' },
        ],
        'AWS S3': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Access Key ID', name: 'accessKeyId', type: 'text', required: true },
            { label: 'Secret Access Key', name: 'secretAccessKey', type: 'password', required: true },
            { label: 'Bucket Name', name: 'bucketName', type: 'text', required: true },
            { label: 'Region', name: 'region', type: 'text' },
        ],
        'Azure Blob Storage': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Account Name', name: 'accountName', type: 'text', required: true },
            { label: 'Account Key', name: 'accountKey', type: 'password', required: true },
            { label: 'Container Name', name: 'containerName', type: 'text', required: true },
        ],
        'Dropbox': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Access Token', name: 'accessToken', type: 'password', required: true },
        ],
        'Google Cloud Storage': [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Project ID', name: 'projectId', type: 'text', required: true },
            { label: 'Client Email', name: 'clientEmail', type: 'email', required: true },
            { label: 'Private Key', name: 'privateKey', type: 'textarea', required: true },
            { label: 'Bucket Name', name: 'bucketName', type: 'text', required: true },
        ],
    };

    connectedCallback() {
        // Initialize sites with sample data
        this.sites = [
            {
                id: '1',
                name: 'My FTP Server',
                type: 'FTP',
                url: 'ftp://example.com',
                username: 'user1',
                password: 'pass1',
                port: 21,
            },
            {
                id: '2',
                name: 'AWS S3 Bucket',
                type: 'AWS S3',
                accessKeyId: 'AKIA...',
                secretAccessKey: 'SECRET...',
                bucketName: 'my-bucket',
                region: 'us-west-2',
            },
            // Add more sample sites as needed
        ];
        this.filteredSites = [...this.sites];
    }

    get isDataTableView() {
        return this.viewMode === 'datatable';
    }

    get isCardView() {
        return this.viewMode === 'card';
    }

    handleToggleView(event) {
        //this.viewMode = this.viewMode === 'datatable' ? 'card' : 'datatable';
        this.viewMode = event.detail.viewMode;
    }

    handleSiteChange(event) {
        this.sites = event.detail.sites;
        this.filterSites();
    }

    handleSearch(event) {
        this.searchKey = event.detail.searchKey;
        this.filterSites();
    }

    filterSites() {
        if (this.searchKey) {
            const searchLower = this.searchKey.toLowerCase();
            this.filteredSites = this.sites.filter(site =>
                site.name.toLowerCase().includes(searchLower)
            );
        } else {
            this.filteredSites = [...this.sites];
        }
    }

    handleAddSite() {
        this.siteToEdit = {};
        this.modalTitle = 'Register New Site';
        this.isModalOpen = true;
    }

    handleEditSite(event) {
        const siteId = event.detail.siteId;
        const site = this.sites.find(s => s.id === siteId);
        this.siteToEdit = { ...site };
        this.modalTitle = 'Edit Site';
        this.isModalOpen = true;
    }

    handleDeleteSite(event) {
        const siteId = event.detail.siteId;
        // Confirm deletion (you can implement a confirmation dialog)
        this.sites = this.sites.filter(site => site.id !== siteId);
        this.filterSites();
    }

    handleSaveSite(event) {
        const site = event.detail;
        if (site.id) {
            // Update existing site
            this.sites = this.sites.map(s => (s.id === site.id ? site : s));
        } else {
            // Add new site
            site.id = Date.now().toString();
            this.sites = [...this.sites, site];
        }
        this.filterSites();
        this.isModalOpen = false;
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previousstep', { detail: { previousStep: '2' } }));
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }
}