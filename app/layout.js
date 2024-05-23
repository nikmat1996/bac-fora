import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { twMerge } from 'tailwind-merge'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Build a Champ',
  description:
    'Empower young athletes with our premier digital platform. From beginners to seasoned players, find all you need to succeed. Elevate their game now!'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' >
      <head >
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      </head>
      <body className={twMerge(poppins.className, "bg-black")}>
        
        {children}
        <Toaster />
      </body>
    </html>
  )
}
