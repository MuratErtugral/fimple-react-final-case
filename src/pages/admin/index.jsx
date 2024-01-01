import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import styles from "../../styles/pages/admin.module.css";
import withTheme from "../../hoc/withTheme";
import { signIn } from "../../utils/firebase";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { useAuth } from "../../context/UserContext";

const Admin = ({ theme }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const changePassword = watch("password");
  const changeEmail = watch("email");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const email = data.email + "@gmail.com";
      const res = await signIn(email, data.password);
      if (res.token) {
        setIsAuthenticated(true);
        localStorage.setItem("userAccessToken", res.token);
        Navigate("/admin/basvuru-listesi");
      }
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error.message);
      setError("login", {
        type: "manual",
        message: "Kullanıcı adı veya şifre hatalı",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manuel yükselttiğimiz hata mesajını temizlemek için useEffect kullanıyoruz
  useEffect(() => {
    if (errors.login) {
      clearErrors("login");
    }
  }, [changePassword, changeEmail]);

  return (
    <div className={`${styles.loginContainer} ${styles[theme]}`}>
      <h2>Admin Girişi</h2>
      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Kullanıcı Adı"
          {...register("email", { required: "Kullanıcı adı zorunludur" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            {...register("password", { required: "Şifre zorunludur" })}
          />
          {showPassword ? (
            <AiOutlineEyeInvisible onClick={() => setShowPassword(false)} />
          ) : (
            <AiOutlineEye onClick={() => setShowPassword(true)} />
          )}
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        {errors.login && <p>{errors.login.message}</p>}
        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className={`${styles.loginButton} ${styles[theme]}`}
          >
            Giriş Yap
          </button>
        )}
      </form>
    </div>
  );
};

export default withTheme(Admin);
