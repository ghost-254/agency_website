// _app.js (or _app.tsx if using TypeScript)
import { AppProps } from 'next/app';
import { AuthProvider } from './context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }

export default MyApp;
