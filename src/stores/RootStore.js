
import UserStore from './UserStore'
import AppStore from './AppStore'
import MessageStore from './MessageStore'

class RootStore {

    constructor() {
        this.appStore = new AppStore()
        this.userStore = new UserStore()
        this.messageStore = new MessageStore()
    }

}

export default new RootStore()
