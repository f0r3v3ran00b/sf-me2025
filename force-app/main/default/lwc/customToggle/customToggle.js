// customToggle.js
import { LightningElement, api, track } from 'lwc';

export default class CustomToggle extends LightningElement {
    @api size = 'md';
    @api activeColor = '#2196F3';
    @api inactiveColor = '#ccc';
    @api label;
    @api disabled = false;
    @api defaultChecked = false;
    @api viewMode;

    @track checked = false;

    sizes = {
        sm: { width: '32px', height: '18px', thumbSize: '14px' },
        md: { width: '44px', height: '24px', thumbSize: '20px' },
        lg: { width: '56px', height: '30px', thumbSize: '26px' },
    };

    connectedCallback() {
        // Initialize the checked state with defaultChecked
        this.checked = this.defaultChecked;
    }

    handleToggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            console.log(`Toggle checked: ${this.checked}`);
            // Dispatch a custom event to notify parent components of the change
            const event = new CustomEvent('customtogglechanged', {
                detail: { checked: this.checked }
            });
            this.dispatchEvent(event);
        }
    }

    get toggleStyles() {
        // Compute CSS variables for dynamic styling
        const sizeStyles = this.sizes[this.size] || this.sizes['md'];
        const width = parseInt(sizeStyles.width);
        const thumbSize = parseInt(sizeStyles.thumbSize);
        const translateX = width - thumbSize - 4;

        return `
            --toggle-width: ${sizeStyles.width};
            --toggle-height: ${sizeStyles.height};
            --thumb-size: ${sizeStyles.thumbSize};
            --active-color: ${this.activeColor};
            --inactive-color: ${this.inactiveColor};
            --hover-color: ${this.disabled ? this.inactiveColor : '#aaa'};
            --translate-x: ${translateX}px;
        `;
    }

    get sliderClass() {
        // Apply CSS classes based on the disabled state
        return `toggle-switch ${this.disabled ? 'toggle-disabled' : ''}`;
    }

    get labelClickHandler() {
        // Disable label click handler if the toggle is disabled
        return this.disabled ? null : this.handleToggle;
    }
}