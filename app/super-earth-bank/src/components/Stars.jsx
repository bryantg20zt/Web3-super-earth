import { IoIosStar } from "react-icons/io";
import Styles from '../styles/Stars.module.css'

export function Stars () {
  return (
    <section className={Styles.container}>
      <IoIosStar className={Styles.star} style={{ fontSize: '0.75rem'}} />
      <IoIosStar className={Styles.star} />
      <IoIosStar className={Styles.star} style={{ fontSize: '1.25rem'}} />
      <IoIosStar className={Styles.star} style={{ fontSize: '1.5rem'}} />
      <IoIosStar className={Styles.star} style={{ fontSize: '1.25rem'}} />
      <IoIosStar className={Styles.star} />
      <IoIosStar className={Styles.star} style={{ fontSize: '0.75rem'}} />
    </section>
  )
}