/* HT TRADES configuration
 * APP_ID      Your app id from Deriv (redirect URL = this site’s origin).
 * AFFILIATE   Optional affiliate token for login / sign-up links.
 * SIGNUP_URL  Where “Sign up” goes.
 * API_BASE    Copy-trading API origin, no trailing slash.
 *             "" = same site (e.g. /copy/enroll on this domain).
 *             Or full URL: "https://your-api.up.railway.app"
 * ID_PREFIX   Prefix for guest demo ids.
 */
const CFG = {
  APP_ID: "34FywFYdRovCPnNKFukpx",
  AFFILIATE: "",
  SIGNUP_URL: "https://deriv.com/signup/",
  MASTER_WS: "",
  ID_PREFIX: "DOT",
  API_BASE: "https://ht-trade-server.onrender.com"
};

const WS_APP = CFG.APP_ID || 1089;
