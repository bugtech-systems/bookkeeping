import ReactDOM from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.css';
import App from './App.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <BrowserRouter
        //  history={history}
    >
  <SidebarProvider>
    <App />
  </SidebarProvider>
  </BrowserRouter>
  </Provider>

)
