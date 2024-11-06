import { LightningElement } from 'lwc';

export default class SearchBar extends LightningElement {
    handleSearch(event) {
        const searchKey = event.target.value;
        this.dispatchEvent(new CustomEvent('search', { detail: { searchKey } }));
    }
}