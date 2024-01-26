// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBmvQLQ1bYrkPlQaFJy5b9eKL24PT5tvHg',
    authDomain: 'book-store-cf7bd.firebaseapp.com',
    projectId: 'book-store-cf7bd',
    storageBucket: 'book-store-cf7bd.appspot.com',
    messagingSenderId: '275660379222',
    appId: '1:275660379222:web:4cb8071a9bfd25431017f7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
