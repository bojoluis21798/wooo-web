import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import registerServiceWorker from './registerServiceWorker'
import RootStore from './stores/RootStore'
import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import globalStyling from './assets/styles/main'
import { configure } from 'mobx'

configure({ enforceActions: 'observed' })

injectGlobal`
    ${styledNormalize}
    ${globalStyling}
`

ReactDOM.render(
    <Provider store={RootStore}>
        <App />
    </Provider>, 
    document.getElementById('root'))
registerServiceWorker()
