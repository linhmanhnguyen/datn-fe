export const CONSTANTS = Object.freeze({
    APP_PORT: 3000,

    LOCAL_URL: 'http://localhost:3300',

    NGROK_URL: 'https://cda8-2405-4803-e66f-d7b0-b45c-e2a-dd7d-1b1a.ngrok-free.app',
    
    API_VERSION_V1: '/v1',

    //APIs for site manager
    API_SITES: '/sites',
    API_TOOLS: '/tools',

    API_TRANG_CHU: "/",

    API_BETUFL_PAGE: "/betufl-page",
    API_BUY_PRODUCT: "/buy-product",
    API_MY_CART: "/my-cart",
    API_FEATURES: "/features",

    // APIs for product
    API_PRODUCT: "/products",
    API_PRODUCT_CATEGORY: "/category",

    // APIs for Authentications
    API_AUTH: "/auth",
    API_AUTH_SIGNUP: "/register",
    API_AUTH_LOGIN: "/login",

    // APIs for Address
    API_ADDRESS: "/address",
    API_PROVINCES: "/provinces",
    API_DISTRICTS: "/districts",
    API_WARDS: "/wards",

    //MAXIMUM JSON FILE ALLOW
    MAX_JSON_BODY_REQUEST: "15mb",

    //VALIDATORS NAME
    VALIDATOR_AUTH_API: "validator-autj-api",

    // TEST
    API_TEST: '/test'
})