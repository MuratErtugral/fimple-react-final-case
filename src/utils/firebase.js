// firebase.js

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL:
    "https://helpdeskmanagement-ddd0a-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const storage = getStorage(app);

export const uploadFileToFirestore = async (file) => {
  // Dosyanın yükleneceği konumu belirleme
  const storageRef = ref(storage, "dosyalar/" + file.name);

  // Dosyayı Storage'a yükleme
  await uploadBytes(storageRef, file);

  // Dosyanın URL'sini alma
  const downloadURL = await getDownloadURL(storageRef);


  return downloadURL;
};

export const saveFormData = async (data) => {
  const formsCollection = collection(firestore, "forms");

  const { files, ...formData } = data;


  // Form verilerini Firestore'e ekliyoruz
  // Basvuru durumu başlangıç olarak incelemede aldık ve tarih bilgisi firestore oluşturmuyor ekliyoruz
  const docRef = await addDoc(formsCollection, { ...formData, basvuruDurumu: "İncelemede" , basvuruTarihi: serverTimestamp() });

  // Dosyaları Firestore belgesine ekleyin
  const ekler = [];
  if (files) {
    for (const file of files) {
      const downloadURL = await uploadFileToFirestore(file);
      ekler.push(downloadURL);
    }
  }

  // Firestore belgesini güncelleme 
  await updateDoc(doc(formsCollection, docRef.id), { ekler });

  return docRef.id;
};

const auth = getAuth();



// Kullanıcı girişi
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user =userCredential.user;
     const response = {"status": true, token: user.accessToken, user: user};
    
   return response;
  } catch (error) {
    const response = {"status": false, message: error.message};
    return response;
  }
};
