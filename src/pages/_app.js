import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SpinnerState from '@/context/spinnerstate';
import WeatherState from '@/context/weatherstate';

export default function App({ Component, pageProps }) {

  return (
    <>
      <WeatherState>
        <SpinnerState>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </SpinnerState>
      </WeatherState>
    </>
  )
}
