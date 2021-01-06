<template>
  <div class="frame-wrapper">
    <!-- 头部 -->
    <header class="frame-header">
      <navbar />
    </header>

    <el-container class="frame-main-container">
      <!-- 标签栏 -->
      <el-header class="frame-tags" height="33px">
        <!-- <tagsbar /> -->
      </el-header>

      <!-- 主内容区 -->
      <el-main>
        <div class="frame-main">
          <transition name="fade-transform" mode="out-in">
            <!--            <keep-alive :include="$store.state.tagsbar.cachedViews">-->
            <!--              <router-view :key="$route.fullPath" />-->
            <!--            </keep-alive>-->
          </transition>
          <div class="tc color-c0 mgt-10 fz-12">Copyright&nbsp;1999-2020&nbsp;北京思特奇信息技术股份有限公司版权所有</div>
        </div>
      </el-main>
      <div class="tools-position">
        <!--        <Tools></Tools>-->
      </div>
    </el-container>

  </div>
</template>
<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'BaseLayout',
  components: {
    Navbar
  }
}
</script>

<style scoped>

</style>
