export const metadata = {
  title: 'Claude Devil',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        backgroundColor: '#000' 
      }}>
        {children}
      </body>
    </html>
  )
}
