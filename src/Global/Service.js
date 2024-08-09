//import : react components
import {Alert} from 'react-native';
//third parties
//import : axios
import axios from 'axios';
import Toast from 'react-native-toast-message';

const isProduction = false;
//endpoint : base_url
// export const BASE_URL = `https://devtrackcert.trackallpro.com/api/`;

// export const BASE_URL = `https://www.niletechinnovations.com/projects/leadphysician/api/`;

export const BASE_URL = 'https://nileprojects.in/leadphysician/api/';

export const LOGIN = `login`;
export const REGISTER = `register`;
export const SET_GOAL = `goal`;
export const GET_GOAL = `get-goal`;
export const DELETE_GOAL = `delete-goal`;
export const GOAL_DETAIL = `goal-details`;
export const GOAL_UPDATE = `update-goal`;
export const GET_PROFILE = `profile`;
export const GET_SCHDULE = `get-schedule`;
export const LOGOUT = `logout`;
export const CHANGE_PASSWORD = `change-password`;
export const GET_SHDULEDETAIL = `schedule-details`;
export const GET_MYCOURSES = `course/list`;
export const GET_COURSEDETAIL = `course/details`;
export const GET_MODULEDETAIL = `course/module`;
export const MARK_COMPLETE = `course/module/step/mark-complete`;
export const LIKE = `course/module/step/save-to-favourite`;
export const GET_STEPDETAIL = `course/module/step`;
export const SAVE_LATER = `course/module/step/save-to-later`;
export const GET_FAVORIES = `course/favourite-modules`;
export const GET_SAVED = `course/saved-modules`;
export const GET_HOME = `home`;
export const POST_APP_REVIEW = 'reviews';
export const GET_GROUPS = `plans-with-users`;
export const POST_REVIEW = `course/add-review`;
export const ALL_REVIE = `course/review-list`;
export const GET_NOTIFICATION = `user-notifications`;
export const GET_CALENDARLISTING = `schedule-goals-listing`;
export const ADD_CARDS = `add-card`;
export const GET_CARDS = `all-cards`;
export const CHAT_RECORD = `chat-record`;
export const READ_CHATADMIN = `record-seen`;
export const GET_PLANS = `plans`;
export const BUY_PLAN = `buy-plan`;
export const CHAT_READ = `record-seen`;
export const UNSEEN_MESSAGE = `unseen-message-count`;
export const GET_CETIFICATE = `course/certificates`;
export const CLEAR_NOTIFICATION = `clear-notifications`;
export const READ_NOTIFICATION = `seen-notifications`;
export const FORGOT_PASSWORD = `forgot-password`;
export const VERIFY_OTP_AUTH = `verify-otp`;
export const RESET_PASSWORD = `reset-password`;
export const CHAT_DOC_UPLOAD = `chat/image`;
export const DELETE_SINGLE_NOTIFICATION = 'delete-notification';

export const DETAILS = `chat/image`;
export const SUGGESTED_LIST = `suggested-list`;
export const CART_LIST = `cart-list`;
// export const WISHLIST = `wishlist`;
export const WISHLIST = `wishlist-listing`;
export const COURSE_LISTING = `course-listing`;
export const TRENDING_COURSE = `trending-course`;
export const VERIFY_OTP = `verify-otp`;

export const RESEND_OTP = `resend-otp`;
export const FORGET_PASSWORD = `forget-password`;
export const FORGET_PASSWORD_VERIFY = `forget-password-verify`;
export const CHECK_SUBSCRIPTION = `subscription`;
export const CREATE_SUBSCRIPTION = `create-subscription`;
export const CANCEL_SUBSCRIPTION = `cancel-subscription`;
export const QUERY_LIST = `query-list`;
export const CONTACT_US = `contact-us`;

