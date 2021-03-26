<template>
  <el-dialog
    :title="limitInfo.type"
    :visible.sync="innerVisible"
    :modal-append-to-body="false"
  >
    <el-form ref="flowInfoTable" :rules="rules" label-width="110px" :model="flowInfoTable">
      <div class="panel-title">服务名:{{ limitInfo.srvName }}</div>
      <div class="panel-content mgt-30" />
      <el-row>
        <el-col :span="20">
          <el-form-item label="服务名" class="mgb-20" prop="srvName">
            <el-input v-model="flowInfoTable.srvName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dialogType===2||dialogType===4">
        <el-col :span="20">
          <el-form-item label="受限渠道编码" class="mgb-20" prop="channelId">
            <el-select v-model="flowInfoTable.channelId" multiple>
              <el-option
                v-for="item in channelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dialogType===3||dialogType===4">
        <el-col :span="20">
          <el-form-item label="受限客户端IP" class="mgb-20" prop="clientIP">
            <el-input v-model="flowInfoTable.clientIP" placeholder="例如127.0.0.1" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="流控阀值" class="mgb-20" prop="flowCounts">
            <el-input v-model="flowInfoTable.flowCounts" placeholder="单位为次" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="受限时间(秒)" class="mgb-20" prop="timeOut">
            <el-input v-model="flowInfoTable.timeOut" placeholder="单位为秒" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="有效标识" class="mgb-20">
            <el-switch v-model="flowInfoTable.validFlag" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="tc">
      <el-button type="primary" @click="editLimitFlow">修改</el-button>
      <el-button type="primary" @click="clearAll">重置</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'LimitFlowDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    limitInfo: {
      type: Object
    }
  },
  data() {
    function validateIP(rule, value, callback) {
      if (value === '' || value === undefined || value == null) {
        callback();
      } else {
        const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if ((!reg.test(value)) && value !== '') {
          callback(new Error('请输入正确的IP地址'));
        } else {
          callback();
        }
      }
    }
    return {
      dialogTableVisible: true,
      gridData: [],
      flowInfoTable: {
        srvName: ''
      },
      channelList: [{
        label: '掌厅',
        value: 23
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }
      ],
      dialogType: 1,
      rules: {
        srvName: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
        flowCounts: [{ required: true, message: '请输入流量阈值', trigger: 'blur' }],
        timeOut: [{ required: true, message: '请输入服务受限时间（秒）', trigger: 'blur' }],
        channelId: [{ required: true, message: '请选择渠道', trigger: 'blur' }],
        clientIP: [{ required: true, validator: validateIP, trigger: 'blur' }]
      }
    }
  },
  computed: {
    innerVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.flowInfoTable.srvName = this.limitInfo.srvName;
      if (this.limitInfo.type === '流量配置') {
        this.dialogType = 1;
      } else if (this.limitInfo.type === '流量配置(渠道编码)') {
        this.dialogType = 2;
      } else if (this.limitInfo.type === '流量配置(客户端编码)') {
        this.dialogType = 3;
      } else if (this.limitInfo.type === '流量配置(渠道编码+客户端编码)') {
        this.dialogType = 4;
      }
    },
    editLimitFlow() {
      console.log('提交')
    },
    clearAll() {
      console.log('清空')
    }
  }
}
</script>

<style scoped>

</style>
