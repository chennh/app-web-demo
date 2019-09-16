<#import "/share/layout.ftl" as layout>

<!Doctype html>
<html lang="en" class="fixed">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="<@path path='static/assets/images/favicon.ico' />">

  <title>管理后台</title>

  <@layout.css />

  <style>
    .content-wrapper {
      position: relative;
    }

    .mainframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      border: 0;
    }

  </style>
</head>

<body class="skin-black sidebar-mini">
<div class="wrapper" id="app">
  <header class="main-header">
    <!-- Logo -->
    <a href="<@path path='app/frame' />" class="logo">
      <!-- mini logo -->
      <b class="logo-mini">
        <span class="dark-logo"><img src="<@path path='static/assets/images/logo-dark.png' />" alt="logo"></span>
      </b>
      <!-- logo-->
      <span class="logo-lg">
          <img src="<@path path='static/assets/images/logo-dark-text.png' />" alt="logo" class="dark-logo">
        </span>
    </a>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"></a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <!-- Notifications -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle">
              <i class="mdi mdi-bell"></i>
            </a>
          </li>
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle">
              <i class="mdi mdi-bell"></i>
            </a>
          </li>
          <!-- User Account-->
          <li class="dropdown user user-menu">
            <a href="#" class="btn dropdown-toggle" data-toggle="dropdown">
              {{model.user.name}} <i class="fa fa-caret-down"></i>
            </a>
            <ul class="dropdown-menu">
              <li class="user-body">
                <div class="row no-gutters">
                  <div class="col-12 text-left">
                    <a href="#"><i class="ion ion-person"></i> My Profile</a>
                  </div>
                  <div class="col-12 text-left">
                    <a href="#"><i class="ion ion-settings"></i> Setting</a>
                  </div>
                  <div class="col-12 text-left">
                    <a href="#"><i class="ti-settings"></i> Setting2</a>
                  </div>
                  <div role="separator" class="divider col-12"></div>
                  <div class="col-12 text-left">
                    <a href="#" @click="logout"><i class="fa fa-power-off"></i> Logout</a>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-cog fa-spin"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Left side column. contains the sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar-->
    <section class="sidebar">

      <!-- sidebar menu-->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header nav-small-cap">PERSONAL</li>
        <li>
          <a href="<@path path='app/system/demo/home' />" target="mainframe">
            <i class="fa fa-dashboard"></i> <span>首页</span>
          </a>
        </li>
        <li>
          <a href="javascript: void(0);">
            <i class="fa fa-th"></i>
            <span>模块</span>
            <span class="pull-right-container">
                <i class="fa fa-angle-right pull-right"></i>
              </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="<@path path='app/system/demo/blank' />" target="mainframe"><i class="fa fa-circle-thin"></i>空页面</a>
            </li>
            <li><a href="<@path path='app/system/demo/list' />" target="mainframe"><i class="fa fa-circle-thin"></i>列表</a></li>
            <li><a href="<@path path='app/system/demo/form' />" target="mainframe"><i class="fa fa-circle-thin"></i>表单</a></li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
  <div class="content-wrapper" style="-webkit-overflow-scrolling:touch; overflow: auto;">
    <iframe id="mainframe" name="mainframe" class="mainframe" src="<@path path='app/system/demo/home' />"></iframe>
  </div>
</div>

<@layout.js />
<@script src="static/assets/vendors/jquery-slimscroll/v1.3.8/js/jquery.slimscroll.min.js,
              static/assets/js/app/frame/index.js,
              static/assets/js/app/frame/main.js" />

</body>

</html>
