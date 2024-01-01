import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveFormData } from "../../utils/firebase";
import styles from "../../styles/pages/create.module.css";
import { useNavigate } from "react-router-dom";
import { schema } from "../../utils/schema";
import withTheme from "../../hoc/withTheme";
import Loader from "../../components/loader";

const Create = ({ theme }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await saveFormData(data);
      if (response) {
        setLoading(false);
        navigate(`/basvuru-basarili/${response}`);
      }
    } catch (error) {
      console.error("Veri eklenirken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <div>
          <label htmlFor="isim">İsim</label>
          <Controller
            name="isim"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="isim"
                className={errors.isim ? styles.error : ""}
              />
            )}
          />
          <p>{errors.isim?.message}</p>
        </div>
        <div>
          <label htmlFor="soyisim">Soyad</label>
          <Controller
            name="soyisim"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="soyisim"
                className={errors.soyisim ? styles.error : ""}
              />
            )}
          />
          <p>{errors.soyisim?.message}</p>
        </div>
      </div>
      <div className={styles.formGroup}>
        <div>
          <label htmlFor="yas">Yaş</label>
          <Controller
            name="yas"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 999) {
                    field.onChange(value);
                    field.value = value;
                  }
                }}
                id="yas"
                type="number"
                className={errors.yas ? styles.error : ""}
              />
            )}
          />
          <p>{errors.yas?.message}</p>
        </div>
        <div>
          <label htmlFor="tc">TC Kimlik Numarası</label>
          <Controller
            name="tc"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="tc"
                type="number"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 99999999999) {
                    field.onChange(value);
                    field.value = value;
                  }
                }}
                className={errors.tc ? styles.error : ""}
              />
            )}
          />
          <p>{errors.tc?.message} </p>
        </div>
      </div>

      <div>
        <label htmlFor="neden">Başvuru Nedeni</label>
        <Controller
          name="basvuruNedeni"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="neden"
              className={errors.basvuruNedeni ? styles.error : ""}
            />
          )}
        />
        <p>{errors.basvuruNedeni?.message}</p>
      </div>

      <div>
        <label htmlFor="adres">Adres Bilgisi</label>
        <Controller
          name="adres"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="adres"
              className={errors.adres ? styles.error : ""}
            />
          )}
        />
        <p>{errors.adres?.message}</p>
      </div>

      <div>
        <label htmlFor="files">Fotoğraflar/Ekler</label>
        <input id="files" type="file" {...register("files")} multiple />
      </div>

      <div className={styles.footer}>
        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className={`${styles.submitButton} ${
              theme === "dark" && styles.dark
            }`}
          >
            Gönder
          </button>
        )}
      </div>
    </form>
  );
};

export default withTheme(Create);
