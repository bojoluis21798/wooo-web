
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

    @action
    async authenticateUser(authObj) {
        let response = await axios.post(process.env.REACT_APP_API_BASEURL + 'login/', {
            accessToken: authObj.accessToken
        })
        this.populateUser(response.json())
        return response.auth_token
    }

    @action 
    populateUser(userAuth) {
        this.token = userAuth.token
        this.name = userAuth.name
        this.email = userAuth.email
        this.profilePicture = userAuth.profile_image
    }
}

export default UserStore
