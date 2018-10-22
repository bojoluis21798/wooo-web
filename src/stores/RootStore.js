
import UserStore from './UserStore'

class RootStore {

    constructor() {
        this.userStore = new UserStore()
    }

}

export default new RootStore()
