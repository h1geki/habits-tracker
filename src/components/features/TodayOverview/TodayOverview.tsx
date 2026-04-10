import React, { useEffect, useState } from 'react'
import styles from './TodayOverview.module.css'
import type { Habit } from '../../../types/Habit'
import CiracleDiagram from '../CircleDiagram/CiracleDiagram'
import { useHabitStore } from '../../../store/useHabitsStore'

interface TodayOverviewProps{
    habits:Habit[]
}

const TodayOverview:React.FC <TodayOverviewProps> = ({habits}) => {
  
  const {totalComplete, totalCount} = useHabitStore()

  const [percentage, setPercentage] = useState<number>(0)

  const getPercentages = () => {
    if(totalCount === 0){
        setPercentage(0)
    }

    setPercentage(Math.floor((totalComplete/totalCount) * 100))
  }

  useEffect(() => {
    getPercentages()
  },[totalCount,totalComplete])
  
  
  return (
    habits.length ?
    <section className={styles.todayOverview}> 
       <CiracleDiagram totalComplete={totalComplete} totalHabits={habits.length} percentage={percentage}/>
       <div className={styles.todayOverviewHabitsTitleContainer}>
            {
                habits.map((habit:Habit) => (
                    <span className={`${habit.complete ? styles.todayOverviewHabitsTitleComplete : styles.todayOverviewHabitsTitle}`}  key={habit.id}>{habit.title}</span>
                ))
            }
        </div> 
    </section> :
    <div className={styles.todayOverviewMessage}>
        <p>На сегодня привычек нет. Добавьте новую привычку!</p>
    </div> 
  )
}

export default TodayOverview