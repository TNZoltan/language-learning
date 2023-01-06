export const logError = (req, dbRes) => {
  console.error("> > Error START < <")
  console.error("- - On this URL - -")
  console.error(req.baseUrl)
  console.error("- - Request Params - -")
  console.error(req.params)
  console.error("- - Request Body - -")
  console.error(req.body)
  console.error("- - DB Status - -")
  console.error(dbRes.status)
  console.error("- - DB Body - -")
  console.error(dbRes.body)
  console.error("< < Error END > >")
}

export const logCustomError = (customObj, customMsg) => {
  console.error("> > Error START < <")
  console.error(customMsg)
  console.error(customObj)
  console.error("< < Error END > >")
}

export const logDbError = (req, errorObj) => {
  console.error("> > Error START < <")
  console.error("There was an error making the request to the DB")
  console.error("- - On this URL - -")
  console.error(req.baseUrl)
  console.error("- - Request Params - -")
  console.error(req.params)
  console.error("- - Request Body - -")
  console.error(req.body)
  console.error("- - Request Dump - -")
  console.error(req)
  console.error("- - Error Object - -")
  console.error(errorObj)
  console.error("< < Error END > >")
}