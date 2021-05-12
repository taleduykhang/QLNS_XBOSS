export const GOOGLE_CONFIGS = {
  WEB_CLIENT_ID:
    '143411435476-tgevb55gtgit53djf6122mggkgg3help.apps.googleusercontent.com',
};

export const DATA_STATUS = {
  NONE: 'none',
  SUCCESS: 'success',
  FAILED: 'failed',
};
export const USER_PROFILE = {
  id: 0,
  name: '',
  company: '',
  id_company: 0,
  language: '',
};
export const USER_GOOGLE = {
  id: 0,
  name: '',
  email: '',
  image: '',
};
export const LINK = {
  urlImage: 'https://uat.xboss.com/web/image?model=hr.employee&field=image&id=',
  urlImageUser:
    'https://uat.xboss.com/web/image?model=res.users&field=image&id=',
  getAPI: 'https://uat.xboss.com/web/dataset/call_kw',
  urlImageFlags: 'https://uat.xboss.com/xb_theme/static/src/img/flags/',
  urlImageCompany: 'https://uat.xboss.com/web/image/res.company/',
};

export const HOST = {
  URL: '',
  DATABASE: 'xboss_uat',
  SERVICE_API: {
    CALL_KW: '/web/dataset/call_kw',
    AUTHENTICATION: '/web/session/authenticate',
    SESSION_DESTROY: '/web/session/destroy',
    IMAGE_EMPLOYEE: '/web/image?model=hr.employee&field=image&id=',
    IMAGE_USER: '/web/image?model=res.users&field=image&id=',
    IMAGE_FLAGS: '/xb_theme/static/src/img/flags/',
    IMAGE_COMPANY: '/web/image/res.company/',
  },
};
