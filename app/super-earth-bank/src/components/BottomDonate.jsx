import { Stars } from '../components/Stars';
import wings from '../assets/Wing.svg';
import Styles from '../styles/BottomDonate.module.css';
import toast from 'react-hot-toast';

export function BottomDonate({updateEth}) {
  async function SendDonate() {
    const handleSendingETH = async () => {
      const response = await fetch('http://localhost:8000/donate', {
        method: 'POST'
      });
      const donationResponse = await response.json();
      if (response.ok) {
        updateEth(true)
        return donationResponse;
      } else {
        throw new Error('ERROR!, AUTAMATAS ATACK IN PROGRESS');
      }
    };
  
    toast.promise(
      handleSendingETH(), // Ejecuta la función para obtener la promesa
      {
        loading: 'Sending your donation...',
        success: 'Donation success! Thank you, citizen',
        error: 'We are under attack, try later!'
      }
    );
  }
  return (
    <section className={Styles.container}>
      <div className={Styles.containerTitle}>
        <img src={wings} className={Styles.wing} alt="Wings" />
        <p className={Styles.title}>{`BECOME GALAXY'S ELITE`}</p>
        <img src={wings} className={Styles.wingright} alt="Wings" />
      </div>
      <Stars />
      <button className={Styles.button} onClick={SendDonate}>DONATE NOW</button>
      <span className={Styles.donation}>You will donate 0.001 eth</span>
    </section>
  );
}
