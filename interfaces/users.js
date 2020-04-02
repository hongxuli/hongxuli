const  passport = require('./utils/passport');

// 如下所示，我们在路由的请求地址 “/login” 和 后续的请求处理函数之间调用
// passport.authenticate('local')，即可完成对用户输入的用户名密码的验证
server.post("/login", passport.authenticate("local"), function(req, res) {
  // req.user 中会包含在 deserializeUser 函数中传入的 user 数据
  console.log("-------req.user-----------");
  console.log(req.user);
  console.log("-------req.user-----------");

  let returnData = {
    isSuccess: true,
    uer: req.user
  };

  res.send(JSON.stringify(returnData));
});

// 调用我们之前在 passport-config 中封装的用于验证用户是否已经被验证的中间件函数
// 即可限制未被验证的用户不能请求该路由，返回 Error: 401(Unauthorized)
server.get("/testAuth", passport.authenticateMiddleware(), function(req, res) {
  // ......
});
