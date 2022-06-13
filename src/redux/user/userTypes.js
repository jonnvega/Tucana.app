const userTypes = {
  REGISTER_USER_REQUESTED: "REGISTER_USER_REQUESTED",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAIL: "REGISTER_USER_FAIL",
  LOGIN_REQUESTED: "LOGIN_REQUESTED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",

  CONFIRM_EMAIL_REQUEST: "CONFIRM_EMAIL_REQUEST",
  CONFIRM_EMAIL_SUCCESS: "CONFIRM_EMAIL_SUCCESS",
  CONFIRM_EMAIL_FAIL: "CONFIRM_EMAIL_FAIL",

  SEND_EMAIL_FORGOT_PASSWORD_REQUESTED: "SEND_EMAIL_FORGOT_PASSWORD_REQUESTED",
  SEND_EMAIL_FORGOT_PASSWORD_DATA: "SEND_EMAIL_FORGOT_PASSWORD_DATA",
  SEND_EMAIL_FORGOT_PASSWORD_ERROR: "SEND_EMAIL_FORGOT_PASSWORD_ERROR",

  RESET_PASSWORD_REQUESTED: "RESET_PASSWORD_REQUESTED",
  RESET_PASSWORD_DATA: "RESET_PASSWORD_DATA",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",

  CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED",
  CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA",
  CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR",

  RESEND_CONFIRMATION_LINK_REQUESTED: "RESEND_CONFIRMATION_LINK_REQUESTED",
  RESEND_CONFIRMATION_LINK_DATA: "RESEND_CONFIRMATION_LINK_DATA",
  RESEND_CONFIRMATION_LINK_ERROR: "RESEND_CONFIRMATION_LINK_ERROR",

  GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED:
    "GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED",
  GET_SUBMISSIONS_BECOME_DRIVER_DATA: "GET_SUBMISSIONS_BECOME_DRIVER_DATA",
  GET_SUBMISSIONS_BECOME_DRIVER_ERROR: "GET_SUBMISSIONS_BECOME_DRIVER_ERROR",

  SET_FORM_BECOME_DRIVER_ID_TYPE: "SET_FORM_BECOME_DRIVER_ID_TYPE",
  SET_FORM_BECOME_DRIVER_ID_NUMBER: "SET_FORM_BECOME_DRIVER_ID_NUMBER",
  SET_FORM_BECOME_DRIVER_ID_COUNTRY: "SET_FORM_BECOME_DRIVER_ID_COUNTRY",
  SET_FORM_BECOME_DRIVER_LICENSE_NUMBER:
    "SET_FORM_BECOME_DRIVER_LICENSE_NUMBER",
  SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY:
    "SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY",
  SET_FORM_BECOME_DRIVER_CAR_MAKER: "SET_FORM_BECOME_DRIVER_CAR_MAKER",
  SET_FORM_BECOME_DRIVER_NUMBER_PLATE: "SET_FORM_BECOME_DRIVER_NUMBER_PLATE",
  RESET_APPLICATION_FORM_BECOME_DRIVER: "RESET_APPLICATION_FORM_BECOME_DRIVER",

  SUBMIT_FORM_BECOME_DRIVER_REQUESTED: "SUBMIT_FORM_BECOME_DRIVER_REQUESTED",
  SUBMIT_FORM_BECOME_DRIVER_SUCCESS: "SUBMIT_FORM_BECOME_DRIVER_SUCCESS",
  SUBMIT_FORM_BECOME_DRIVER_ERROR: "SUBMIT_FORM_BECOME_DRIVER_ERROR",

  UPDATE_DRIVER_STATE_REQUESTED: "UPDATE_DRIVER_STATE_REQUESTED",
  UPDATE_DRIVER_STATE_SUCCESS: "UPDATE_DRIVER_STATE_SUCCESS",
  UPDATE_DRIVER_STATE_ERROR: "UPDATE_DRIVER_STATE_ERROR",

  SUBMIT_CONTACT_FORM_REQUESTED: "SUBMIT_CONTACT_FORM_REQUESTED",
  SUBMIT_CONTACT_FORM_SUCCESS: "SUBMIT_CONTACT_FORM_SUCCESS",
  SUBMIT_CONTACT_FORM_ERROR: "SUBMIT_CONTACT_FORM_ERROR",
};

export default userTypes;
