
import { observable, action } from 'mobx'

class MessageStore {
    @observable currentThread = null
    @observable pairName = null
    @observable pairImage = null
    @observable pairSlug = null
    @observable threadPageState = {}

    @action
    setCurrentThread(thread) { 
        this.currentThread = thread
    }

    @action
    setPairName(name) {
        this.pairName = name
    }

    @action
    setPairImage(image) {
        this.pairImage = image
    }

    @action
    setPairSlug(slug) {
        this.pairSlug = slug
    }

    @action
    setThreadPageState(state) {
        this.threadPageState = state
    }
}

export default MessageStore
