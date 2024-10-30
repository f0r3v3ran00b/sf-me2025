// fileExplorerApp.js
import { LightningElement, track } from 'lwc';

export default class FileExplorerApp extends LightningElement {
  @track fileTreeData = [];
  @track selectedFolder = null;
  @track selectedFile = null;
  @track isModalOpen = false;
  @track treeDetails = new Map();

  connectedCallback() {
    this.initializeData();
    this.initializeTreeDetails();
    console.log('fileTreeData: ', this.fileTreeData);
  }

  initializeData() {

    this.fileTreeData = [
      {
        label: 'Western Sales Director',
        name: '1',
        expanded: true,
        items: [
          {
            label: 'Western Sales Manager',
            name: '11',
            expanded: true,
            items: [
              {
                label: 'CA Sales Rep',
                name: '111',
                expanded: true,
                items: [],
              },
              {
                label: 'OR Sales Rep',
                name: '112',
                expanded: true,
                items: [],
              },
            ],
          },
        ],
      },
      {
        label: 'Eastern Sales Director',
        name: '2',
        expanded: false,
        items: [
          {
            label: 'Easter Sales Manager',
            name: '21',
            expanded: true,
            items: [
              {
                label: 'NY Sales Rep',
                name: '211',
                expanded: true,
                items: [],
              },
              {
                label: 'MA Sales Rep',
                name: '212',
                expanded: true,
                items: [],
              },
            ],
          },
        ],
      },
      {
        label: 'International Sales Director',
        name: '3',
        expanded: true,
        items: [
          {
            label: 'Asia Sales Manager',
            name: '31',
            expanded: true,
            items: [
              {
                label: 'Sales Rep1',
                name: '311',
                expanded: true,
                items: [],
              },
              {
                label: 'Sales Rep2',
                name: '312',
                expanded: true,
                items: [],
              },
            ],
          },
          {
            label: 'Europe Sales Manager',
            name: '32',
            expanded: false,
            items: [
              {
                label: 'Sales Rep1',
                name: '321',
                expanded: true,
                items: [],
              },
              {
                label: 'Sales Rep2',
                name: '322',
                expanded: true,
                items: [],
              },
            ],
          },
        ],
      },
    ];

    this.selectedFolder = this.fileTreeData[0];
  }

  ;

  initializeTreeDetails() {
    this.treeDetails.set(1, 'Super Awesome 1');
    this.treeDetails.set(11, 'Super Awesome 11');
    this.treeDetails.set(2, 'Super Awesome 2');
    this.treeDetails.set(3, 'Super Awesome 3');
  }

  handleFolderSelection(event) {
    this.selectedFolder = event.detail;
    this.selectedFile = null; // Reset selected file when folder changes
  }

  handleFileSelection(event) {
    this.selectedFile = event.detail;
  }

  ;

  handleAction(event) {
    const action = event.detail;
    switch (action) {
      case 'preview':
        break;
      // Handle other actions (copy, rename, etc.)
      default:
        //alert(`Action ${action};
        }
    }

   ;

    handleModalClose() {
        this.isModalOpen = false;
    }
}