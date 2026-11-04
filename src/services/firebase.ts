import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from '@react-native-firebase/auth';
import {
  collection as firestoreCollection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  type DocumentData,
  type QuerySnapshot,
} from '@react-native-firebase/firestore';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onMessage,
  requestPermission,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import {
  getDownloadURL,
  getStorage,
  putFile,
  ref,
} from '@react-native-firebase/storage';

export const firebaseAuth = () => getAuth();
export const firestoreDb = () => getFirestore();
export const firebaseStorage = () => getStorage();
export const firebaseMessaging = () => getMessaging();

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(firebaseAuth(), email.trim(), password);

export const signOut = () => firebaseSignOut(firebaseAuth());

export const subscribeToAuthState = (
  listener: (user: User | null) => void,
) => onAuthStateChanged(firebaseAuth(), listener);

export const saveDocument = (
  collection: string,
  id: string,
  data: DocumentData,
) => setDoc(doc(firestoreDb(), collection, id), data, { merge: true });

export const listenToCollection = (
  collectionName: string,
  listener: (snapshot: QuerySnapshot) => void,
) => onSnapshot(firestoreCollection(firestoreDb(), collectionName), listener);

export const uploadFile = async (localPath: string, remotePath: string) => {
  const reference = ref(firebaseStorage(), remotePath);
  await putFile(reference, localPath);
  return getDownloadURL(reference);
};

export const requestNotificationAccess = async () => {
  const status = await requestPermission(firebaseMessaging());
  const enabled =
    status === AuthorizationStatus.AUTHORIZED ||
    status === AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  return getToken(firebaseMessaging());
};

export const subscribeToMessages = (
  listener: (message: RemoteMessage) => void,
) => onMessage(firebaseMessaging(), listener);
