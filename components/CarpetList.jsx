import React from 'react'
import styles from "../styles/CarpetList.module.css";
import CarpetCard from './CarpetCard';

const CarpetList = ({carpetList}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>The Best Carpet in the World</h1>
        <p className={styles.desc}>
        Carpet brings a sense of comfort and warmth to any room.
        Take your shoes off and stay awhile. A popular option
        for those who prefer softness and style.
        </p>
        <div className={styles.wrapper}>
          {carpetList.map(carpet => (
             <CarpetCard key={carpet._id} carpet={carpet}/>
          )
          
          )}
           
        </div>
      
    </div>
  )
}

export default CarpetList