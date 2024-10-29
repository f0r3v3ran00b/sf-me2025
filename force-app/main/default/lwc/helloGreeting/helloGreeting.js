import { LightningElement } from 'lwc';

export default class HelloGreeting extends LightningElement {
    name = '';
    greeting = '';

    handleNameChange(event) {
        this.name = event.target.value;
        this.greeting = 'Hello, ' + this.name + '!';
    }
}