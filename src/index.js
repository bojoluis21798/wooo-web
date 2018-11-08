import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
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

console.log = function() {}
console.warn = function() {}
console.error = function() {}
console.info = function() {}
console.disableYellowBox = true; 
console.ignoredYellowBox = ['Warning:', 'Mobx observer:'];

ReactDOM.render(<Provider store={RootStore}>
        <App />
    </Provider>, 
    document.getElementById('root'))
registerServiceWorker()
