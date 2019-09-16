<#import "/share/layout.ftl" as layout>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="<@path path='static/assets/images/favicon.ico' />">

  <title>账号登录</title>

  <@layout.css />
  <@link href="static/assets/vendors/animate/v3.7.2/css/animate.css,
               static/assets/css/login/login.css" />
  <script>
    if (window !== top){
        top.location.assign(location.href);
    }
  </script>
</head>


<body>
<div class="login-wrapper" id="app">
  <div class="login-wrapper-bg" style="background-image: url('<@path path='static/assets/images/login-bg@2x.png' />')"></div>
  <div class="login-container">
    <div class="login-ves">
      <img class="login-ves-left" src="<@path path='static/assets/images/login-ves-left@2x.png'/>"/>
      <div class="login-ves-right">
        <div class="login-form">
          <h3>后台登录</h3>
          <div class="form-group">
            <input type="text" class="form-control animated" placeholder="请输入账号"
                   :class="{'invalid shake': !model.validate.admin.account}"
                   v-model.trim="model.admin.account"
                   @blur="validateAdminAccount"
                   @keyup.enter="login"/>
          </div>
          <div class="form-group">
            <input type="password" class="form-control animated" placeholder="密码"
                   :class="{'invalid shake': !model.validate.admin.password}"
                   v-model.trim="model.admin.password"
                   @blur="validateAdminPassword"
                   @keyup.enter="login">
          </div>
          <div class="login-code">
            <div class="form-group">
              <input type="text" class="form-control animated" placeholder="验证码" maxlength="4"
                     :class="{'invalid shake': !model.validate.admin.code}"
                     v-model.trim="model.admin.code"
                     @blur="validateAdminCode"
                     @keyup.enter="login">
            </div>
            <img class="code"
                 :src="model.code"
                 @click="refreshCode">
          </div>
          <div class="form-group">
            <a href="javascript: void(0);" class="login-btn"
               @click="login">登录</a>
          </div>
          <div class="form-group clearfix">
            <div class="form-check-inline pull-left">
              <input class="filled-in chk-col-light-blue" type="checkbox" id="remember"
                     v-model="model.admin.rememberMe">
              <label for="remember">记住我</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<@layout.js />
<@script src="static/assets/js/app/login/service.js,
              static/assets/js/app/login/index.js"/>
</body>
</html>
