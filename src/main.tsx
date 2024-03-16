import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './state/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  // </React.StrictMode>,
)
