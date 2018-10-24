
import { observable, action } from 'mobx'

class UserStore {
    @observable loading = null

    @action
    startLoading() { 
        this.loading = true
    }

    @action
    doneLoading() { 
        this.loading = null
    }
}

export default UserStore
