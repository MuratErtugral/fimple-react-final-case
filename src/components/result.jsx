// BaşvuruDurumu.js

import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import styles from "../styles/components/result.module.css";
import { decomposeUrl } from "../utils/decompeseUrl";
import Loader from "./loader";
import { Link } from "react-router-dom";
import withTheme from "../hoc/withTheme";

const Result = ({ id,theme }) => {
  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(false);


  useEffect(() => {
    const fetchBaşvuruBilgileri = async () => {
      try {
        // Firestore'dan belirli bir belgeyi çekme
        const başvuruRef = doc(collection(firestore, "forms"), id);
        const başvuruSnapshot = await getDoc(başvuruRef);

        if (başvuruSnapshot.exists()) {
          // Belge varsa, başvuru bilgilerini state'e kaydetme
          setResponseData(başvuruSnapshot.data());
        } else {
          setResponseError(`${id} takip numaralı başvuru bulunamadı. Lütfen takip numaranızı kontrol edin.`);
        }
      } catch (error) {
        console.error("Başvuru bilgileri çekilirken bir hata oluştu:", error);
        setResponseError("Başvuru bilgileri çekilirken bir hata oluştu.");
      }
    };

    fetchBaşvuruBilgileri();
  }, [id]);


  return (
    <div className={styles.container}>
      {responseData ? (
        <>
          <h2 className={styles.title}>Başvuru Detayı</h2>
          <div className={styles.table}>
          <div className={styles.row}>
              <span className={styles.label}>Başvuru Durumu:</span>
              <span className={styles.status}>
                {responseData.basvuruDurumu}
              </span>
            </div>
           {responseData?.basvuruCevabı && <div className={styles.row}>
              <span className={styles.label}>Yanıt:</span>
              <span>
                 {responseData.basvuruCevabı}
              </span>
            </div>}
            <div className={styles.row}>
              <span className={styles.label}>Adı Soyadı:</span>
              <span>
                {responseData.isim} {responseData.soyisim}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>TC Kimlik Numarası:</span>
              <span>
                {responseData.tc.substring(0, 3) +
                  "*".repeat(responseData.tc.length - 6) +
                  responseData.tc.slice(-3)}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Yaş:</span>
              <span>{responseData.yas}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Adres:</span>
              <span>{responseData.adres}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Başvuru Nedeni:</span>
              <span>{responseData.basvuruNedeni}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Ekler:</span>
              <div className={styles.attachment} >
                { responseData?.ekler.length > 0 ? responseData.ekler.map((ek, index) => (
                  <a href={ek} key={index} target="_blank" rel="noreferrer" >{decomposeUrl(ek)}</a>
                )) : <span>-</span>}
                </div>
            </div>
           
          </div>
        </>
      ) : responseError ?  <><p> {responseError} </p> <div className={styles.buttonContainer + " " + styles[theme] } > <Link to={"/basvuru-sorgula"}>Tekrar Sorgula</Link></div>   </> : (
        <Loader />
      )}
    </div>
  );
};

export default withTheme(Result);
