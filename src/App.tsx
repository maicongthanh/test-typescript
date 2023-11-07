import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultLayout from './Layout/DefaultLayout'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {routes.map((route: any, index) => {
            const Layout = route.layout || DefaultLayout
            const Page = route.component
            return <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          })}
        </Routes>
      </div>
    </Router>
  )
}
export default App
