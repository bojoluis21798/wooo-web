
import { observable } from 'mobx'

class UserStore {
    
    @observable username = "Recu"
    @observable name = null
    @observable biography = null
    @observable preference = null
    @observable radius = null
    @observable location = null
    @observable state = null
    @observable photos = []
    @observable token = null;

}

export default UserStore
