<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
        <!-- 菜单 -->
        <myMenu></myMenu>
        <!-- 脚 -->
        <myFooter></myFooter>
    </div>
</template>
<script>
import myMenu from './components/Public/menusider.vue'
import myFooter from './components/Public/footer.vue'
export default {
    name: 'App',
    components: {
        myMenu,
        myFooter
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            title: "首页",
            isRouterAlive: true
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    },
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>