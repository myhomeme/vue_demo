<template>
  <div :class="{panel: true, 'panel--border': border}">
    <div :class="classHead" :style="{background: bgHead}">
      <i v-if="isCollapsePanel" class="panel-head__collapse el-icon-arrow-down" :class="{'is-active': isActive}" @click="handleCollapse"></i>
      <slot name="head">
        <h3 class="panel-head__title">
          <slot name="icon">
            <i v-if="icon" class="panel-head__title-icon" :class="icon" :style="{color: iconColor}"></i>
          </slot>
          {{ title }}
        </h3>
        <div class="panel-head__left">
          <slot name="head-left" />
        </div>
        <div class="panel-head__right">
          <slot name="head-right" />
        </div>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="isActive" class="panel-body">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    splitLine: {
      type: Boolean,
      default: true
    },
    titleTag: {
      type: Boolean,
      default: true
    },
    icon: String,
    iconColor: {
      type: String,
      default: '#26CB7F'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    bgHead: {
      type: String,
      default: ''
    },
    customHeadClass: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    beforeCollapse: Function
  },
  data() {
    return {
      isActive: false,
      isCollapsePanel: false
    }
  },
  computed: {
    classHead() {
      const obj = {
        'panel-head': true,
        'panel-head--tag': this.titleTag,
        'panel-head--split': this.splitLine && this.isActive
      };
      if (this.size) obj['panel-head--' + this.size] = true;
      if (this.customHeadClass) obj[this.customHeadClass] = true;
      return obj
    }
  },
  created() {
    this.isCollapsePanel = this.collapse;
    this.isActive = (this.collapse && this.open) || (!this.collapse && !this.open)
  },
  methods: {
    handleCollapse() {
      if (typeof this.beforeCollapse === 'function') {
        // beforeCollapse回调默认传入两个参数，参数1为当前面板伸缩状态，参数2为执行伸缩的函数
        this.beforeCollapse(this.isActive, this.display);
      } else {
        this.display()
      }
    },
    display(cancel) {
      // 若cancel为false则取消面板的伸缩，注意是严格为`false`时
      if (cancel !== false) this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
$-panel-head-height: 50px;
$-panel-head-height-middle: 42px;
$-panel-head-height-small: 36px;

.panel {
  background: #ffffff;

  &--border {
    border: 1px solid $--border-color-lighter;
  }

  &-head {
    height: $-panel-head-height;
    line-height: $-panel-head-height;
    padding: 0 15px;
    font-size: 18px;
    position: relative;

    &--middle {
      height: $-panel-head-height-middle;
      line-height: $-panel-head-height-middle;
      font-size: 16px;

      .panel-head__title {
        &-icon {
          width: 28px;
          height: 28px;
        }
      }
    }
    &--small {
      height: $-panel-head-height-small;
      line-height: $-panel-head-height-small;
      font-size: 14px;
    }
    &--split {
      border-bottom: 1px solid $--border-color-lighter;
    }
    &--tag {
      padding-left: 30px;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 15px;
        width: 4px;
        height: 1.1em;
        border-radius: 2px;
        margin-top: 1px;
        transform: translateY(-50%);
        background: $color-primary;
      }
    }
    &__title {
      display: inline-flex;
      align-items: center;
      margin: 0;
      font-size: inherit;

      &-icon {
        width: 34px;
        height: 34px;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 7px;
      }
      [class*="el-icon-"] {
        width: auto;
        height: auto;
        font-size: 1.8em;
      }
    }
    &__left {
      display: inline-block;
      padding-left: 10px;
      font-size: 14px;
      vertical-align: top;
    }
    &__right {
      float: right;
      font-size: 14px;
    }
    &__collapse {
      float: right;
      height: 100%;
      line-height: inherit;
      margin-left: 15px;
      font-size: 18px;
      font-weight: bold;
      color: #aaaaaa;
      cursor: pointer;
      transition: all 0.2s linear;

      &:hover {
        color: $--color-primary;
      }
      &.is-active {
        transform: rotate(180deg);
      }
    }
  }

  &-body {
    padding: 15px;
    position: relative;
  }
}
</style>
