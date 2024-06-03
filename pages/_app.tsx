import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import GlobalStyle from '../styles/global';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
