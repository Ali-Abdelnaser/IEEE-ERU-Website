import Hero from '../components/Hero'
import About from '../components/About'
import Officers from '../components/Officers'
import Counselor from '../components/Counselor'
import Committees from '../components/Committees'
import BestMembers from '../components/BestMembers'
import Partners from '../components/Partners'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="page-home overflow-x-hidden">
      <Hero />
      <About />
      <Committees />
      <BestMembers />
      <Counselor />
      <Officers />
      <Partners />
    </div>
  )
}

export default Home
