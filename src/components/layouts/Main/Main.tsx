import React, { useEffect } from 'react'
import styles from './Main.module.css'
import TodayOverview from '../../features/TodayOverview/TodayOverview'
import HabitsContainer from '../../features/HabitsContainer/HabitsContainer'
import { useHabitStore } from '../../../store/useHabitsStore'
const Main:React.FC = () => {
  const {habits, getHabits} = useHabitStore();
  
  useEffect(() => {
    getHabits()
  },[])
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <TodayOverview habits={habits}/>
        <HabitsContainer habits={habits}/>
      </div>
    </main>
  )
}

export default Main