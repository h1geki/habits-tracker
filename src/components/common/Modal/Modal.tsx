import React, { useState, type ChangeEvent } from 'react'
import styles from './Modal.module.css'
import { useModalStore } from '../../../store/useModalStore'
import Select from 'react-select'
import { useHabitStore } from '../../../store/useHabitsStore'

interface RegularityOption {
  value:string,
  label:string
}

const Modal:React.FC = () => {
  const regularityOptions:RegularityOption[] = [
    {value:'today', label:'Сегодня'},
    {value:'everyday', label:'Каждый день'}
  ]
  const {isModal, toggleModal} = useModalStore()
  const {addHabit} = useHabitStore()
  const [selectedOption,setSelectedOption] = useState<RegularityOption | null>(null)
  const [habitTitle,setHabitTitle] = useState<string>('')  
  const [habitDescr,setHabitDescr] = useState<string>('')  
 
  const handleAddBtn = () =>{
    if(!selectedOption || !habitDescr || !habitTitle) return;

  addHabit({
    title: habitTitle,
    description: habitDescr,
    regularity: selectedOption.value,
  })

  setHabitDescr('')
  setHabitTitle('')
  toggleModal()
  }

  return (
    isModal && <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>Добавить привычку</p>
          <label htmlFor="habitName">Название</label>
          <div className={styles.modalContentInputWrapper}>
            <input
              value={habitTitle} 
              onChange={(e:ChangeEvent<HTMLInputElement>) => 
                setHabitTitle(e.target.value)
              } 
              id='habitName' 
              type="text" 
              placeholder='Название привычки'
            />
          </div>
          <label htmlFor="habitDescription">Описание</label>
          <div className={styles.modalContentInputWrapper}>
            <input
              value={habitDescr} 
              onChange={(e:ChangeEvent<HTMLInputElement>) => 
                setHabitDescr(e.target.value)
              }  
              id='habitDescription' 
              type="text" 
              placeholder='Дополнительная информация' />
          </div>
          <span>Переодичность</span>
          <Select<RegularityOption>
            defaultValue={selectedOption}
            options={regularityOptions}
            onChange={setSelectedOption}
            styles={{
              control:(base) => ({
                ...base,
                backgroundColor:'#f3f3f5',
                border:'none',
                fontSize:'12px',
                marginTop:'10px'
              }),
              option:(base) => ({
                ...base,
                fontSize:'12px'
              })
            }}
          
          />
          <div className={styles.modalContentBtns}>
            <button onClick={toggleModal}>Отмена</button>
            <button onClick={handleAddBtn}>Добавить</button>
          </div>
        </div>
    </div>
  )
}

export default Modal