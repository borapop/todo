var koa = require('koa');
var app = koa();
var config = require('./config');
var user = require('./controllers/user');
var serve = require('koa-static');
var router = require('koa-router')();
var session = require('koa-session');
app.keys = [config.get('session:secret'), config.get('session:keys')];
app.use(session(app));
app.use(serve(__dirname + '/public'));


router.get('/', user.profile);
router.get('/exit', user.exit);

router.get('/login', user.authorization);
router.post('/login', user.authorize);

router.get('/register', user.registration);
router.post('/register', user.register);



app.use(function *(next){
    if (this.path !== '/1') yield next;



});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);