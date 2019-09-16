<#macro page title="后台管理">
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="<@path path='static/assets/images/favicon.ico' />">

  <title>${title}</title>

    <@css />

    <@js />

    <#nested/>

  </body>
</html>
</#macro>

<#macro body>
</head>
<body class="main-page">
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Main content -->
  <section id="app" class="content" v-cloak>

        <#nested/>

  </section>
</div>
</#macro>

<#macro js>
  <script>
    <#assign contextJSON='${context}'?eval />
    var context = ${context!'{}'}
  </script>
  <@script src="static/assets/vendors/jquery/v3.2.1/js/jquery.min.js,
                static/assets/vendors/bootstrap/v4.0/js/bootstrap.bundle.min.js,
                static/assets/vendors/vue/v2.6.10/js/vue${((contextJSON.isProd?c!true) == 'true')?string('.min', '')}.js,
                static/assets/vendors/axios/v0.19.0/js/axios.min.js,
                static/assets/vendors/axios/v0.19.0/js/lib/axiosSettle.min.js,
                static/assets/vendors/axios/v0.19.0/js/lib/axiosBuildURL.min.js,
                static/assets/vendors/element-ui/v2.11.0/js/element-ui.min.js,
                static/assets/vendors/vma-vue-assist/v1.1.59/js/vmaAssist.min.js,
                static/assets/vendors/vma-vue-assist/vmaAssistAdapt.min.js,
                static/assets/vendors/vma-vue-element/v1.0.29/js/vmaElement.min.js,
                static/assets/vendors/vma-template-minimalelite/v1.0.0/js/vmaTemplateMinimalelite.umd.min.js,
                static/assets/js/config.js,
                static/assets/js/storage/index.js,
                static/assets/js/share/ready.js,
                static/assets/js/share/vueReady.js" />
</#macro>
<#macro css>
  <@link href="static/assets/vendors/bootstrap/v4.0/css/bootstrap.min.css,static/assets/css/bootstrap-extend.css" />
  <!-- style.css必须放第一个 -->
  <@link href="static/assets/css/style.css,
               static/assets/css/skins/all-skins.css,
               static/assets/css/custom.css,
               static/assets/vendors/element-ui/v2.11.0/css/element-ui.min.css,
               static/assets/vendors/vma-vue-element/v1.0.29/css/vmaElement.min.css" />
</#macro>
