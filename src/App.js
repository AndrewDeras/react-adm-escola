import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyles from './styles/GlobalStyles';
import history from './services/history';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={4000} className="toast-container" />
      </Router>
    </Provider>
  );
}

export default App;
