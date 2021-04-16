import axios from 'axios'

import '../styles/globals.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = API_URL

  return <Component {...pageProps} />
}

export default MyApp
