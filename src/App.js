import { Router } from 'react-router-dom/cjs/react-router-dom.min';

import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/GlobalStyles';

import history from './services/history';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer autoClose={4000} className="toast-container" />
    </Router>
  );
}

export default App;
