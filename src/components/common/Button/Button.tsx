import React from 'react'
import styles from './Button.module.css'
import { Plus } from 'lucide-react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}

const Button:React.FC <ButtonProps> = ({children, ...props}) => {
  return (
    <button className={styles.btn} {...props}>
        <Plus size={18}/>
        {children}
    </button>
  )
}

export default Button