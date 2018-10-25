
import UserStore from './UserStore'
import AppStore from './AppStore'

class RootStore {

    constructor() {
        this.appStore = new AppStore()
        this.userStore = new UserStore()
    }

}

export default new RootStore()
