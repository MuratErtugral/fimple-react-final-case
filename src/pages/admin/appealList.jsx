import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { firestore } from "../../utils/firebase";
import styles from "../../styles/pages/appealList.module.css";
import Loader from "../../components/loader";
import withTheme from "../../hoc/withTheme";

const fetchAppealsByStatus = async (status) => {
  try {
    const appealsRef = collection(firestore, "forms");

    // Duruma göre sorguyu filtrele
    let q;
    if (status === "Tümü") {
      q = query(appealsRef);
    } else {
      q = query(appealsRef, where("basvuruDurumu", "==", status));
    }

    const querySnapshot = await getDocs(q);

    const filteredAppeals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return filteredAppeals;
  } catch (error) {
    console.error("Başvuruları çekerken bir hata oluştu:", error);
    throw error;
  }
};

const PendingAppealsList = ({ theme }) => {
  const [selectedStatus, setSelectedStatus] = useState("İncelemede");
  const { data: appeals, refetch } = useQuery(["appeals", selectedStatus], () =>
    fetchAppealsByStatus(selectedStatus)
  );

  useEffect(() => {
    refetch();
  }, [selectedStatus, refetch]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Bekleyen Başvurular</h2>

      {appeals ? (
        <table>
          <thead>
            <tr>
              <th>İsim</th>
              <th>Soyisim</th>
              <th>Başvuru Tarihi</th>
              <th>
                <select value={selectedStatus} onChange={handleStatusChange}>
                  <option value="Tümü">Tümü</option>
                  <option value="İncelemede">İncelemede</option>
                  <option value="İptal Edildi">İptal Edildi</option>
                  <option value="Çözüldü">Çözüldü</option>
                  <option value="Bekliyor">Bekliyor</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {appeals.map((appeal) => (
              <tr key={appeal.id}>
                <td>{appeal.isim}</td>
                <td>{appeal.soyisim}</td>
                <td>{appeal.basvuruTarihi.toDate().toLocaleString()}</td>
                <td>
                  <Link
                    to={`/admin/basvuru/${appeal.id}`}
                    className={styles.linkButton + " " + styles[theme]}
                  >
                    Görüntüle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withTheme(PendingAppealsList);
