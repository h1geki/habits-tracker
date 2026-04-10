import React, { useEffect, useState } from 'react'
import styles from './HabitCard.module.css'
import type { Habit } from '../../../types/Habit'
import {Trash } from 'lucide-react'
import { useHabitStore } from '../../../store/useHabitsStore'
interface HabitCardProps{
    habit:Habit
}

const HabitCard:React.FC<HabitCardProps> = ({habit}) => {
  const { toggleComplete, deleteHabit } = useHabitStore()
  const [daysComplete, setDaysComplete] = useState(0)

  const today = new Date().toISOString().split('T')[0]
  const isTodayCompleted = habit.completedDates.includes(today)

  // Подсчёт выполненных уникальных дней за последние 30 дней
  useEffect(() => {
    if (habit.regularity !== 'everyday') return

    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 29) // включая сегодня = 30 дней

    const completed = habit.completedDates.filter(dateStr => {
      const date = new Date(dateStr)
      date.setHours(0, 0, 0, 0)
      return date >= thirtyDaysAgo && date <= now
    })

    setDaysComplete(completed.length)
  }, [habit.completedDates, habit.regularity])

  const percentage = Math.min((daysComplete / 30) * 100, 100)

  return (
    <div className={styles.habitCard}>
      <div
        onClick={() => toggleComplete(habit.id)}
        className={`${styles.habitCardCheckbox} ${isTodayCompleted ? styles.habitCardCheckboxChecked : ''}`}
      >
        {isTodayCompleted && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <div className={styles.habitCardInfo}>
        <div>
          <h2 className={`${habit.complete && styles.completeHabit}`}>{habit.title}</h2>
          <p>{habit.description}</p>
          <p>{habit.regularity === 'today' ? 'сегодня': 'каждый день'}</p>
          {
            habit.regularity === 'everyday' && <span>Прогресс (30 дней)</span>
          }
          {
            habit.regularity === 'everyday'
            && <div className={styles.progress}>
                <div className={styles.progressDone} style={{width:`${percentage}%`}}></div>
              </div>
          }
        </div>
        <div className={styles.habitCardInfoIcons}>
          <Trash className={styles.habitCardInfoIcon} size={25} color='red' onClick={() => deleteHabit(habit.id)}/>
        </div>
      </div>

    </div>
  )
}

export default HabitCard