
import { observable, action,computed } from 'mobx'
import axios from 'axios'

class UserStore {
    @observable username = null
    @observable name = null
    @observable biography = null
    @observable preference = null
    @observable radius = null
    @observable location = null
    @observable state = null
    @observable profilePicture = null
    @observable photos = []
    @observable token = null
    @observable email = null
    @observable accessToken = null
    @observable profile_id = null
    @observable prospects = []
    @observable isMatched = false;
    @observable noProspects = false;

    @action
    setIsMatched(bool){
        console.log("got in setIsmatched");
        this.isMatched = bool;
    }

    @action
    setNoProspects(bool){
        this.noProspects = bool
    }
    
    @action
    async authenticateUser(authObj) {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/login/`, {
                accessToken: authObj.accessToken
            })

            this.populateUser(response.data)
            this.insertToken(authObj)
            return true
        } catch(err) {
            return false
        }
        
    }

    @action 
    populateUser(userAuth) {
        this.token = userAuth.auth_token
        this.name = userAuth.name
        this.email = true
        this.profilePicture = userAuth.profile_image
        this.biography = userAuth.biography
        this.radius = userAuth.search_radius
        this.preference = userAuth.sexual_preference
        this.profile_id = userAuth.profile_id
    }

    @action
    setBio(bio){
        this.biography = bio
    }

    @action
    setRadius(radius){
        this.radius = radius
    }

    @action
    setPreference(prefs){
        this.preference = prefs
    }

    @action insertToken(authObj){
        // this.accessToken = authObj.accessToken
        this.accessToken = authObj.auth_token
    }
    
    // @action 
    // populateUser(userAuth) {
    //     console.log(userAuth.profile_id)
    //     this.profile_id= userAuth.profile_id
    //     console.log(this.profile_id)
    //     this.token = userAuth.auth_token
    //     this.name = userAuth.name
    //     this.email = true
    //     this.profilePicture = userAuth.profile_image
    // }

    @action
    setProspects(prospects){
        this.prospects = prospects
    }

    @action
    nextProspect(){
        if(this.prospects.length > 1){
            this.prospects.splice(0,1)
        }
    }

    @computed get isMatchedValue(){
        return this.isMatched
    }
    @computed get currentProspect(){
        return this.prospects[0]
    }

    @computed get noProspectsValue(){
        console.log(this.noProspects);
        return this.noProspects
    }

    @computed get prospectLength(){
        console.log("Prospect's length"+ this.prospects.length);
        // return this.prospects.length?this.prospects.length:null;
        return this.prospects.length;
    }
}

export default UserStore
