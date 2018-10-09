
import { observable, action } from 'mobx'
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
    @observable profile_id = null;

    @action
    async authenticateUser(authObj) {
        try {
            let response = await axios.post(process.env.REACT_APP_API_BASEURL + 'login/', {
                accessToken: authObj.accessToken
            })

            this.accessToken = authObj.accessToken;
            
            console.log(response);
            this.populateUser(response.data)
            return true
        } catch(err) {
            return false
        }
        
    }

    @action 
    populateUser(userAuth) {
        this.token = userAuth.auth_token
        this.name = userAuth.name
        this.email = "true"
        this.profilePicture = userAuth.profile_image
        this.profile_id = userAuth.profile_id
    }
}

export default UserStore
