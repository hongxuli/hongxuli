const passport = require('passport')
const LocalStrategy = require("passport-local");
const User = require('../../dbs/models/users')


passport.use(
  new LocalStrategy(
    // /**
    //  * @param username 用户输入的用户名
    //  * @param password 用户输入的密码
    //  * @param done 验证验证完成后的回调函数，由passport调用
    //  */
    function(username, password, done) {
      // 在编写 User.findUniqueUserByUsername 时，包含两个参数，一个是 username
      // 一个是我们现在所传入的回调函数，我们将获取到的用户信息传递给我们的回调函数
      User.findUniqueUserByUsername(username, function(err, user) {
        if (err) {
          console.log("error");
          return done(err);
        }
        if (!user) {
          console.log("username not found.");

          return done(null, false, { message: "username not found." });
        }
        if (user.password != password) {
          console.log("password is invalid.");

          return done(null, false, { message: "password is invalid." });
        }

        return done(null, user);
      });
    }
  )
);

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
// 存到 session 中的是用户的 username）。在这里的 user 应为我们之前在 new
// LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
passport.serializeUser(function(user, done) {
  done(null, user.username);
});

// deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
// 的对象，并将其封装到 req.user
passport.deserializeUser(function(username, done) {
  User.findUniqueUserByUsername(username, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});


// 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用
passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};


module.exports = passport