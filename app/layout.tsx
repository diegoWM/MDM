import './globals.css'

export const metadata = {
  title: 'Weed Me - MDM',
  description: 'Master Data Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}