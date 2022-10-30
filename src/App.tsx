import { Suspense } from "react"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { routes } from '@/routes'
import { IRoute } from './interfaces/routes';
import { Button } from "./components/UI";

function HocAppRoute(route: IRoute) {
  if (route.isUnderConstruction || route.component === null) {
    return (
      <div className="flex justify-center items-center flex-col gap-5 min-h-screen">
        <p>Pagina en construccion 🛠️</p>
        <Link to='/'>
          <Button variant="secondary" className="w-52">Go back</Button>
        </Link>
      </div>
    )
  }
  return <route.component />
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={HocAppRoute(route)} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
