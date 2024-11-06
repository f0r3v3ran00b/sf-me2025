import { LightningElement, track } from 'lwc';

export default class SiteConfigurationApp extends LightningElement {
    @track currentStep = '1';
    @track completedSteps = [];

    handleNextStep(event) {
        console.log(`Current Step Before: ${this.currentStep}`)
        const nextStep = event.detail.nextStep;
        if (!this.completedSteps.includes(this.currentStep)) {
            this.completedSteps = [...this.completedSteps, this.currentStep];
        }
        this.currentStep = nextStep;
        console.log(`Current Step After: ${this.currentStep}`)
    }

    handlePreviousStep(event) {
        const previousStep = event.detail.previousStep;
        this.currentStep = previousStep;
    }

    get isStepOne() {
        return this.currentStep === '1';
    }

    get isStepTwo() {
        return this.currentStep === '2';
    }

    get isStepThree() {
        return this.currentStep === '3';
    }
}