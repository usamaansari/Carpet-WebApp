import React from 'react'
import styles from "../styles/CarpetCard.module.css";
import Image from "next/image";
import Link from 'next/link';


const CarpetCard = ({carpet}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${carpet._id}`} passHref>
        <Image src={carpet.img} alt="" width="200px" height="200px"/>
        </Link>
        <h1 className={styles.title}>{carpet.title}</h1>
        <span className={styles.price}>${carpet.prices[0]}</span>
        <p className={styles.desc}>{carpet.desc}</p>
        
    </div>
  )
}

export default CarpetCard