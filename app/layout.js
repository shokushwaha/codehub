import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
  title: "CodeHub",
  description: "Blogging website for Developers"
}
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>

          <Nav />
          <div className='mt-16'>

            {children}
          </div>
        </Provider>
      </body>

    </html>
  )
}

export default Layout