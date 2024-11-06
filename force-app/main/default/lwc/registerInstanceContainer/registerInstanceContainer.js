import { LightningElement } from 'lwc';

export default class RegisterInstanceContainer extends LightningElement {
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previousstep', { detail: { previousStep: '1' } }));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('nextstep', { detail: { nextStep: '3' } }));
    }
}