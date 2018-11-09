<template>
  <div>
    <div class="menu">
      <div class="menumainicon">
        <Icon @click.native="collapsedSider()" :class="rotateIcon" :style="{margin: '1rem 1rem',color: '#FF7F50'}" type="navicon-round" size="40"></Icon>
      </div>
      <Sider ref="side1" hide-trigger collapsible collapsed-width="0" width="250px" v-model="isCollapsed" :style="{background: '#fff' }">
        <div v-if="isCollapsed === false">
          <div class="sidebar-overlay active" @click="collapsedSider()"></div>
        </div>

        <Menu theme="dark" mode="vertical" active-name="/" width="250px" @on-select="onMenuSelect" :class="menuitemClasses" accordion>
          <template v-if="this.GLOBAL.IsLogin > 0"> 
            <MenuItem name="/Person">
              <Icon type="android-happy"></Icon>
              <span>{{this.GLOBAL.UserName}}</span>
            </MenuItem>
          </template>
          <MenuItem name="/">
            <Icon type="home"></Icon>
            <span>首页</span>
          </MenuItem>
          <MenuItem name="/Comics">
            <Icon type="social-snapchat"></Icon>
            <span>漫画</span>
          </MenuItem>
          <MenuItem name="/Fiction">
            <Icon type="social-freebsd-devil"></Icon>
            <span>小说</span>
          </MenuItem>
          <MenuItem name="/Video">
            <Icon type="social-youtube"></Icon>
            <span>视频</span>
          </MenuItem>
          <MenuItem name="/Article">
            <Icon type="ios-list"></Icon>
            <span>文章</span>
          </MenuItem>
          <MenuItem name="/Sports">
            <Icon type="ios-football" />
            <span>体育</span>
          </MenuItem>
          <hr>
          <template v-if="this.GLOBAL.IsLogin == 0"> 
            <MenuItem name="/Login">
              <Icon type="person"></Icon>
              <span>登录</span>
            </MenuItem>
          </template>
          <template v-if="this.GLOBAL.IsLogin > 0"> 
            <li class="ivu-menu-item" @click="Logout">
              <Icon type="android-walk"></Icon>
              <span>登出</span>
            </li>
          </template>
          <li class="ivu-menu-item" @click="SettingWeb">
            <Modal v-model="setmodal" title="设置" @on-ok="ok" @on-cancel="cancel">
                <mySetting v-if="setmodal"></mySetting>
            </Modal>
            <Icon type="ios-gear"></Icon>
            <span>设置</span>
          </li>

          <hr>
          <li class="ivu-menu-item">
            <Input v-model="value" icon="search" placeholder="Searching..." @on-click="SearchByKey"></Input>
          </li>
        </Menu>
      </Sider>
    </div>
  </div>
</template>

<script>
    import mySetting from './Setting.vue'
    import myMenu from './menusider.vue'
    import qs from 'qs'
    export default {
        inject: ['reload'],
        data () {
            return {
                value: '',
                isCollapsed: true,
                setmodal: false,
                FictionBackgroundColor: this.GLOBAL.FictionBackgroundColor,
                FictionFontColor: this.GLOBAL.FictionFontColor,
                FictionFontSize: this.GLOBAL.FictionFontSize,
                ComicBackgroundColor: this.GLOBAL.ComicBackgroundColor
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        
        methods: {
  
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },

            onMenuSelect:function(name){  
              if (name != "")
              {
                this.$router.push(name);
                this.$refs.side1.toggleCollapse();
              }
              
            },

            SearchByKey:function(){
              this.$refs.side1.toggleCollapse();
              this.$router.push({ path: '/SearchResult', query: { keyword: this.value }});
            },

            Logout:function(){
              this.GLOBAL.IsLogin = 5
              this.$refs.side1.toggleCollapse();
              this.$router.push({ path: '/Login'});
            },

            SettingWeb:function() {
              this.setmodal=true;
              this.FictionBackgroundColor = this.GLOBAL.FictionBackgroundColor;
              this.FictionFontColor = this.GLOBAL.FictionFontColor;
              this.FictionFontSize = this.GLOBAL.FictionFontSize;
              this.ComicBackgroundColor = this.GLOBAL.ComicBackgroundColor;                
            },

            ok () {
                if (this.GLOBAL.IsLogin != 0) {
                  var url = "/api/ChangeSetting";
                  var UserSetting = "FictionBackgroundColor=" + this.GLOBAL.FictionBackgroundColor + ";FictionFontColor=" + this.GLOBAL.FictionFontColor + ";FictionFontSize=" + this.GLOBAL.FictionFontSize + ";ComicBackgroundColor=" + this.GLOBAL.ComicBackgroundColor;
                  this.$ajax.post(url, qs.stringify({  user: this.GLOBAL.UserName, setting: UserSetting} )).then(response=> {  
                    if (response.status == 200) {
                      if (response.data.status == 1) {
                        console.log("setting success!")
                        
                      }
                    }
                  }); 
                }

                this.$refs.side1.toggleCollapse();
                this.$Message.info('设置成功');
                this.reload();
            },

            cancel () {
              this.GLOBAL.FictionBackgroundColor = this.FictionBackgroundColor;
              this.GLOBAL.FictionFontColor = this.FictionFontColor;
              this.GLOBAL.FictionFontSize = this.FictionFontSize;
              this.GLOBAL.ComicBackgroundColor = this.ComicBackgroundColor;  
              this.$refs.side1.toggleCollapse();
              this.$Message.info('取消设置！');
            }
        },

        components: {
          myMenu,
          mySetting,
        }

    }
</script>

<style scoped>
  .menu {
    position: fixed;
    left: 0;
    top: 3rem;
    bottom: 0;
    z-index: 11;
    #min-width: 200px;
    #min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background: transparent;
  }

  .menumainicon {
    position: fixed;
    height: 2rem;
    left: 0;
    top: 0;
    z-index: 11;
    width: 1rem;
    background: transparent;

  }
  .menutest {
    overflow-y: hidden;
    overflow-x: hidden;
    z-index: 11;
    background: transparent;

  }
  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;

  }

  .menu-item i {
    transform: translateX(0rem);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;

  }

  .collapsed-menu span {
    width: 0rem;
    transition: width .2s ease;

  }

  .collapsed-menu i {
    transform: translateX(0.5rem);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .sidebar-overlay.active {
    opacity: .5;
    visibility: visible;
    -webkit-transition-delay: 0;
    -moz-transition-delay: 0;
    transition-delay: 0;
  }

  .sidebar-overlay {
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: #000;
    z-index: 8;
  }
.ivu-menu-item {
    display: block;
    outline: 0;
    list-style: none;
    font-size: 14px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}
</style>