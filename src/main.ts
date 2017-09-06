
/**
 * @file	Entry point of the API
 * @author	Jordane CURÉ
 */

import { ExpressAppWithAuth } from './config/ExpressAppWithAuth'


const app = new ExpressAppWithAuth()


app.addGet(
  '/',
  (req, res) => {
    res.json({
      message: 'Express is up yeah!',
    })
  }
)

app.addPrivateGet(
  '/secret',
  (req, res) => {
    res.json('Success! You can not see this without a token')
  }
)


app.startApp()

