
import * as yup from "yup";

// cretae sayfası için şema
export const schema = yup.object().shape({
    isim: yup.string().required("İsim alanı zorunludur"),
    soyisim: yup.string().required("Soyisim alanı zorunludur"),
    yas: yup
      .number()
      .positive("Yaş pozitif bir sayı olmalıdır")
      .integer("Yaş tam sayı olmalıdır")
      .required("Yaş zorunludur"),
    tc: yup
      .string()
      .length(11, "TC no 11 haneli olmalı")
      .required("TC no zorunludur"),
    basvuruNedeni: yup.string().required("Başvuru nedeni zorunludur"),
    adres: yup.string().required("Adres bilgisi zorunludur"),
    files: yup.mixed()
  });