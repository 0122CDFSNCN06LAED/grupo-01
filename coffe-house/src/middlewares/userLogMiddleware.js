let userLoggedSession;

async function userLogMiddleware(req, res, next) {
  req.session.userLog = req.body.email;
  userLoggedSession = req.session.userLog;

  next();
}

function userLoggedEmail() {
  return userLoggedSession;
}

module.exports = { userLogMiddleware, userLoggedEmail };
