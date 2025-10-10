import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PagesList from './components/PagesList'
import TestPage from './pages/TestPage'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Med Archive</h1>
          <nav style={{marginTop:8}}>
            <Link to="/">Home</Link>
            {' | '}
            <Link to="/test">Test Page</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PagesList />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
