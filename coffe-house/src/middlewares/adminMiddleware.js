function adminMiddleware(req, res, next) {
  if (req.session.userLogged) {
    let emailUserLogged = req.session.userLogged.email;
    const mailAdmin = "@coffeehouse.com";

    if (emailUserLogged.endsWith(mailAdmin)) {
      res.locals.isAdmin = req.session.userLogged;
      req.session.emailUserLogged = true;

      // console.log(res.locals.isAdmin);
    }
  }

  next();
}
module.exports = adminMiddleware;
