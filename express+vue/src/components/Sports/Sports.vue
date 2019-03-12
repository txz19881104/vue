<template>
    <div class="Sports">
        <title>Sports</title>
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="Football" icon="ios-football">
                    <Row style="background:#eee;">
                        <div v-for="data in live_football">
                            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 10, offset: 1}" style="margin-top: 1rem; margin-bottom: 1rem; margin-right: 1.5rem;">
                            <Card :bordered="false">
                                <p slot="title">
                                    <router-link :to="{name:'FootballAnalyse', query:{name:data.name}}">
                                        {{data.name}}
                                    </router-link>
                                </p>
                                <table style="border:0.1rem #abc solid;" border='1'>
                                    <div>
                                        <tr style="background:#cba;">
                                            <th style="background:#abc;">
                                                <div :class="table_width" :title="data.name">
                                                    <router-link :to="{name:'FootballAnalyse', query:{name:data.name}}">
                                                        {{data.name}}
                                                    </router-link>
                                                </div>
                                            </th>
                                            <th width="200" style="background:#fcc;">统计</th>
                                            <th width="200" style="background:#fcc;">概率</th>
                                        </tr>
                                        <tr>
                                            <td width="100">上半场</td>
                                            <td width="100">{{(data.analyse.UpGoalCount/data.analyse.MatchTotal).toFixed(2)}}</td>
                                            <td width="100">{{(data.analyse.UpHaveGoalMatch/data.analyse.MatchTotal).toFixed(2)}}</td>
                                        </tr>
                                        <tr>
                                            <td width="100">下半场</td>
                                            <td width="100">{{(data.analyse.DownGoalCount/data.analyse.MatchTotal).toFixed(2)}}</td>
                                            <td width="100">{{(data.analyse.DownHaveGoalMatch/data.analyse.MatchTotal).toFixed(2)}}</td>
                                        </tr>
                                        <tr>
                                            <td width="100">全场</td>
                                            <td width="100">{{(data.analyse.GoalTotal/data.analyse.MatchTotal).toFixed(2)}}</td>
                                            <td width="100">{{(data.analyse.AllHaveGoalMatch/data.analyse.MatchTotal).toFixed(2)}}</td>
                                        </tr>
                                        <tr>
                                            <td width="100" style="overflow: hidden;text-overflow: ellipsis;">绝杀</td>
                                            <td width="100">{{(data.analyse.MapFootballGoal["75-90"].GoalNum/data.analyse.MapFootballGoal["75-90"].GoalMatchNum).toFixed(2)}}</td>
                                            <td width="100">{{(data.analyse.MapFootballGoal["75-90"].GoalMatchNum/data.analyse.TotalGoalTimeMatch).toFixed(2)}}</td>
                                        </tr>
                                        </tr>
                                        <tr>
                                            <td width="100" style="overflow: hidden;text-overflow: ellipsis;">比赛数量</td>
                                            <td width="100">总数：{{data.analyse.MatchTotal}}</td>
                                            <td width="100">有效：{{data.analyse.TotalGoalTimeMatch}}</td>
                                        </tr>
                                    </div>
                                </table>
                            </Card>
                            </Col>
                        </div>
                    </Row>
                </TabPane>
                <TabPane label="Basketball" icon="ios-basketball">
                    <Row>
                        <Col span="24">
                        <Select v-model="SelectBasketballMatch" size="small" filterable multiple>
                            <Option v-for="item in BasketballMatchList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <div v-for="data in live_basketball">
                            <tr>
                                <th style="background:#abc;">
                                    <div :class="table_width" :title="data.basketball_data.Name">{{data.basketball_data.Name}}</div>
                                </th>
                                <th width="100" :class="{sport_back_color:(data.basketball_name.first.length!=1)}">{{data.basketball_name.first}}</th>
                                <th width="100" :class="{sport_back_color:(data.basketball_name.second.length!=1)}">{{data.basketball_name.second}}</th>
                                <th width="100" :class="{sport_back_color:(data.basketball_name.third.length!=1)}">{{data.basketball_name.third}}</th>
                                <th width="100" :class="{sport_back_color:(data.basketball_name.fourth.length!=1)}">{{data.basketball_name.fourth}}</th>
                                <th width="200">上下</th>
                                <th width="200">全场</th>
                                <th width="200">大小</th>
                            </tr>
                            <tr>
                                <td style="background:#fcc;">
                                    <div :class="table_width" :title="data.basketball_data.HTName">
                                        <router-link :to="{name:'BasketballAnalyse', query:{name:data.basketball_data.Name, team_name:data.basketball_data.HTName, type:'ht'}}">
                                            {{data.basketball_data.HTName}}
                                        </router-link>
                                    </div>
                                </td>
                                <td width="100">{{data.basketball_data.HTFirst}}</td>
                                <td width="100">{{data.basketball_data.HTSecond}}</td>
                                <td width="100">{{data.basketball_data.HTThird}}</td>
                                <td width="100">{{data.basketball_data.HTFourth}}</td>
                                <td width="200">{{data.basketball_data.HTFirst+data.basketball_data.HTSecond}}/{{data.basketball_data.HTThird+data.basketball_data.HTFourth}}</td>
                                <td width="200">{{data.basketball_data.HTFirst+data.basketball_data.HTSecond+data.basketball_data.HTThird+data.basketball_data.HTFourth}}</td>
                                <td width="200">{{data.basketball_data.HTFirst+data.basketball_data.HTSecond+data.basketball_data.HTThird+data.basketball_data.HTFourth+data.basketball_data.VTFirst+data.basketball_data.VTSecond+data.basketball_data.VTThird+data.basketball_data.VTFourth}}</td>
                            </tr>
                            <tr>
                                <td style="background:#edf;">
                                    <div :class="table_width" :title="data.basketball_data.VTName">
                                        <router-link :to="{name:'BasketballAnalyse', query:{name:data.basketball_data.Name, team_name:data.basketball_data.VTName, type:'vt'}}">
                                            {{data.basketball_data.VTName}}
                                        </router-link>
                                    </div>
                                </td>
                                <td width="100">{{data.basketball_data.VTFirst}}</td>
                                <td width="100">{{data.basketball_data.VTSecond}}</td>
                                <td width="100">{{data.basketball_data.VTThird}}</td>
                                <td width="100">{{data.basketball_data.VTFourth}}</td>
                                <td width="200">{{data.basketball_data.VTFirst+data.basketball_data.VTSecond}}/{{data.basketball_data.VTThird+data.basketball_data.VTFourth}}</td>
                                <td width="200">{{data.basketball_data.VTFirst+data.basketball_data.VTSecond+data.basketball_data.VTThird+data.basketball_data.VTFourth}}</td>
                                <td width="200" style="background:#fcc;">{{data.basketball_data.ExpectTotal}}</td>
                            </tr>
                            <br />
                        </div>
                    </table>
                    <br />
                    <br />
                    <br />
                    <br />
                </TabPane>
            </Tabs>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {

    components: {},
    data() {
        return {
            screen_width: 200,

            live_basketball: [],
            SelectBasketballMatch: [],
            BasketballMatchList: [],

            live_football: [],
            SelectFootballMatch: [],
            FootballMatchList: [],
        }

    },
    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.screen_width = screen.width;
        setInterval(this.timer, 1000);

        var url = "/api/Live/BasketBall";
        this.$ajax.get(url).then(response => {
            if (response.data.status == 1) {

                for (var key in response.data.data) { // 遍历Map

                    var temp = { "first": "一", "second": "二", "third": "三", "fourth": "四", };
                    for (var i = response.data.data[key].length - 1; i >= 0; i--) {
                        var time = response.data.data[key][i].MatchTime;
                        if (time.search("第一节") != -1) {
                            temp.first = time.substr(time.length - 5, time.length);
                        } else if (time.search("第二节") != -1) {
                            temp.second = time.substr(time.length - 5, time.length);
                        } else if (time.search("第三节") != -1) {
                            temp.third = time.substr(time.length - 5, time.length);
                        } else if (time.search("第四节") != -1) {
                            temp.fourth = time.substr(time.length - 5, time.length);
                        }
                        this.live_basketball.push({ "basketball_name": temp, "basketball_data": response.data.data[key][i] });
                    }
                    this.BasketballMatchList.push(key)
                }
            }
        }, response => {
            console.log(response);
        })


        var url = "/api/Live/FootBall";
        this.$ajax.get(url).then(response => {
            if (response.data.status == 1) {
                var nRefreash = 0;
                for (var key in response.data.data) { // 遍历Map
                    for (var i = response.data.data[key].length - 1; i >= 0; i--) {
                        if (response.data.data[key].MapFootballGoal != null) {
                            this.live_football.push({ "analyse": response.data.data[key] });
                        }
                    }
                }
            }

        }, response => {
            console.log(response);
        })
    },
    methods: {
        timer: function() {

            var url = "/api/Live/BasketBall";
            this.$ajax.get(url).then(response => {
                if (response.data.status == 1) {

                    var nRefreash = 0;
                    for (var key in response.data.data) { // 遍历Map
                        if (nRefreash == 0) {
                            nRefreash = 1;
                            this.live_basketball = [];
                            if (this.SelectBasketballMatch.length == 0) {
                                this.BasketballMatchList = [];
                            }

                        }

                        if (this.SelectBasketballMatch.indexOf(key) != -1 || this.SelectBasketballMatch.length == 0) {

                            var temp = { "first": "一", "second": "二", "third": "三", "fourth": "四", };
                            for (var i = response.data.data[key].length - 1; i >= 0; i--) {
                                var time = response.data.data[key][i].MatchTime;
                                if (time.search("第一节") != -1) {
                                    temp.first = time.substr(time.length - 5, time.length);
                                } else if (time.search("第二节") != -1) {
                                    temp.second = time.substr(time.length - 5, time.length);
                                } else if (time.search("第三节") != -1) {
                                    temp.third = time.substr(time.length - 5, time.length);
                                } else if (time.search("第四节") != -1) {
                                    temp.fourth = time.substr(time.length - 5, time.length);
                                }
                                this.live_basketball.push({ "basketball_name": temp, "basketball_data": response.data.data[key][i] });
                            }
                            if (this.BasketballMatchList.indexOf(key) == -1) {
                                this.BasketballMatchList.push(key)
                            }
                        }
                    }

                }
            }, response => {
                console.log(response);
            })

            var url = "/api/Live/FootBall";
            this.$ajax.get(url).then(response => {
                this.live_football = []
                if (response.data.status == 1) {
                    for (var key in response.data.data) { // 遍历Map
                        if (response.data.data[key].MapFootballGoal != null) {
                            this.live_football.push({ "name": key, "analyse": response.data.data[key] });
                        }

                    }
                }
            }, response => {
                console.log(response);
            })
        },

    },
    computed: {
        table_width() {
            return [
                this.screen_width < 768 ? 'ph_table_width' : 'pc_table_width'
            ]
        }
    },
}
</script>
<style scoped>
.style_magin_top {
    margin-top: 0.5rem;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
    margin-top: -1rem;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
    background: #fff;
    padding: 0.2rem;
}

.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
}

.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    border-radius: 0;
    background: #fff;
}

.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    border-top: 0.1rem solid #3399ff;
}

.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active:before {
    content: '';
    display: block;
    width: 100%;
    height: 0.1rem;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
}

.pc_table_width {
    width: 10rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.ph_table_width {
    width: 4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.sport_back_color {
    background: #fcc;
}
</style>