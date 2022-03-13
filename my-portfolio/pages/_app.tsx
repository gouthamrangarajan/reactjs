import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DEFAULT_THEME_CONTEXT, ThemeContext, ThemeReducer, UpdateThemeContext } from '../contexts/ThemeContext'
import { useReducer } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  let [state,dispatch]=useReducer(ThemeReducer,DEFAULT_THEME_CONTEXT);
  return (
    <ThemeContext.Provider value={state}>
      <UpdateThemeContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </UpdateThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
