
import { observable } from 'mobx'

class UserStore {
    
    @observable username = null
    @observable name = null
    @observable biography = null
    @observable preference = null
    @observable radius = null
    @observable location = null
    @observable state = null
    @observable photos = []

}

export default UserStore
