export const metadata = {
  title: 'Ray 4.5 Ultimate',
  description: 'AI System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Anti zoom tambahan di tingkat browser */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#131316' }}>
        {children}
      </body>
    </html>
  )
}
