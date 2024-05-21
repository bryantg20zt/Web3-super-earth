import { TbBrandPlanetscale } from "react-icons/tb";
import Styles from '../styles/Glory.module.css'
import toast from "react-hot-toast";
export function GloryEarth () {
  async function handleGetRewards () {
    const response = await fetch('http://localhost:8000/claim', {method: 'POST'})
    if (response.ok) {
      toast.success('Recompensa recibida')
    } else {
      toast.error('Ya has obtenido tu recompensa')
    }
  }
  const description = 'Medals are earned by completing mission objectives. Higher difficulty levels reward the squad with more medals. Helldivers must kill enemies as a part of completing mission objectives. Helldivers must be extracted at the end of a mission.'
  return (
    <section className={Styles.container}>
      <TbBrandPlanetscale style={{ fontSize: '6rem', color: 'white'}} />
      <div>
        <p className={Styles.title}>GLORY FOR <span className={Styles.titlePrimary}>SUPER EARTH</span></p>
        <p className={Styles.description}>{description}</p>
      </div>
      <button onClick={handleGetRewards} className={Styles.button}>Reclaim Rewards</button>
    </section>
  )
}