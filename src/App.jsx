import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import JoinUsPage from './pages/JoinUsPage'
import AdminDashboard from './pages/AdminDashboard'

// Dummy pages for now
const Teams = () => <div className="pt-32 min-h-screen text-center"><h1>Teams Page Coming Soon</h1></div>

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} /> {/* Hidden dashboard route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
