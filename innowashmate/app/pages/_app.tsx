import { AppProps } from 'next/app';
import NavBar from '@/components/NavBar/NavBar';
import '@/assets/app.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="layout">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
