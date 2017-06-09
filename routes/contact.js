var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'pdaswift3009@gmail.com',
            pass: 'something'
        }
    });
    var mailOptions = {
        from: 'John Thomas <johnthomas@outlook.com>',
        to: 'pdaswift3009@gmail.com',
        subject: 'Webmail Submission',
        text: 'New submission with Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
        html: '<p> Theres a newly submitted mail.. </p><ul> <li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            res.redirect('/');
        } else {
            console.log('message sent: ' + info.response);
            // res.redirect('/')
            res.send("We have received your message and we'll respond accordingly")
        }
    })
})

module.exports = router;