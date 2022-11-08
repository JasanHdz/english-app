import { Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { routes } from '@/routes'
import { IRoute } from './interfaces/routes';
import { NotFound } from "./pages/NotFound";
import { LearnPaths } from './routes/paths/index';
import { Layout } from "./components/Layout/Layout";

function HocAppRoute(route: IRoute) {
  if (route.isUnderConstruction || route.component === null) {
    return <NotFound />
  }
  return (
    <Layout type={route.layout ?? 'APP'}>
      <route.component />
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path='/' element={<Navigate to={LearnPaths.HOME} />} />
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={HocAppRoute(route)} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
