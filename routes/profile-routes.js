const router = require("express").Router();


const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logged in
        res.redirect("/auth/login");
    } else {
        //if logged in
        //allows the router.get below to work
        next();
    }
};

// this is the base route for profile
//we are able to just have it as a backslash because in app.js we push profile behind the forward slash
router.get("/", authCheck, function (req, res) {
    res.render("profile", { user: req.user });
})



module.exports = router;