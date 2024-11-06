import { LightningElement, track } from 'lwc';

export default class RegionSelectorContainer extends LightningElement {
    @track selectedRegion = '';
    regions = [
        {
          "id": 1,
          "label": "US East (Virginia)",
          "value": "us-east-1"
        },
        {
          "id": 2,
          "label": "Australia Southeast (Victoria)",
          "value": "australia-southeast"
        },
        {
          "id": 3,
          "label": "West Europe (Netherlands)",
          "value": "west-europe"
        },
        {
          "id": 4,
          "label": "Canada Central (Toronto)",
          "value": "canada-central"
        },
        {
          "id": 5,
          "label": "Asia Pacific (Tokyo)",
          "value": "ap-northeast-1"
        },
        {
          "id": 6,
          "label": "UK South (London)",
          "value": "uk-south"
        },
        {
          "id": 7,
          "label": "US West (Oregon)",
          "value": "us-west-2"
        },
        {
          "id": 8,
          "label": "Germany West Central (Frankfurt)",
          "value": "germany-west-central"
        },
        {
          "id": 9,
          "label": "Asia Pacific (Singapore)",
          "value": "ap-southeast-1"
        },
        {
          "id": 10,
          "label": "Norway East (Oslo)",
          "value": "norway-east"
        },
        {
          "id": 11,
          "label": "South Africa North (Johannesburg)",
          "value": "southafrica-north"
        },
        {
          "id": 12,
          "label": "Brazil South (São Paulo)",
          "value": "sa-east-1"
        },
        {
          "id": 13,
          "label": "France Central (Paris)",
          "value": "france-central"
        },
        {
          "id": 14,
          "label": "UAE North (Dubai)",
          "value": "uae-north"
        },
        {
          "id": 15,
          "label": "Central India (Pune)",
          "value": "central-india"
        }
      ];

      get regionColumns() {
        const columnsCount = 4;
        const rowsPerColumn = 5;
        const columns = [];

        for (let i = 0; i < columnsCount; i++) {
            const start = i * rowsPerColumn;
            const end = start + rowsPerColumn;
            const columnRegions = this.regions.slice(start, end).map(region => ({
                ...region,
                isChecked: region.value === this.selectedRegion,
            }));
            columns.push({
                id: `column-${i}`,
                regions: columnRegions,
            });
        }

            return columns;
    }

    handleRegionChange(event) {
        this.selectedRegion = event.target.value;
    }

    handleNext() {
        if (this.selectedRegion) {
            this.dispatchEvent(new CustomEvent('nextstep', { detail: { nextStep: '2' } }));
        } else {
            alert('Please select a region.');
        }
    }
}