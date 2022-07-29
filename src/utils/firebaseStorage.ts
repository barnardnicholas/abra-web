import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import auth from '../_auth';

// Initialize Firebase
const app = initializeApp(auth.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export async function getURL(url: string, cb: () => void) {
  return getDownloadURL(ref(storage, url)).then(url => {
    // `url` is the download URL for 'images/stars.jpg'
    cb();
    console.log(url);
    return url;
  });
}
