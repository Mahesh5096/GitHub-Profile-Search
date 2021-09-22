import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const QUERY_URL = 'https://api.github.com/search/users?q=';
const USER_URL = 'https://api.github.com/user/';
export default class GithubProfileSearch extends LightningElement {

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Error',
            message: 'Please enter the key word to search',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    searchKey=null;
    profiles;
    userProfiles;
    error;
    profilelength=2;
    userId;
    isClicked=false;

    handleSearchkeyChange(event){
        this.searchKey = event.target.value;
    }

    handleClick(){
        if(this.searchKey===null){
            this.showErrorToast();
        }else{
        fetch(QUERY_URL + this.searchKey)
            .then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.profiles = jsonResponse.items;
                this.isClicked=false;
                this.profilelength = this.profiles.length;
            })
            .catch(error => {
                this.profiles = error;
                this.profiles = undefined;
            }
        );
        }
    }

    profileClick(event){
        
        this.userId = event.currentTarget.dataset.value
        fetch(USER_URL + this.userId)
            .then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.userProfiles = jsonResponse; 
                this.isClicked = true;
            })
            .catch(error => {
                this.userProfiles = error;
                this.userProfiles = undefined;
            }
        );
    }
    
}