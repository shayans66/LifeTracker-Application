const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")
const { NotFoundError } = require("./utils/errors")
const security = require('./middleware/security')

const activityRoutes = require("./routes/activity")
const exerciseRoutes = require('./routes/exercise')
const nutritionRoutes = require('./routes/nutrition')
const sleepRoutes = require('./routes/sleep')
const authRoutes = require('./routes/auth')

const app = express()

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

// for every request, check if token exist in auth header
//    if does attach decoded user to res.locals
app.use(security.extractUserFromJwt)


app.use("/activity", activityRoutes)
app.use("/exercise", exerciseRoutes)
app.use("/nutrition", nutritionRoutes)
app.use("/sleep", sleepRoutes)
app.use("/auth", authRoutes)



/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
