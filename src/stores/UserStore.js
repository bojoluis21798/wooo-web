
import { observable, action,computed } from 'mobx'
import axios from 'axios'
import dog from '../assets/images/dog.jpeg';
import dog2 from '../assets/images/dog2.jpg';
import dog3 from '../assets/images/dog3.jpg';
class UserStore {
    @observable username = null
    @observable name = null
    @observable biography = null
    @observable gay = null
    @observable preference = null
    @observable radius = null
    @observable location = null
    @observable state = null
    @observable profilePicture = null
    @observable photos = []
    @observable token = null
    @observable accessToken = null
    @observable profile_id = null
    @observable prospects = [
        {
          user:{
            first_name: "Rico",
            
          },
            age: 16,
            img: [dog, dog2, dog3],
            location: "DOWNTOWN MANHATTAN, NEW YORK",
            bio: "My friends call me daddy. I can't figure out why. Do you mind helping me figure it out?",
        }
    ]
    @observable redirect_to = null
    @observable user_slug = null
    @observable noProspects = false;
    @observable isMatched = false;

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
            this.getLocation()
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
        this.name = userAuth.user_profile.user.full_name
        this.profilePicture = userAuth.user_profile.profile_image
        this.biography = userAuth.user_profile.biography
        this.radius = userAuth.user_profile.search_radius
        this.preference = userAuth.user_profile.sexual_preference
        this.profile_id = userAuth.user_profile.id
        this.gay = userAuth.user_profile.gay
        this.user_slug = userAuth.user_profile.user.slug
    }

    @action
    setRedirectTo(link) {
        console.log("Redirect to: " + link)
        this.redirect_to = link
    }

    @action
    getRedirectTo() {
        const redirectLink = this.redirect_to
        this.redirect_to = null
        return redirectLink
    }

    @action
    setBio(bio){
        this.biography = bio
    }

    @action
    setLocation(location){
    this.location = location
    }

    @action
    setGay(gay){
        this.gay = gay
    }

    @action
    setRadius(radius){
        this.radius = radius
    }

    @action
    setPreference(prefs){
        this.preference = prefs
    }

    @action
    setPicOne(p1){
        this.photos[0] = p1;
    }

    @action
    async getLocation(){
        try{
            
            navigator.geolocation.getCurrentPosition((position) => {
              this.setLocation( {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            })
        } catch (err){
/*
            fetch('http://freegeoip.app/json/')
            .then(response => {
             console.log(response)
              if (
                response
              ) {
               

              } else {
               
              }
            })
            .catch(() => {
              console.log(
                'No internet connection found. App is running in offline mode.'
              );
            });
*/
        } 
    }

    @action insertToken(authObj){
        this.accessToken = authObj.auth_token
    }

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
        return this.noProspects
    }

    @computed get prospectLength(){
        console.log("Prospect's length"+ this.prospects.length);
        // return this.prospects.length?this.prospects.length:null;
        return this.prospects.length;
    }
}

export default UserStore
