import './globals.scss'

import { Inter } from 'next/font/google'
import { Providers } from './store/Provider'


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
          {children}
        </Providers>
      </body>
    </html>
  )
}
