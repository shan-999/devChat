import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>

      <PersistGate loading={false} persistor={persistor}>

        <App />
        
      </PersistGate>

    </Provider>

  </StrictMode>,
)
