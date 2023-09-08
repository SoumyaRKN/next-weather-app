import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WeatherState from '@/context/weatherstate';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <WeatherState>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </WeatherState>
    </>
  )
}
