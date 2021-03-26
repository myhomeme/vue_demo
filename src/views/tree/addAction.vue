<template>
  <panel
    :title-tag="false"
    :split-line="false"
    title="新增活动"
    icon="el-icon-circle-plus"
  >

<!--    <el-form ref="form" :model="form" :rules="formRules" label-width="7em">-->
<!--      <el-form-item label="场景名称" prop="sceneNameCn">-->
<!--        <el-input v-model="form.sceneNameCn" placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-button id="t1" @click="testClick">测试</el-button>
    <el-form ref="form" :model="form" label-width="7em">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动描述">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动原型图">
        <el-upload
          ref="upload"
          class="inline-block mgr-5"
          action=""
          :show-file-list="false"
          accept="image/jpg,image/png"
        >
          <el-button size="mini" type="info" plain>点击本地上传</el-button>
        </el-upload>
        <el-button size="mini" type="primary">上传</el-button>
      </el-form-item>
      <el-form-item label="包含页面">
        <el-radio-group v-model="form.page">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <abilityTree :checked-ability-array="checkedAbilityArray" @abilityEmit="getCheckedAbilities"/>
    <!--    <el-row :gutter="20" class="add-action-row">-->
    <!--      <el-col :span="10">-->
    <!--        <panel-->
    <!--          title="能力树"-->
    <!--          size="middle"-->
    <!--          :split-line="false"-->
    <!--          class="add-action-panel"-->
    <!--        >-->
    <!--          <el-input-->
    <!--            slot="head-right"-->
    <!--            v-model="searchKey"-->
    <!--            size="mini"-->
    <!--            placeholder="搜索能力"-->
    <!--            suffix-icon="el-icon-search"-->
    <!--            @change="searchAbility"-->
    <!--          >-->
    <!--          </el-input>-->
    <!--          <el-tree-->
    <!--            ref="tree"-->
    <!--            :data="tree"-->
    <!--            show-checkbox-->
    <!--            check-strictly-->
    <!--            node-key="id"-->
    <!--            default-expand-all-->
    <!--            :props="treeProps"-->
    <!--            class="bg-transparent"-->
    <!--            @check="handleTreeCheck"-->
    <!--          />-->
    <!--        </panel>-->
    <!--      </el-col>-->
    <!--      <el-col :span="14">-->
    <!--        <panel-->
    <!--          title="已绑定能力"-->
    <!--          size="middle"-->
    <!--          :split-line="false"-->
    <!--          class="add-action-panel"-->
    <!--        >-->
    <!--          <template v-if="checkedList.length">-->
    <!--            <ability-label-->
    <!--              v-for="item in checkedList"-->
    <!--              :key="item.id"-->
    <!--              :label="{name: item.label}"-->
    <!--              with-delete-->
    <!--              @onDelete="deleteAbility(item.id)"-->
    <!--            />-->
    <!--          </template>-->
    <!--          <p v-else class="placeholder-empty">暂无绑定能力</p>-->
    <!--        </panel>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </panel>
</template>

<script>
import Panel from '@/components/Panel';
import AbilityLabel from './abilityLabel';
import req from './request';
import abilityTree from './abilityTree';

export default {
  name: 'AddAction',
  components: {
    Panel,
    AbilityLabel,
    abilityTree
  },
  props: {
    action: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        desc: '',
        page: '',
        ability: ''
      },
      searchKey: '',
      tree: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }, {
          id: 8,
          label: '二级 1-2',
          children: [{
            id: 11,
            label: '三级 1-2-1'
          }, {
            id: 12,
            label: '三级 1-2-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }, {
          id: 7,
          label: '二级 2-3'
        }]
      }],
      // tree: [],
      treeProps: {
        disabled: 'children',
        children: 'children',
        label: 'label'
      },
      checkedList: [],
      checkedAbilityArray: []
    }
  },
  watch: {
    action(newVal) {
      this.form = newVal;
      req.getSceneInfo()
    }
  },
  methods: {
    testClick() {
      console.log('点击');
      // 'indexId': 0,'sceneId': 'd4a9a3f622d9',
      var qbody = {"sceneNameCn":"tt","sceneDesc":"s'd","sceneArea":"001","sceneCenter":"001","sceneType":"002","sceneMenuId":"5"};
      req.getSceneInfo(qbody)
        .then((response) => {
          console.log(response);
        })
    },
    getCheckedAbilities(data) {
      this.checkedList = data;
      console.log('jeishou', this.checkedList)
    },
    searchAbility() {
      console.log(this.searchKey)
    },
    handleTreeCheck(node, checkedData) {
      console.log(node, checkedData);
      this.checkedList = checkedData.checkedNodes
    },
    deleteAbility(nodeId) {
      this.checkedList = this.checkedList.filter((item) => {
        return item.id !== nodeId;
      });
      this.$refs.tree.setCheckedNodes(this.checkedList);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/styles/variables.scss';

  .add-action {
    &-row {
      border-top: 1px dashed #e5ecf2;
      margin-top: -5px;
      padding-top: 20px;
    }

    &-panel {
      background: $bg-lightgray;
      border-radius: 8px;
    }
  }

  /deep/ .el-tree-node__expand-icon.is-leaf,
  /deep/ .el-tree-node__expand-icon:not(.is-leaf) + .is-disabled {
    display: none;
  }
</style>
