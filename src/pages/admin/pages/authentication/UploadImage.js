/* eslint-disable no-loop-func */
/* eslint-disable default-case */
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import * as post from '~/service/Post';

const HandlePost = async (value, token) => {
   await post
      .postWithBodyAndToken(`${process.env.REACT_APP_BASE_URL}tours/save`, value, token)
      .then((data) => {})
      .catch((error) => console.log(error));
};
const handleSetNumberDay = (date) => {
   const diffTime = Math.abs(date[1] - date[0]);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   return diffDays;
};
const getCookie = (name) => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
};
const firebaseConfig = {
   apiKey: 'AIzaSyDLL1smaRsnEUe6tB8xixAhWI9KTkzLMsw',
   authDomain: 'happytour-39b4c.firebaseapp.com',
   projectId: 'happytour-39b4c',
   storageBucket: 'happytour-39b4c.appspot.com',
   messagingSenderId: '247459977728',
   appId: '1:247459977728:web:2823e07900af09f33a96e5',
   measurementId: 'G-XBLLMQZ1RP',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://happytour-39b4c.appspot.com');
const UploadImage = (listImageMain, object, setReloadDb, reloadDb, setIsShowFormAdd, isShowFormAdd) => {
   let urlListImage = '';
   let count = 0;
   console.log(listImageMain.length);
   for (let index = 0; index < listImageMain.length; index++) {
      const Image = listImageMain[index].originFileObj;
      const storageRef = ref(storage, Image.name);
      const uploadTask = uploadBytesResumable(storageRef, Image);
      uploadTask.on(
         'state_changed',
         (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
                  console.log('Upload is paused');
                  break;
               case 'running':
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {
            // Handle unsuccessful uploads
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               urlListImage += downloadURL;
               count += 1;
               if (count !== listImageMain.length) {
                  urlListImage += ',';
                  console.log(urlListImage);
               } else {
                  urlListImage += '';
                  console.log(urlListImage);
                  object.image = urlListImage;
                  object.tourDetail = {
                     description: object.descriptionTour,
                     transport: object.transport,
                     starHotel: object.starHotel,
                  };
                  object.startDay = object.dateSelected[0].format('YYYY-MM-DD');
                  object.endDay = object.dateSelected[1].format('YYYY-MM-DD');
                  object.departureTime = object.departureTime.format('HH:mm');
                  object.numberOfDay = handleSetNumberDay(object.dateSelected);
                  object.createdBy = 'Bùi Đức Hiếu';

                  object.tourGuideName = [object.tourGuideName];
                  // delete object.tourGuideName;
                  delete object.dateSelected;

                  HandlePost(object, window.localStorage.getItem('token'));
                  setReloadDb(!reloadDb);
                  setIsShowFormAdd(!isShowFormAdd);
               }
            });
         },
         // Handle successful uploads on complete
         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      );
   }

   // })();
};
export { UploadImage };
