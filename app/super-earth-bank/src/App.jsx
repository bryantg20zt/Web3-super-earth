import { useState } from 'react'
import { Nav } from './components/nav'
import { BottomDonate } from './components/BottomDonate'
import { GloryEarth } from './components/GloryEarth'
import { Collected } from './components/TotalRefounded'
import Styles from './styles/main.module.css'

export function App() {
  const [refreshEth, setRefreshEth] = useState(true)
  return (
    <main className={Styles.container}>
      <Nav />
      <h1 className={Styles.title}>HELLDIVERS</h1>
      <section className={Styles.content}>
        <GloryEarth />
        <BottomDonate updateEth={setRefreshEth}/>
        <Collected refresh={refreshEth} setRefresh={setRefreshEth} />
      </section>
    </main>
  )
}