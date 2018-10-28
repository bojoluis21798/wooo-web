
import { observable, action,computed } from 'mobx'
import axios from 'axios'

class UserStore {
    @observable username = null
    @observable name = null
    @observable biography = ''
    @observable gay = null
    @observable preference = null
    @observable radius = null
    @observable location = null
    @observable state = null
    @observable profilePicture = null
    @observable photos = []
    @observable photo_link_1 = null
    @observable photo_link_2 = null
    @observable photo_link_3 = null
    @observable photo_link_4 = null
    @observable token = null
    @observable email = null
    @observable accessToken = null
    @observable profile_id = null
    @observable prospects = []
    @observable redirect_to = null

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
        console.log(userAuth)
        this.token = userAuth.auth_token
        this.name = userAuth.user_profile.user.full_name
        this.email = true
        this.profilePicture = userAuth.user_profile.profile_image
        this.photo_link_1 = userAuth.user_profile.supporting_pic_1
        this.photo_link_2 = userAuth.user_profile.supporting_pic_2
        this.photo_link_3 = userAuth.user_profile.supporting_pic_3
        this.photo_link_4 = userAuth.user_profile.supporting_pic_4
        this.biography = userAuth.user_profile.bio
        this.radius = userAuth.user_profile.search_radius
        this.preference = userAuth.user_profile.sexual_preference
        this.profile_id = userAuth.user_profile.id
        this.gay = userAuth.user_profile.gay
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
        console.log("IT CHANGED IN USERSTORE")
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
    setPic(pic){
        this.photos[0] = pic;
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
