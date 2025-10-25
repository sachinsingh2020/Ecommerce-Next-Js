// Website Routes
export const WEBSITE_HOME = "/";
export const WEBSITE_LOGIN = "/auth/login";
export const WEBSITE_REGISTER = "/auth/register";
export const WEBSITE_RESETPASSWORD = "/auth/reset-password";

export const WEBSITE_SHOP = "/shop";

export const WEBSTIE_PRODUCT_DETAILS = (slug) =>
  slug ? `/product/${slug}` : "/product";

export const WEBSITE_CART = "/cart";
export const WEBSITE_CHECKOUT = "/checkout";

export const WEBSITE_ORDER_DETAILS = (order_id) => `/order-details/${order_id}`;

// User Routes
export const USER_DASHBOARD = "/my-account";
export const USER_PROFILE = "/profile";
export const USER_ORDERS = "/orders";
