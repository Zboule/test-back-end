
import { ExpressAppWithAuth } from "./config/ExpressAppWithAuth";

let app = new ExpressAppWithAuth()

/**
 * Add routes
 */

app.addGet(
  "/",
  (req, res) => {
    res.json({
      message: "Express is up yeah!"
    });
  }
);

app.addPrivateGet(
  "/secret",
  (req, res) => {
    res.json("Success! You can not see this without a token");
  }
);


/**
 * Start the app
 */
app.startApp()


