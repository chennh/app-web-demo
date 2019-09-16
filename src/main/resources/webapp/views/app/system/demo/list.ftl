<#import "/share/layout.ftl" as layout>
<#import "/share/base/list.ftl" as list>
<#import "/share/common.ftl" as common>

<@layout.page>
  <@list.css />
  <@link href="static/assets/vendors/bootstrap-daterangepicker/v3.0.5/css/daterangepicker.css" />
  <@script src="static/assets/vendors/moment/v2.18.1/js/moment.min.js,
                static/assets/vendors/bootstrap-daterangepicker/v3.0.5/js/daterangepicker.js" />

  <@layout.body>
      <mi-box>
        <div class="form-inline">
          <div class="form-group">
            <label>输入框:</label>
            <input type="text" class="form-control form-control-sm"
                   v-model.trim="model.params.text"
                   @keyup.enter="search"/>
          </div>
          <div class="form-group">
            <label>下拉框:</label>
            <select class="form-control form-control-sm"
                    v-model="model.params.select"
                    @change="search">
              <option value="">全部</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <div class="form-group">
            <label>性别:</label>
            <input class="with-gap" type="radio" name="sex" value=""
                   v-model="model.params.sex"
                   @change="search">
            <label>全部</label>
            <input class="with-gap" type="radio" name="sex" value="1"
                   v-model="model.params.sex"
                   @change="search">
            <label>男</label>
            <input class="with-gap" type="radio" name="sex" value="2"
                   v-model="model.params.sex"
                   @change="search">
            <label>女</label>
          </div>
          <div class="form-group">
            <label>创建时间:</label>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control form-control-sm dateRange-picker" readonly
                     v-model-daterange="[model.params.dateBegin, model.params.dateEnd]"
                     @change="search">
              <span class="input-group-addon action-clear"><i class="fa fa-remove"></i></span>
            </div>
          </div>
          <div class="form-group">
            <label>创建时间:</label>
            <el-date-picker
                size="small"
                type="daterange"
                placeholder="选择日期"
                v-model="model.params.dateRange">
            </el-date-picker>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-info btn-sm mg-r-5" @click="search">查询</button>
            <button type="button" class="btn btn-default btn-sm" @click="resetSearch">重置</button>
          </div>
        </div>
      </mi-box>


      <mi-box>
        <div class="box-tools">
          <div class="pull-left">
            <button type="button" class="btn btn-sm btn-outline-danger"
                    @click="showBatchDel">批量删除
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle"
                      data-toggle="dropdown">操作合并
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">操作1</a>
                <a class="dropdown-item" href="#">操作2</a>
                <a class="dropdown-item" href="#">操作3</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">操作4</a>
              </div>
            </div>
          </div>
          <div class="pull-right">
            <button type="button" class="btn btn-sm btn-outline-primary" @click="showForm()">新增</button>
            <button type="button" class="btn btn-sm btn-outline-info" @click="showDetail()">详情</button>
          </div>
        </div>
        <div class="box-table">
          <el-table style="width: 100%"
                    stripe
                    :data="model.table.list">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
          </el-table>
          <div class="box-pagination">
            <vma-pagination :page-num="model.params.current"
                            :page-size="model.params.size"
                            :total="model.table.page.total"
                            @change="list"/>
          </div>
        </div>
      </mi-box>

        <!-- form win -->
        <mi-win v-model="model.form.show"
                :url="formUrl"></mi-win>

        <!-- detail win -->
        <mi-win v-model="model.detail.show"
                :url="detailUrl"></mi-win>

  </@layout.body>

  <@list.js />
  <@script src="static/assets/js/app/system/demo/service.js,
                static/assets/js/app/system/demo/list.js" />
</@layout.page>