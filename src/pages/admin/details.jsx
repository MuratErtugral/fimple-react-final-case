import React, { useState, useEffect } from "react";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import styles from "../../styles/pages/details.module.css";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";
import { decomposeUrl } from "../../utils/decompeseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withTheme from "../../hoc/withTheme";

const Details = ({ theme }) => {
  const [responseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [responseText, setResponseText] = useState("");
  const { basvuruNo } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBaşvuruBilgileri = async () => {
      try {
        const başvuruRef = doc(collection(firestore, "forms"), basvuruNo);
        const başvuruSnapshot = await getDoc(başvuruRef);

        if (başvuruSnapshot.exists()) {
          setResponseData(başvuruSnapshot.data());
          setSelectedStatus(başvuruSnapshot.data().basvuruDurumu);
        } else {
          setResponseError(
            `${basvuruNo} takip numaralı başvuru bulunamadı. Lütfen takip numaranızı kontrol edin.`
          );
        }
      } catch (error) {
        console.error("Başvuru bilgileri çekilirken bir hata oluştu:", error);
        setResponseError("Başvuru bilgileri çekilirken bir hata oluştu.");
      }
    };

    fetchBaşvuruBilgileri();
  }, [basvuruNo]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleResponseTextChange = (e) => {
    setResponseText(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const başvuruRef = doc(collection(firestore, "forms"), basvuruNo);
      await updateDoc(başvuruRef, {
        basvuruDurumu: selectedStatus,
        basvuruCevabı: responseText,
      });

      setResponseData((prevData) => ({
        ...prevData,
        basvuruDurumu: selectedStatus,
        basvuruCevabı: responseText,
      }));
      toast.success("Başvuru başarıyla değiştirildi", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Başvuru güncellenirken bir hata oluştu:", error);
      console.error("Başvuru güncellenirken bir hata oluştu:", error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {responseData ? (
        <>
          <h2 className={styles.title}>Başvuru Detayı</h2>
          <div className={styles.table}>
            <div className={styles.rowColumn}>
              <span className={styles.label}>Başvuru Durumu:</span>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className={styles.statusDropdown}
              >
                <option value="İncelemede">İncelemede</option>
                <option value="İptal Edildi">İptal Edildi</option>
                <option value="Çözüldü">Çözüldü</option>
                <option value="Bekliyor">Bekliyor</option>
              </select>
            </div>
            <div className={styles.table}>
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
                <div className={styles.attachment}>
                  {responseData.ekler.map((ek, index) => (
                    <a href={ek} key={index} target="_blank" rel="noreferrer" >
                      {decomposeUrl(ek)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.rowColumn}>
              <span className={styles.label}>Başvuru Cevabı:</span>
              {responseData?.basvuruCevabı ? (
                <p>{responseData.basvuruCevabı}</p>
              ) : (
                <textarea
                  value={responseText}
                  onChange={handleResponseTextChange}
                  className={styles.responseTextArea}
                />
              )}
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className={styles.saveButtonRow}>
                <button
                  onClick={handleSave}
                  className={styles.saveButton + " " + styles[theme]}
                >
                  Kaydet
                </button>
              </div>
            )}
          </div>
        </>
      ) : responseError ? (
        <p> {responseError} </p>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withTheme(Details);
