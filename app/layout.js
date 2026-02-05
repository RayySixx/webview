export const metadata = {
  title: 'Ray 4.5 Ultimate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#131316' }}>{children}</body>
    </html>
  )
}
