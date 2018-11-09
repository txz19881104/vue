<template>
  <div class="FootballAnalyse">
    <title>FootballAnalyse</title>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="loading == false" class="">
      <div class="pannal-board">
        <div style="margin-top: 5px;">
          <Row type="flex">
            <template v-for="item in betShootInfo">
              <Col :xs="24" :sm="12" :md="12" :lg="12">
              <div style="margin: 1%; width: 98%; padding: 1%; border: 1px solid #ddd">
                <div style="height: 16px">
                  <div class="left">
                    <router-link :to="{path:'/header/searchmatchdetail',query:{match:item.Eventmatch}}" class="">
                    <span :class=" { matchcolor1: item.Color ,matchcolor2: !item.Color}">
                      {{item.Eventmatch}}
                    </span>
                    </router-link>
                    {{item.Eventsta}}
                  </div>
                  <div class="right" style="text-align:right;">{{item.Eventtime}}</div>
                </div>
                <div style="height: 16px;text-align: center">
                  <div class="box">
                    <div class="row">
                      <span class="spanr">{{item.HRed}}</span>
                      <span class="spany"> {{item.HYellow}}</span>
                      {{item.HRank}} {{item.Hostteam}}
                    </div>
                    <div class="row" style="color: #0e66e6">{{item.Score}}</div>
                    <div class="row">{{item.Guestteam}} {{item.GRank}}
                      <span class="spany"> {{item.GYellow}}</span>
                      <span class="spanr">{{item.GRed}}</span>
                    </div>
                  </div>
                </div>
                <div style="height: 16px;text-align: center">
                  <div class="box">
                    <div class="row" style="color: #27c333">{{item.Asionodd}}</div>
                    <div class="row">{{item.Halfscore}}</div>
                    <div class="row" style="color: #27c333">{{item.Numodd}}</div>
                  </div>
                </div>
                <div style="height: 16px; width: 240px;margin: 0 auto">
                  <div class="box">
                    <div class="row1">
                      <template v-if="item.HShoot">
                        <div class="row2"><span style=" color: black;">{{item.HShoot}}</span></div>
                        <div class="row2"><span>射门</span></div>
                        <div class="row2"><span style=" color: black;">{{item.GShoot}}</span></div>
                      </template>
                    </div>
                    <div class="row1">
                      <template v-if="item.HShooton">
                        <div class="row2"><span>{{item.HShooton}}</span></div>
                        <div class="row2"><span>射正</span></div>
                        <div class="row2"><span>{{item.GShooton}}</span></div>
                      </template>
                    </div>
                    <div class="row1">
                      <template v-if="item.HCorner">
                        <div class="row2"><span>{{item.HCorner}}</span></div>
                        <div class="row2"><span>角球</span></div>
                        <div class="row2"><span>{{item.GCorner}}</span></div>
                      </template>
                    </div>
                    <div class="row1">
                      <template v-if="item.HCorner">
                        <div class="row2"><span>{{item.HHalfconer}}</span></div>
                        <div class="row2"><span>半角</span></div>
                        <div class="row2"><span>{{item.GHalfconer}}</span></div>
                      </template>
                    </div>
                  </div>
                </div>
                <div style=" margin:auto 20px;text-align: right">
                  {{item.Detilcase}}
                </div>
              </div>
              </Col>
            </template>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        betShootInfo: '',
        loading: false,
        get: null,
        error: null
      }
    },
    components: {},
    created() {
      let that = this;
      that.initData();
      setInterval(this.timer, 10000);
    }, methods: {
      initData: function () {
        let that = this;
        that.error = that.comicInfo = that.chapterimgs = that.betShootInfo = null;
        that.loading = true;
        //this.edittext = '';
        axios({
          method: 'get',
          url: '/api/get_bet_soccer_nowdetailsort',
        }).then(function (response) {
          that.betShootInfo = response.data;
          that.loading = false;
          //console.log(that.comicInfo);
        }).catch(function (response) {
          console.log(response);
        });
      },
      timer: function () {
        let that = this;
        axios({
          method: 'get',
          url: '/api/get_bet_soccer_nowdetailsort',
        }).then(function (response) {
          that.betShootInfo = response.data;
          that.loading = false;
          //console.log(that.comicInfo);
        }).catch(function (response) {
          console.log(response);
        });
      }
    }
  }
</script>


<style scoped>
  .pannal-board {
    padding: 0 2%;
    #background: #f3f3f3;
    border-radius: 4px;
    overflow: hidden;
  }
  .left {
    width: 50%;
    height: 100%;
    float: left;
    #display: flex;
    #align-items: center;
    #justify-content: flex-start;
  }
  .right {
    width: 50%;
    height: 100%;
    float: left;
    #display: flex;
    #align-items: center;
    #justify-content: flex-start;
  }
  .box {
    display: flex;
    flex-wrap: nowrap;
  }
  .box .spanr {
    background: #a62011;
    color: #f3f3f3;
    border-radius: 2px;
  }
  .box .spany {
    background: #FFEB3B;
    border-radius: 2px;
  }
  .row {
    flex-basis: 100%;
    display: flex;
  }
  .row1 {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
  .row:nth-child(1), .row2:nth-child(1) {
    justify-content: flex-end;
  }
  .row:nth-child(2) {
    justify-content: center;
    flex-basis: 110px;
  }
  .row:nth-child(3), .row2:nth-child(3) {
    justify-content: flex-start;
  }
  .row2 {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
  .row2:nth-child(1) span {
    width: 16px;
    text-align: right;
  }
  .row2:nth-child(2) span {
    width: 28px;
    text-align: center;
  }
  .row2:nth-child(3) span {
    width: 16px;
    text-align: left;
  }
  .matchcolor1 {
    color: #ff6a07;
  }
  .matchcolor2 {
    color: #089d20;
  }
</style>