import CompanyName from '@salesforce/schema/User.CompanyName';
import { LightningElement,api } from 'lwc';

export default class GithubUsers extends LightningElement {
   @api name
   handleclick(){
       console.log('-->eneterd click')
       console.log(this.name);
   }
   connectedCallback(){
       console.log('entered-->child');
       console.log(this.name);
   }
}