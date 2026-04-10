import React from 'react'
import styles from './CircleDiagram.module.css'


interface CiracleDiagramProps{
    totalComplete:number,
    percentage:number,
    totalHabits:number
}

const CiracleDiagram:React.FC<CiracleDiagramProps> = ({totalComplete, percentage,totalHabits}) => {
  

  const getCircleStye = () =>{
    if(percentage === 0){
        return styles.emptyCircle
    }
    if(percentage <= 50 ){
        return styles.halfCircle
    }
    else{
        return styles.fullCircle
    }
  }
  return (
    <div className={styles.circle}
        style={{
                background: `conic-gradient(${percentage <= 50 ? '#f59e0b' :'#10b981'}   ${percentage}%, #e6e6e6 0)`,
                
        }}
    >
        <div className={styles.circleInner}>
            <h2 className={getCircleStye()}>{percentage}%</h2>
            <span>{totalComplete} из {totalHabits}</span>
        </div>
    </div>
  )
}

export default CiracleDiagram