import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import CarpetList from '../components/CarpetList';
import axios from 'axios';

import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";


export default function Home({carpetList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Indian Carpet Hub </title>
        <meta name="description" content="Best Carpet Seller in the World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />
      {<AddButton setClose={setClose} />}
      <CarpetList carpetList={carpetList}/>
      {!close && <Add setClose={setClose} />}
    
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }


  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props:{
      carpetList: res.data,
      admin,
    }
  }
};