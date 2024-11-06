import { LightningElement, wire } from 'lwc';
import registerAgain from '@salesforce/apex/SiteRegistrationController.registerAgain';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RegisterAgainButton extends LightningElement {
    handleRegisterAgain() {
        registerAgain()
            .then(result => {
                // Handle success
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Registration successful.',
                        variant: 'success',
                    })
                );
            })
            .catch(error => {
                // Handle error
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Registration failed.',
                        variant: 'error',
                    })
                );
            });
    }
}