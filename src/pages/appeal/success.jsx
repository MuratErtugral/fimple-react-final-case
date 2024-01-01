// Success.js

import React from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/success.module.css";
import withTheme from "../../hoc/withTheme";
import Result from "../../components/result";

const Success = ({theme}) => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h2 className={styles.message}>
        Başvurunuz Başarıyla Alındı! Teşekkür ederiz😊{" "}
      </h2>
      <p className={styles.details + " " + styles[theme] }>
        Başvuru takip numaranız:
        <strong>{id}</strong>
      </p>

      <Result id={id} />
    </div>
  );
};

export default withTheme(Success);
