import React from 'react'
import styles from './HabitsContainer.module.css'
import { Target } from 'lucide-react'
import Button from '../../common/Button/Button'
import type { Habit } from '../../../types/Habit'
import HabitCard from '../HabitCard/HabitCard'
import { useModalStore } from '../../../store/useModalStore'

interface HabitsContainerProps {
    habits:Habit[]
}

const HabitsContainer:React.FC <HabitsContainerProps> = ({habits}) => {
  const {toggleModal} = useModalStore()

  return (
    habits.length ? 
    <section className={styles.HabitsContainer}>
        {
            <div>
                {
                    habits.map((habit:Habit) => (
                        <HabitCard key={habit.id} habit={habit}/>
                    ))
                }    
            </div> 
        }
        
    </section> :
    <div className={styles.HabitsContainerMessage}>
        <div className={styles.HabitsContainerMessageIcon}>
            <Target color='gray' size={30}/>
        </div>
        <h2>На сегодня привычек нет</h2>
        <p>Добавьте новую привычку, чтобы начать отслеживать прогресс</p>
        <Button onClick={toggleModal}>Новая привычка</Button>
    </div>
  )
}

export default HabitsContainer