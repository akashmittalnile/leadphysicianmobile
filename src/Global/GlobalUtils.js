import RNFetchBlob from 'rn-fetch-blob';
import React, { useEffect, useRef, useState } from 'react';

import {
    PermissionsAndroid,
    Platform
} from 'react-native';

import Toast from 'react-native-toast-message';

class GlobalUtils {
    

    static async  downloadPDF(link, title, callback=()=>{}) {
        console.log('my link in itke for the certificate-->>', link, title);
        // const androidExternalStoragePermission = null;

        if (Platform.OS == 'android') {
            // androidExternalStoragePermission = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            // );

            if (await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ) != "granted") {
                Toast.show({ text1: "Android Permission Required!" });
                return;
            }
        }

        // if (androidExternalStoragePermission === "granted") {
        console.log('downloadCertificate', link);
        let pdfUrl = link;
        let DownloadDir =
            Platform.OS == 'ios'
                ? RNFetchBlob.fs.dirs.DocumentDir
                : RNFetchBlob.fs.dirs.DownloadDir;
        const { dirs } = RNFetchBlob.fs;
        const dirToSave =
            Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${title}`,
            path: `${dirToSave}.pdf`,
        };
        console.log('here');
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: configfb,
        });
        console.log('here2');
        Platform.OS == 'android'
            ? RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: `${DownloadDir}/.pdf`,
                    description: 'LeadPhysician',
                    title: `${title} course certificate.pdf`,
                    mime: 'application/pdf',
                    mediaScannable: true,
                },

            })
                .fetch('GET', `${pdfUrl}`)
                .catch(error => {
                    console.warn(error.message);
                })
            : RNFetchBlob.config(configOptions)
                .fetch('GET', `${pdfUrl}`, {})
                .then(res => {

                    callback()
                    if (Platform.OS === 'ios') {
                        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                        RNFetchBlob.ios.previewDocument(configfb.path);
                    }
                    console.log('The file saved to ', res);
                })
                .catch(e => {
                    console.log('The file saved to ERROR', e.message);
                });
        // }
    };

}

const utils = new GlobalUtils()
export default GlobalUtils 