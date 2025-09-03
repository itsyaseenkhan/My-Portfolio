import { Provider } from 'react-redux' // ✅ correct import
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Store } from './Store/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>,
)
