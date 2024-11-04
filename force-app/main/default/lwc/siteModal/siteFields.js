// siteFields.js
export const siteTypeOptions = [
    { label: 'AWS S3', value: 'AWS S3' },
    { label: 'Dropbox', value: 'Dropbox' },
    { label: 'Azure', value: 'Azure' },
    { label: 'FTP', value: 'FTP' },
];

export const siteFields = {
    'AWS S3': [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'Domain', name: 'domain', type: 'text' },
        { label: 'URL', name: 'url', type: 'url' },
        { label: 'Access Key', name: 'accessKey', type: 'password' },
        { label: 'Secret Key', name: 'secretKey', type: 'password' },
        { label: 'Bucket Name', name: 'bucketName', type: 'text' },
    ],
    'Dropbox': [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'API Token', name: 'apiToken', type: 'password' },
    ],
    'Azure': [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'Storage Account', name: 'storageAccount', type: 'text' },
        { label: 'Access Key', name: 'accessKey', type: 'password' },
    ],
    'FTP': [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'URL', name: 'url', type: 'url' },
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
        { label: 'Port', name: 'port', type: 'number' },
    ],
};