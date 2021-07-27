<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>
      <router-link to="/">返回首页</router-link>
    </h3>
    <h3>
      <router-link to="/login">登陆首页</router-link>
    </h3>
    <h3>
      <router-link to="/index">展示首页</router-link>
    </h3>
    <h3>
      <router-link to="/404">404页</router-link>
    </h3>
    <h3>
      <router-link to="/BaseLayout">基础导航栏</router-link>
    </h3>
    <!--    <h3 onclick="abilityBool = !abilityBool">能力树-->
    <!--      <abilityTree v-if="abilityBool" @abilityEmit="getCheckedAbilities"></abilityTree>-->
    <!--    </h3>-->
  </div>
</template>
<script>
// import abilityTree from '../views/tree/abilityTree'
export default {
  components() {
    // abilityTree
  },
  data() {
    return {
      msg: '目录导航页',
      abilityBool: false
    }
  },
  methods: {
    getCheckedAbilities(data) {
      this.checkedList = data;
      console.log('jeishou', this.checkedList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
