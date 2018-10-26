
import { observable, action,computed } from 'mobx'
import axios from 'axios'

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
    @observable prospects = []
    @observable redirect_to = null
    @observable user_slug = null

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
        this.redirect_to = link
    }

    @action
    purgeRedirect() {
        this.redirect_to = null
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

    @computed get currentProspect(){
        return this.prospects[0]
    }
}

export default UserStore
