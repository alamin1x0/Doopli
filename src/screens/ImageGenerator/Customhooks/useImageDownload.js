import {PermissionsAndroid, Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const useImageDownload = () => {
    const {colors}=useTheme();
    const {t:trans}=useTranslation();
    const checkPermission = async (url) => {
        if (Platform.OS === 'ios') {
          downloadImage(url);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              downloadImage(url);
            } else {
              handleToaster('Storage Permission Not Granted','warning',colors);
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
    
      const downloadImage = (url) => {
        let date = new Date(); 
        let ext = getExtention(url);
        ext = '.' + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', url)
          .then(res => {
            handleToaster(trans('Image Downloaded Successfully.'),'success',colors);
          })
          .catch(err => {
            handleToaster(trans('There is something wrong'),'success',colors);
          });
      };
    
      const getExtention = filename => {
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };
      return [checkPermission];
}

export default useImageDownload