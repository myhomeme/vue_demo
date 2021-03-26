<template>
  <el-row :gutter="20" class="add-action-row">
    <el-col :span="10">
      <panel
        :split-line="false"
        title="能力树"
        size="middle"
        class="add-action-panel"
      >
        <el-input
          slot="head-right"
          v-model="searchKey"
          size="mini"
          placeholder="搜索能力"
          suffix-icon="el-icon-search"
          @change="searchAbility"
        >
        </el-input>
        <el-tree
          ref="tree"
          :data="tree"
          :load="loadNode"
          lazy
          show-checkbox
          node-key="id"
          default-expand-all
          :check-on-click-node="checkClickNodeBool"
          :default-checked-keys="parentCheckedList"
          :props="treeProps"
          :filter-node-method="filterNode"
          class="bg-transparent"
          @check="handleTreeCheck"
        />
      </panel>
    </el-col>
    <el-col :span="14">
      <panel
        title="已绑定能力"
        size="middle"
        :split-line="false"
        class="add-action-panel"
      >
        <template v-if="checkedList.length">
          <ability-label
            v-for="item in checkedList"
            :key="item.id"
            :label="{name: item.label}"
            with-delete
            @onDelete="deleteAbility(item.id)"
          />
        </template>
        <p v-else class="placeholder-empty">暂无绑定能力</p>
      </panel>
    </el-col>
  </el-row>
</template>

<script>
import req from './request';
import Panel from '@/components/Panel';
import AbilityLabel from './abilityLabel';

export default {
  components: {
    Panel,
    AbilityLabel
  },
  props: {
    checkedAbilityArray: {
      type: Array
    }
  },
  data() {
    return {
      searchKey: '',
      tree: [],
      treeProps: {
        disabled: 'children',
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      checkClickNodeBool: true,
      checkedList: [],
      parentCheckedList: []
    }
  },
  watch: {
    action(newVal) {
      this.form = newVal;
    },
    searchKey(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      req.getUserInfo()
        .then((response) => {
          this.tree = response.data;
          this.arrAll();
        })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    arrAll() {
      this.tree.forEach((item) => {
        item.id = item.abilityMenuId;
        item.label = item.abilityMenuNameCn;
        if (item.children.length > 0) {
          item.children.forEach((citem) => {
            citem.id = citem.abilityMenuId;
            citem.label = citem.abilityMenuNameCn + '(' + citem.counter + ')';
            if (citem.children === undefined) {
              this.$set(citem, 'children', [])
            }
          })
        }

      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) { // 默认加载第1层.
        return resolve(this.tree);
      } else if (node.level === 1) { // 默认展开的层级,需要默认几层就判断一下.
        // console.log('节点二', node);
        if (node.data.counter === 0) {
          return resolve([]);
        }
        return resolve(node.data.children);	// 核心是这里,每次展开的时候loadNode方法就会调用一次,只需要把node.data.[这里是默认的child字段]  加载到resolve方法里就可以了.就可以实现默认加载N级,之后再使用懒加载
      } else if (node.level === 2) {	// 懒加载方法
        setTimeout(() => {
          req.getAbilityInfo({'abilityMenuId': node.data.abilityMenuId})
            .then((response) => {
              var tNode = [];
              if (response.data.obj.list.length > 0) {
                response.data.obj.list.forEach((item) => {
                  tNode.push({
                    id: item.abilityId,
                    label: item.abilityNameCn,
                    abilityNameEn: item.abilityNameEn,
                    abilityMenuId: item.abilityMenuId,
                    leaf: true
                  });

                });
                return resolve(tNode);
              }
            })
        }, 500);
      } else if (node.level === 3) {
        if(this.checkedAbilityArray.indexOf(node.data.id) !== -1){
          this.parentCheckedList.push(node.id);
        }
      }
      return resolve([]);
    },
    searchAbility() {
      console.log(this.searchKey)
    },
    handleTreeCheck(node, checkedData) {
      this.checkedList = checkedData.checkedNodes;
      this.$emit('abilityEmit', this.checkedList)
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
