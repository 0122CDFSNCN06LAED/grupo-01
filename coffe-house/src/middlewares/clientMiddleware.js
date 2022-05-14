

function clientMiddleware (req, res, next) {
    if(req.session.userLogged) {
        let emailUserLogged = req.session.userLogged.email;
        const mailAdmin= "@coffeehouse.com"
        if(!emailUserLogged.endsWith(mailAdmin)){
          return res.redirect('/')
        }
        
    } 
    if(!req.session.userLogged) 
    {        return res.redirect('/')
    }

    
    next()
}
module.exports=clientMiddleware