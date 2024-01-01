// BasvuruSorgula.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/search.module.css';
import withTheme from '../../hoc/withTheme';

const Search = ({ theme }) => {
  const [basvuruNo, setBasvuruNo] = useState('');
  const navigate = useNavigate();

  const handleSorgula = () => {
    if (basvuruNo.trim() !== '') {
      navigate(`/basvuru/${basvuruNo}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSorgula();
    }
  };

  return (
    <div className={`${styles.sorgulaContainer} ${styles[theme]}`}>
      <h2>Başvuru Sorgula</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Başvuru Takip Numarası"
          value={basvuruNo}
          onChange={(e) => setBasvuruNo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={()=> handleSorgula()} className={`${styles.searchButton} ${styles[theme]}`}>Sorgula</button>
      </div>
    </div>
  );
};

export default withTheme(Search);
