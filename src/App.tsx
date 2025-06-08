import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2E7D32',
          },
        }}
      >
        <Router>
          <AppRoutes />
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
