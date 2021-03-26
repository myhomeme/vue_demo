<template>
  <div id="soapApp" class="container">
    <div class="panel-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/demo/server' }">服务注册</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/configCenter' }">配置中心</el-breadcrumb-item>
        <el-breadcrumb-item>服务流量管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel-box">
      <el-form :model="srvFlowInfoTable" label-width="150px">
        <div class="panel-title">分流功能集群池</div>
        <div class="panel-content mgt-10">
          <el-form-item label="选择范围池" class="mgb-20">
            <el-col :span="8" class="mgr-40">
              <el-select v-model="poolName" style="width:60%" placeholder="请选择" @change="changePool">
                <el-option
                  v-for="item in poolOptions"
                  :key="item.esbPoolKey"
                  :label="item.name"
                  :value="item.esbPoolKey"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </div>
        <div class="panel-content mgt-30" />
        <div class="panel-title">搜索服务</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务名" class="mgb-20">
              <el-input v-model="srvFlowInfoTable.systemName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务中文名" class="mgb-20">
              <el-input v-model="srvFlowInfoTable.systemEnName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有效" class="mgb-20">
              <el-switch v-model="srvFlowInfoTable.isLoadBalance" />
              <a style="text-align: right" @click="changeOptions">{{ !isOther?'高级搜索':'收起' }}</a>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="isOther">
          <el-row>
            <el-col :span="8">
              <el-form-item label="服务状态" class="mgb-20">
                <el-select v-model="srvFlowInfoTable.type">
                  <el-option
                    v-for="item in otherSystemCompany"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务类型" class="mgb-20">
                <el-select v-model="srvFlowInfoTable.type">
                  <el-option
                    v-for="item in otherSystemCompany"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="源系统" class="mgb-20">
                <el-select v-model="srvFlowInfoTable.type">
                  <el-option
                    v-for="item in otherSystemCompany"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="应用名" class="mgb-20">
                <el-select v-model="srvFlowInfoTable.type">
                  <el-option
                    v-for="item in otherSystemCompany"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-row>
              <el-col :span="8">
                <el-form-item label="输入参数" class="mgb-20">
                  <el-input v-model="srvFlowInfoTable.type" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="输出参数" class="mgb-20">
                  <el-input v-model="srvFlowInfoTable.type" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="tc">
        <el-button type="primary" @click="searchSrv">查询</el-button>
        <el-button type="primary" @click="clearAll">清空</el-button>
        <el-button type="primary" @click="flush">刷新</el-button>
      </div>
    </div>
    <div class="panel-box mgt-20">
      <div class="clearfix mgr-40">
        <div class="panel-title">服务流量配置列表</div>
        <el-table :data="srvLimitList" style="width: 100%" class="cus-table mgt-10 success-row" stripe>
          <el-table-column type="selection" align="center" width="45" />
          <el-table-column prop="srvName" label="服务名" align="left" show-overflow-tooltip class="cus" />
          <el-table-column prop="srvCnName" label="中文名" align="left" show-overflow-tooltip />
          <el-table-column prop="srvType" label="服务类型" align="center" width="80" show-overflow-tooltip />
          <el-table-column prop="srvStatus" label="服务状态" align="center" width="80" />
          <el-table-column prop="isLoadBalance" label="流量配置" width="90" align="center">
            <template slot-scope="scope">
              <el-button size="mini" class="cus-el-button--default" @click="editLimitFlow(scope)">流量配置</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="detectTimeout" label="流量配置(渠道编码)" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" class="cus-el-button--default" @click="editLimitFlow(scope)">流量配置(渠道编码)</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="startupDelay" label="流量配置(客户端编码)" width="160" align="center">
            <template slot-scope="scope">
              <el-button size="mini" class="cus-el-button--default" @click="editLimitFlow(scope)">流量配置(客户端编码)</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="srvVersion" label="流量配置(渠道编码+客户端编码)" width="220" align="center">
            <template slot-scope="scope">
              <el-button size="mini" class="cus-el-button--default" @click="editLimitFlow(scope)">流量配置(渠道编码+客户端编码)</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <limit-flow-dialog v-if="isEdit" :visible.sync="isEdit" :limit-info="limitFlowInfo" />
  </div>
</template>

<script>
import limitFlowDialog from './limitFlowDialog';
export default {
  name: 'LimitFlow',
  components: {
    limitFlowDialog
  },
  data() {
    return {
      srvFlowInfoTable: {
        type: ''
      },
      srvLimitList: [{
        srvName: 'com_sitech_test_bcoc',
        srvCnName: '能力运营中心支撑服务',
        srvType: 'HSF',
        srvStatus: '运行'
      }],
      otherSystemCompany: [
        {
          label: '测试',
          value: '1'
        }
      ],
      poolName: '',
      poolOptions: [],
      isOther: false,
      isEdit: false,
      limitFlowInfo: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initEsbPool();
      if (this.poolOptions.length > 0) {
        this.poolName = this.poolOptions[0].esbPoolKey;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    searchSrv() {
      console.log('查询请求');
    },
    clearAll() {
      console.log('清空')
    },
    flush() {
      console.log('刷新')
    },
    changePool(val) {
      console.log(val);
      this.poolName = val;
    },
    initEsbPool() { // 获取esb的池
      var that = this;
          that.poolOptions = [];
          this.poolName = this.poolOptions[0].esbPoolKey;
    },
    changeOptions() {
      this.isOther = !this.isOther;
    },
    editLimitFlow(scope) {
      this.isEdit = true;
      this.limitFlowInfo = scope.row;
      this.limitFlowInfo.type = scope.column.label;
      console.log(this.limitFlowInfo);
    }
  }
}
</script>

<style scoped>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
