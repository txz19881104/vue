<template>
  <div id="app">
    <myMenu></myMenu>

    <!--
    <div v-if="screen_width > 768">
      <my-menu></my-menu>
    </div>
    <div v-else>
      <Menu mode="horizontal" theme="dark" class="style_hori" @on-select="onMenuSelect">
        <Row>
          <Col :xs="{ span: 16, offset: 0 }" :lg="{ span: 19, offset: 1 }">
            <MenuItem class="style_hor_pic" name=""><a href="/"><img src="./assets/logo.jpg" class="style_pic"></a></MenuItem>
            <MenuItem name="/Comics">漫画</MenuItem>
            <MenuItem name="/fiction">小说</MenuItem>
          </Col>
          <Col :xs="{ span: 8, offset: 0 }" :lg="{ span: 3, offset: 1 }">
            <MenuItem  name=""><Input v-model="value" placeholder="Searching..." ></Input></MenuItem>
          </Col>
        </Row>
      </Menu>
    </div>-->
    <router-view v-if="isRouterAlive"></router-view>
    <myFooter></myFooter>
  </div>
  
</template>

<script>
import myMenu from './components/Public/menusider.vue'
import myFooter from './components/Public/footer.vue'
export default {
  name: 'App',
  components :{
    myMenu,
    myFooter
  },  
  provide() {
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      screen_width: 200,
      title: "首页",
      value: '',
      isRouterAlive: true
    }
  },
  methods:{  

      onMenuSelect:function(name){  
        if (name == "/Comics") {
          this.title = "漫画";
        }
        else if (name == "/Fiction") {
          this.title = "小说";
        }
        else {
          this.title = "首页";
        }
        this.$refs.side_menu.updateOpened()
      },

      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      }

  },
  mounted() {
      this.screen_width = screen.width;
      }
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
.style_hori {
  background: #000;
}
.style_pic {
  margin-top: 0.3rem; 
}
.style_hor_pic {
  height:1rem;
}

</style>
