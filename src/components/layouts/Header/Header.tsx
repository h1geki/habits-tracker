import React from 'react'
import { Target } from 'lucide-react'
import styles from './Header.module.css'
import Button from '../../common/Button/Button'
import { useModalStore } from '../../../store/useModalStore'


const Header:React.FC = () => {
  const {toggleModal} = useModalStore()
  return (
    <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTitleBox}>
            <div className={styles.headerIcon}>
              <Target/>
            </div>
            <div>
              <h1>Трекер привычек</h1>
              <p>Формируйте полезные привычки каждый день</p>
            </div>
          </div>
            <Button onClick={toggleModal}>Новая привычка</Button>
        </div>
      </header>
  )
}

export default Header