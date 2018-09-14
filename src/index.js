import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import registerServiceWorker from './registerServiceWorker'
import RootStore from './stores/RootStore'
import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import apercufont from './assets/fonts/Apercu'

injectGlobal`
    ${styledNormalize}
    ${apercufont}

    body {
        font-family: 'Apercu';
        margin: 0;
        padding: 0;
    }
`

ReactDOM.render(
    <Provider store={RootStore}>
        <App />
    </Provider>, 
    document.getElementById('root'))
registerServiceWorker()
