import '../styles/globals.scss'

import { Inter } from 'next/font/google'
import { Providers } from './store/Provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moviemate',
  description: 'Search movies and series',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
