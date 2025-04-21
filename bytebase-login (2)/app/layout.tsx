import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ByteBase Login App',
  description: 'ByteBase Login App',
  generator: 'yzt',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
