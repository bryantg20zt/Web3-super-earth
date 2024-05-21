import { useEffect, useState } from 'react';
import { Total } from './Total'
import { ProgressBar } from '@tremor/react';
import { IoPlanetOutline } from "react-icons/io5";
import Styles from '../styles/TotalRefounded.module.css'
import toast from 'react-hot-toast';



async function getBalance (setValue, setRefresh) {
  const response = await fetch('http://localhost:8000/donation/balance')
  const value = await response.json()
  setValue(value.balance / 1e18)
  setRefresh(false)
}

export function Collected ({refresh, setRefresh}) {
  const [bank, setBank] = useState(0)
  const [name, setName] = useState('')

  async function haandleRegister () {
    const user = await fetch('http://localhost:8000/user/0x9f1d27b365F6379DB754bAe9d9747a76A99115C3')
    const responseUser = await user.json()
    console.log(responseUser)
    if (name && !responseUser.name) {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
      })
      response.ok ? toast.success('Soldier Registry!') : toast.error("Error! Help us")
    } else {
      toast.error('Usuario ya inscrito')
    }
  }

  useEffect(() => {
    if(refresh) {
      getBalance(setBank, setRefresh)
    }
  },[refresh, setRefresh])
  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <p className={Styles.title}>GALACTIC WAR</p>
      </header>
      <div className={Styles.content}>
        <section className={Styles.containerEth}>
          <p>Total recaudado</p>
          <ProgressBar value={bank} color='yellow' />
          <Total bank={bank} />
          <div className={Styles.containerPlanet}>
            <IoPlanetOutline style={{ fontSize: '5rem'}} />
            <ProgressBar value={bank * 1000} color='yellow' />
            <p>Planeta liberado</p>
            <span>{bank * 1000}%</span>
          </div>
        </section>
        <footer style={{ width: '100%'}}>
          <div className={Styles.header}>
            <p className={Styles.footerTitle}>VIEW LIBERATION ON <span style={{color: 'red'}}>LIVE</span></p>
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px'}}>
            <label>Inscribir soldado</label>
            <input type='text' className={Styles.input} onChange={(e) => setName(e.currentTarget.value)} />
            <button className={Styles.buttonRegister} onClick={haandleRegister}>Registrar</button>
          </div>
        </footer>
      </div>
    </section>
  )
}