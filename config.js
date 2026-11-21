
/* HT TRADES configuration
 * APP_ID      Your numeric app id from Deriv (e.g., "1089" or your registered numeric ID).
 * AFFILIATE   Optional affiliate token for login / sign-up links.
 * SIGNUP_URL  Where “Sign up” goes.
 * MASTER_COPY_TOKEN  Your Master Deriv API token whose trades followers will copy.
 * ID_PREFIX   Prefix for guest demo ids.
 */
const CFG = {
  APP_ID: "34FywFYdRovCPnNKFukpx",
  AFFILIATE: "",
  SIGNUP_URL: "https://deriv.com/signup/",
  MASTER_WS: "",
  MASTER_COPY_TOKEN: "pat_48bbd32389eaa738528403e5979aa7a56be3881263a982e26098e0294bbff6ec",
  ID_PREFIX: "DOT",
  API_BASE: "https://ht-trade.vercel.app"
};

const WS_APP = CFG.APP_ID || 1089;
