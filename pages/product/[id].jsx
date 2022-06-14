import React, {useState} from 'react';
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../redux/cartSlice'

const Product = ({carpet}) => {
    const [size, setSize] = useState(0);
    const[price, setPrice] = useState(carpet.prices[0]);
    const[extras, setExtras] = useState([]);
    const[quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    /*
    const carpet = {
      id: 1,
      img: "/img/featured3.png",
      name: "Famous Carpet",
      price: [19.9, 23.9, 27.9],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
    };
    */

    const changePrice = (number) => {
      setPrice(price + number);
    }

    const handleSize = (sizeIndex) => {
      const difference = carpet.prices[sizeIndex] - carpet.prices[size]
      setSize(sizeIndex);
      changePrice(difference)
    }
  const handleChange = (e,option)=>{
    const checked = e.target.checked;

     if(checked){
       changePrice(option.price)
       setExtras((prev)=> [...prev, option])
     }
     else{
       changePrice(-option.price)
       setExtras(extras.filter((extra) => extra._id !== option._id))

     }
  }

  const handleClick = () =>{
    dispatch(addProduct({...carpet, extras, price,quantity}));

  }
  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.imgContainer}>
        <Image src={carpet.img} objectFit="contain" layout="fill" alt="" />
      </div>
    </div>
    <div className={styles.right}>
      <h1 className={styles.title}>{carpet.title}</h1>
      <span className={styles.price}>${price}</span>
      <p className={styles.desc}>{carpet.desc}</p>
      <h3 className={styles.choose}>Choose the size</h3>
      <div className={styles.sizes}>
        <div className={styles.size} onClick={() => handleSize(0)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Small</span>
        </div>
        <div className={styles.size} onClick={() => handleSize(1)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Medium</span>
        </div>
        <div className={styles.size} onClick={() => handleSize(2)}>
          <Image src="/img/size.png" layout="fill" alt="" />
          <span className={styles.number}>Large</span>
        </div>
      </div>
      <h3 className={styles.choose}>Choose additional qualities</h3>
      <div className={styles.ingredients}>
        {carpet.extraOptions.map(option => (
          <div className={styles.option} key={option._id}>
          <input
            type="checkbox"
            id={option.text}
            name={option.text}
            className={styles.checkbox}
            onClick={(e)=>handleChange(e,option)}
          />
          <label htmlFor={option.text}>{option.text}</label>
        </div>


        ))}
        
        
        
      </div>
      <div className={styles.add}>
          <input onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
      </div>
    </div>
  </div>
  )
}

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props:{
      carpet: res.data,
    }
  }
};

export default Product