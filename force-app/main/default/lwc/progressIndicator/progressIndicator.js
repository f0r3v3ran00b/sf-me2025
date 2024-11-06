// progressIndicator.js
import { LightningElement, api } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    @api currentStep;
    @api completedSteps;

    steps = [
        { label: 'Select Region', value: '1' },
        { label: 'Step Two', value: '2' },
        { label: 'Configure Sites', value: '3' },
    ];

    // Compute the class for each step
    get computedSteps() { 
        const completedSteps = this.completedSteps || []; 
        return this.steps.map(step => {
            let stepClass = '';
            if (this.completedSteps.includes(step.value)) {
                stepClass = 'slds-is-completed';
            } else if (step.value === this.currentStep) {
                stepClass = 'slds-is-active';
            } else if (parseInt(step.value) < parseInt(this.currentStep)) {
                stepClass = 'slds-is-completed';
            }
            return {
                ...step,
                stepClass,
            };
        });
    }
}