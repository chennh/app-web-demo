<#import "/share/layout.ftl" as layout>
<#import "/share/common.ftl" as common>

<@layout.page>
<style>
  .chart {
    margin-top: 15px;
    height: 400px;
    line-height: 400px;
    background: #f8f8f8;
    text-align: center;
    color: #999;
  }
</style>
    <@layout.body>
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <mi-box title="账号信息">
              <div class="row align-c">
                <div class="col-sm-6">
                  <p>授权店铺</p>
                  <h3><span class="text-primary">1</span> 家（已过期：0家）</h3>
                </div>
                <div class="col-sm-6">
                  <p>专属机器人</p>
                  <h3><span class="text-primary">0</span> 个</h3>
                </div>
              </div>
            </mi-box>
          </div>
          <div class="col-md-6 col-sm-12">
            <mi-box title="资源剩余">
              <div class="row align-c">
                <div class="col-sm-6">
                  <p>电话套餐剩余</p>
                  <h3>5865分钟</h3>
                </div>
                <div class="col-sm-6">
                  <p>短信套餐剩余</p>
                  <h3>6035条</h3>
                </div>
              </div>
            </mi-box>
          </div>
        </div>

        <mi-box title="店铺数据">
          <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <p>历史有效呼叫数 <i class="fa fa-question-circle-o cursor-p text-warning" data-toggle="tooltip"
                            data-placement="top" title="有效呼叫数: 电话呼叫后接通成功的数量"></i></p>
              <h3>0</h3>
              <hr class="mg-v-10">
              <p>昨日有效呼叫数 <span class="text-info">0</span></p>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <p>接通成功率 <i class="fa fa-question-circle-o cursor-p text-warning" data-toggle="tooltip"
                          data-placement="top" title="有效呼叫数: 电话呼叫后接通成功的数量"></i></p>
              <h3>0%</h3>
              <hr class="mg-v-10">
              <p>昨日接通成功率 <span class="text-info">0%</span></p>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <p>历史有效短信数 <i class="fa fa-question-circle-o cursor-p text-warning" data-toggle="tooltip"
                            data-placement="top" title="有效呼叫数: 电话呼叫后接通成功的数量"></i></p>
              <h3>0</h3>
              <hr class="mg-v-10">
              <p>昨日有效短信数 <span class="text-info">0</span></p>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <p>待执行任务数 <i class="fa fa-question-circle-o cursor-p text-warning" data-toggle="tooltip"
                           data-placement="top" title="有效呼叫数: 电话呼叫后接通成功的数量"></i></p>
              <h3>0</h3>
              <hr class="mg-v-10">
              <div class="row">
                <div class="col-sm-6">
                  <p>电话 <span class="text-info">0</span></p>
                </div>
                <div class="col-sm-6">
                  <p>短信 <span class="text-info">0</span></p>
                </div>
              </div>
            </div>
          </div>
        </mi-box>

        <mi-box title="有效催付后付款订单数量">
          <div class="form-inline">
            <label class="mg-r-15">
              <select class="form-control">
                <option value="2019">2019</option>
              </select>
              &nbsp;年
            </label>
            <label class="mg-r-15">
              <select class="form-control">
                <option value="08">08</option>
              </select>
              &nbsp;月
            </label>
          </div>
          <div class="chart">图表区域</div>
        </mi-box>

        <mi-box title="有效催收/催评后好评订单数量">
          <div class="form-inline">
            <label class="mg-r-15">
              <select class="form-control">
                <option value="2019">2019</option>
              </select>
              &nbsp;年
            </label>
            <label class="mg-r-15">
              <select class="form-control">
                <option value="08">08</option>
              </select>
              &nbsp;月
            </label>
          </div>
          <div class="chart">图表区域</div>
        </mi-box>

    </@layout.body>
  <@script src="static/assets/js/app/system/demo/home.js" />
</@layout.page>