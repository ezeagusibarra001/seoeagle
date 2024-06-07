import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiGWkvaNxVexl-rzMUAOSu7OrW0P39JVc",
  authDomain: "seoeagle-ia.firebaseapp.com",
  projectId: "seoeagle-ia",
  storageBucket: "seoeagle-ia.appspot.com",
  messagingSenderId: "967423638306",
  appId: "1:967423638306:web:ca56ace329ab80c05fc37b",
  measurementId: "G-PDSZDPZK3K",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addData = async (col: string, data: any) => {
  const docRef = await addDoc(collection(db, col), data);
  return docRef.id;
};
export const updateByColAndId = async (col: string, id: string, data: any) => {
  const docRef = doc(db, col, id);
  await updateDoc(docRef, data);
};

export const addMultipleDocumentsByCol = async (col: string, data: any[]) => {
  try {
    const batch = writeBatch(db);
    const collectionRef = collection(db, col);

    // Add each document to the batch
    for (let index = 0; index < data.length; index++) {
      const docData = data[index];
      const newDocRef = await addDoc(collectionRef, docData);
      // Add the operation to the batch
      batch.set(newDocRef, docData);
    }
    await batch.commit();
  } catch (error) {
    throw new Error("Error al agregar batch");
  }
};

export const getByColAndFilter = async (
  col: string,
  key: string,
  value: string
) => {
  const q = query(collection(db, col), where(key, "==", value));
  const querySnapshot = await getDocs(q);
  // Check if any documents were found
  if (querySnapshot.empty) {
    return []; // Return an empty array if no documents match
  }

  // Create an array to store the documents
  const documents: any[] = [];

  // Loop through each document in the snapshot and add data with ID
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });

  return documents;
};

export default { app };
