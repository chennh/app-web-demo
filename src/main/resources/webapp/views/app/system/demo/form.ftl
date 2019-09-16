<#import "/share/layout.ftl" as layout>
<#import "/share/base/form.ftl" as form>
<#import "/share/common.ftl" as common>

<@layout.page>
  <@form.css />
  <@link href="static/assets/vendors/bootstrap-daterangepicker/v3.0.5/css/daterangepicker.css,
               static/assets/vendors/bootstrap-timepicker/v0.5.2/css/bootstrap-timepicker.min.css" />

  <@layout.body>

      <mi-box title="表单" controls close-target="parent/hideForm" @close="cancel">
        <el-tabs v-model="model.tab">
          <el-tab-pane label="Default" name="default">
            <br><br>
            <form class="form form-align-r">
              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Text: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm"
                         v-model.trim="model.entity.text"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">select: </label>
                <div class="col-md-6 col-sm-8">
                  <select class="form-control form-control-sm"
                          v-model="model.entity.select">
                    <option value="">全部</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Checkbox: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="form-check-inline">
                    <input class="filled-in chk-col-light-blue" type="checkbox" value="1" v-model="model.entity.checkbox">
                    <label>选项1</label>
                  </div>
                  <div class="form-check-inline">
                    <input class="filled-in chk-col-light-blue" type="checkbox" value="2" v-model="model.entity.checkbox">
                    <label>选项2</label>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Radio: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="form-check-inline">
                    <input name="radio" class="filled-in with-gap radio-col-light-blue" type="radio"
                           v-model="model.entity.radio">
                    <label>选项1</label>
                  </div>
                  <div class="form-check-inline">
                    <input name="radio" class="filled-in with-gap radio-col-light-blue" type="radio"
                           v-model="model.entity.radio">
                    <label>选项2</label>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">日期: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control date-picker" readonly v-model-date="model.entity.date"/>
                    <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">时间: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control-sm time-picker" readonly
                           v-model-time="model.entity.time"/>
                    <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">日期时间: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control-sm datetime-picker" readonly
                           v-model-date="model.entity.datetime"/>
                    <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">日期区间: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control-sm dateRange-picker" readonly
                           v-model-daterange="[model.entity.dateBegin, model.entity.dateEnd]"/>
                    <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">日期时间区间: </label>
                <div class="col-md-6 col-sm-8">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control-sm datetimeRange-picker" readonly
                           v-model-daterange="[model.entity.datetimeBegin, model.entity.datetimeEnd]"/>
                    <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Date Input: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm formatter-picker"
                         data-options-formatter="{pattern: '{9999}-{99}-{99}'}"
                         v-model-formatter="model.entity.dateFormatter"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Time Input: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm formatter-picker"
                         data-options-formatter="{pattern: '{99}:{99}'}" v-model-formatter="model.entity.timeFormatter"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Datetime Input: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm formatter-picker"
                         data-options-formatter="{pattern: '{9999}-{99}-{99} {99}:{99}'}"
                         v-model-formatter="model.entity.datetimeFormatter"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Percent Input: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm formatter-picker"
                         data-options-formatter="{pattern: '%{99}.{99}'}" v-model-formatter="model.entity.precentFormatter"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-form-label col-md-2 col-sm-4">Price Input: </label>
                <div class="col-md-6 col-sm-8">
                  <input type="text" class="form-control form-control-sm formatter-picker"
                         data-options-formatter="{pattern: '$ {999}.{99}'}" v-model-formatter="model.entity.priceFormatter"/>
                </div>
              </div>

              <div class="form-group row">
                <div class="offset-md-2 offset-sm-4">
                  <button type="button" class="btn btn-info btn-sm mg-r-5" @click="submit">确定</button>
                  <button type="button" class="btn btn-default btn-sm" @click="cancel">取消</button>
                </div>
              </div>

            </form>
          </el-tab-pane>
          <el-tab-pane label="Element-ui" name="element-ui">
            <br><br>
            <el-col :span="10" :offset="4">
              <el-form :model="model.form" label-width="80px" size="small">
                <el-form-item label="活动名称:">
                  <el-input v-model="model.form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域:">
                  <el-select v-model="model.form.region" placeholder="请选择活动区域:">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动时间:">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期:" v-model="model.form.date1"
                                    style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line align-c" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间:" v-model="model.form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="即时配送:">
                  <el-switch v-model="model.form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质:">
                  <el-checkbox-group v-model="model.form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源:">
                  <el-radio-group v-model="model.form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式:">
                  <el-input type="textarea" v-model="model.form.desc"></el-input>
                </el-form-item>
                <el-form-item label="图片:">
                  <vma-image-upload v-model="model.form.img"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submit">确定</el-button>
                  <el-button @click="cancel">确定</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="Filter" name="filter">
            <br>
            <br>
            <el-form label-width="80px" size="small">
              <el-form-item label="日期:">
                {{new Date() | date}}
              </el-form-item>
              <el-form-item label="货币:">
                {{123456789 | currency}}
              </el-form-item>
              <el-form-item label="数字:">
                {{123456789 | number}}
              </el-form-item>
              <el-form-item label="数字:">
                {{123456789 | numberLabel}}
              </el-form-item>
              <el-form-item label="图片:">
                <img
                    src="http://wx.qlogo.cn/mmhead/ver_1/GvMOEVr7jZUI4rT2vgvX28H6TrXcrr6icQlib6s4uSQ8sgDhJXlocibIg3UbocAoR3CqJqrtIwXZGh4ia64hVTfQLmliaBAfSb17uDKzs1X0nCuo/0"
                    width="60" v-image-view> 点击图片看看
              </el-form-item>

            </el-form>
          </el-tab-pane>
        </el-tabs>
      </mi-box>

  </@layout.body>
  <@form.js />
  <@script src="static/assets/vendors/moment/v2.18.1/js/moment.min.js,
                static/assets/vendors/bootstrap-daterangepicker/v3.0.5/js/daterangepicker.js,
                static/assets/vendors/bootstrap-timepicker/v0.5.2/js/bootstrap-timepicker.min.js,
                static/assets/vendors/jquery-formatter/v0.1.5/js/jquery.formatter.js" />
  <@script src="static/assets/js/app/system/demo/service.js,
                static/assets/js/app/system/demo/form.js" />
</@layout.page>