export const CANCEL_SU = `all-type-listing`;
export const LIKE_OBJECT_TYPE = `add-wishlist`;
export const UNLIKE_OBJECT_TYPE = `remove-wishlist`;
export const ALL_CATEGORY = `all-category`;
export const PROFILE = `profile`;
export const ADD_CARD = `add-card`;
export const DELETE_CARD = `delete-card`;
export const SAVE_CARD_LISTING = `save-card-listing`;
export const NOTIFICATIONS = `notifications`;
export const CLEAR_NOTIFICATIONS = `clear-notifications`;
export const CHANGE_PASWORD = `change-password`;
export const CERTIFICATES = `certificates`;
export const SUBMIT_REVIEW = `submit-review`;
export const REVIEW_LIST = `review-list`;
export const OBJECT_TYPE_DETAILS = `object-type-details`;
export const ADD_TO_CART = `add-to-cart`;
export const CART_DETAILS_PAYMENT = `cart-details-payment`;
export const SAVE_ORDER = `save-order`;
export const CART_COUNT = `cart-count`;
export const ASSIGNMENT_UPLOAD_FILE = `assignment-upload-file`;
export const MY_ORDER = `my-order`;
export const MARK_AS_COMPLETE = `mark-as-complete`;
export const UPDATE_PRODUCT_QUANTITY = `update-product-quantity`;
export const REMOVE_CART = `remove-cart`;
export const REMOVE_CART_COURSE = 'remove-cart-course';
export const MAKE_PAYMENT = `make-payment`;
export const SPECIAL_COURSES = `special-courses`;
export const ORDER_DETAIL = `order-detail`;
export const UPDATE_PROFILE = `update-profile`;
export const ADD_NEW_ADDRESS = `address`;
export const GET_ALL_ADDRESS = 'address';
export const UPDATE_ADDRESS = 'update-address';
export const DELETE_ADDRESS = 'address';
export const ALL_COUPON = 'coupons?type=2';
export const COUPON_APPLIED = 'coupon-applied';
export const REMOVE_APPLIED_COUPON = 'remove-applied-coupon';
export const EMPTY_CART = 'empty-cart';
export const SHIPPING_ADDRESS = 'shipping-address';
export const GET_SHIPPING_RATES = 'get-shipping-rates';
export const CHOOSE_SHIPPING_OPTION = 'choose-shipping-option';
export const COUPON_APPLIED_COURSE = 'coupon-applied-course';
export const REMOVE_APPLIED_COUPON_COURSE = 'remove-applied-coupon-course';
export const IOS_SUBSCRIPTION = 'ios-subscription';
import { createRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../reduxToolkit/store/store';
import {setUser, setUserToken} from '../reduxToolkit/reducer/user';

export const navigationRef = createRef()

export function _navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const loginHandler = async () => {
  try {
    const qwer = await AsyncStorage.clear();
    console.log({qwer});
    store?.dispatch(setUserToken(''));
    store?.dispatch(setUser(''));
    setTimeout(() => {
      _navigate('SignIn')
    }, 300);
  } catch (err) {
    console.log('err in loginHandler in service', err);
  }
};

const handleError = async error => {
  if (error?.response) {
    const {status, data} = error.response;
    Toast.show({text1: data.message});
    console.log('Error data:', data);
    if (status === 401) {
      loginHandler();
    }
    console.log('Status:', status);
  } else {
    Toast.show({text1: error.message});
    console.log('Error:', error);
  }
};

//function : post API
export const postAPI = async (endPoint, postData, token = '') => {
  const url = BASE_URL + endPoint;
  return await axios
    .post(url, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return {
        response: response?.data,
        status: response?.data?.status,
        msg: response?.data?.msg,
      };
    })
    .catch(error => {
      return {
        response: error,
        status: false,
        msg: error.response.data.msg,
      };
    });
};

//function :  get api
export const getApi = endPoint =>
  axios
    .get(`${BASE_URL}${endPoint}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      handleError(error);
    });
//function :  get api with token
export const getApiWithToken = (token, endPoint) =>
  axios
    .get(`${BASE_URL}${endPoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      // console.log("getApiWithToken",`${BASE_URL}${endPoint}`);

      return res;
    })
    .catch(error => {
      handleError(error);
    });
//function :  post api
export const postApi = (endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      handleError(error);
    });

//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers:
        Object.keys(data).length > 0
          ? {
              'Content-Type': 'multipart/form-data',
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            }
          : {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      handleError(error);
    });
//function : post api with json data
export const postJsonApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${BASE_URL}${endPoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      handleError(error);
    });

export const deleteApi = (token, endPoint, id) =>
  axios
    .delete(`${BASE_URL}${endPoint}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      handleError(error);
    });

export const requestPostApi = async (endPoint, body, method, token) => {
  console.log('the token is :-', token);
  var header = {};
  if (token != '' && token != undefined) {
    header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      'Cache-Control': 'no-cache',
    };
  } else {
    header = {'Content-Type': 'application/json', Accept: 'application/json'};
  }
  var url = BASE_URL + endPoint;
  console.log('post Request Url:-' + url + '\n');
  console.log('the body data', body);
  // console.log(header + '\n')
  try {
    let response = await fetch(url, {
      method: method,
      body: body == '' ? '' : JSON.stringify(body),
      headers: header,
    });
    let code = response.status;
    console.log('the api responce is------------->>', url, code);
    //  let responseJ = await response.json();
    //  console.log('the api responce is',responseJ.headers)
    if (code == 200) {
      let responseJson = await response.json();
      // console.log(responseJson, '-------------kkkkkkkkkkkkkkkkk')
      return {responseJson: responseJson, err: null};
    } else if (code == 400 || code == 402 || code == 401) {
      let responseJson = await response.json();
      //Completion block
      console.log({responseJson});
      return {responseJson: responseJson, err: responseJson.message};
    } else {
      let responseJson = await response.json();
      // console.log(responson)
      return {responseJson: responseJson, err: responseJson.message};
    }
  } catch (error) {
    console.log('the error is', error);
    return {
      responseJson: null,
      err: 'Something Went Wrong! Please check your internet connection.',
    };
    // return {responseJson:null,err:error}
  }
};
