<template>
    <div class="Sports">
        <title>Sports</title>
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="Football" icon="ios-football">
                    <Row>
                        <Col span="24">
                        <Select v-model="SelectFootballMatch" size="small" filterable multiple>
                            <Option v-for="item in FootballMatchList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <div v-for="data in live_football">
                            <tr style="background:#cba;">
                                <td width="200" style="background:#fcc;" class="table_td">
                                    <router-link :to="{name:'FootballAnalyse', query:{name:data.football_data.HTName}}">
                                        {{data.football_data.HTName}}
                                    </router-link>
                                </td>
                                <td width="300" style="background:#abc;">
                                    <router-link :to="{name:'FootballAnalyse', query:{name:data.football_data.Name}}">
                                        {{data.football_data.Name}} {{data.football_data.EventSta}}
                                    </router-link>
                                </td>
                                <td width="200" style="background:#edf;" class="table_td">
                                    <router-link :to="{name:'FootballAnalyse', query:{name:data.football_data.VTName}}">
                                        {{data.football_data.VTName}}
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td width="100" :class="{sport_back_color:(data.football_data.HTTotalScore==data.football_data.HTHalfScore)}">{{data.football_data.HTTotalScore}}</td>
                                <td width="200">全场比分</td>
                                <td width="100" :class="{sport_back_color:(data.football_data.VTTotalScore==data.football_data.VTHalfScore)}">{{data.football_data.VTTotalScore}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.HTHalfScore}}</td>
                                <td width="200">半场比分</td>
                                <td width="100">{{data.football_data.VTHalfScore}}</td>
                            </tr>
                            <tr>
                                <td width="100" :class="{sport_back_color:(data.football_data.HTShoot>=15)}">{{data.football_data.HTShoot}}</td>
                                <td width="200">射门</td>
                                <td width="100" :class="{sport_back_color:(data.football_data.VTShoot>=15)}">{{data.football_data.VTShoot}}</td>
                            </tr>
                            <tr>
                                <td width="100" :class="{sport_back_color:(data.football_data.HTShooton>=10)}">{{data.football_data.HTShooton}}</td>
                                <td width="200">射正</td>
                                <td width="100" :class="{sport_back_color:(data.football_data.VTShooton>=10)}">{{data.football_data.VTShooton}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.HTHalfCorner}}</td>
                                <td width="200">半场角球</td>
                                <td width="100">{{data.football_data.VTHalfCorner}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.HTTotalCorner}}</td>
                                <td width="200">全场角球</td>
                                <td width="100">{{data.football_data.VTTotalCorner}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.Asionodd}}</td>
                                <td width="200">盘口</td>
                                <td width="100">{{data.football_data.Numodd}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.HTRed}}</td>
                                <td width="200">红牌</td>
                                <td width="100">{{data.football_data.VTRed}}</td>
                            </tr>
                            <tr>
                                <td width="100">{{data.football_data.HGoalTime}}</td>
                                <td width="200">进球时间</td>
                                <td width="100">{{data.football_data.VGoalTime}}</td>
                            </tr>
                            <br />
                        </div>
                    </table>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
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
            timer: null,
        }

    },
    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.screen_width = screen.width;
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()

        var url = "/Api/Sports/BasketBall/Live";
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {

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
            } else if (response.data == this.GLOBAL.TokenError) {
                this.$Message.success('以下内容登录可查看，请登录!');
            }
        }, response => {
            console.log(response);
        })


        var url = "/Api/Sports/FootBall/Live";
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                var nRefreash = 0;
                for (var key in response.data.data) { // 遍历Map
                    if (nRefreash == 0) {
                        nRefreash = 1;
                        this.live_football = [];
                        if (this.SelectFootballMatch.length == 0) {
                            this.FootballMatchList = [];
                        }
                    }

                    for (var i = response.data.data[key].length - 1; i >= 0; i--) {
                        if (this.SelectFootballMatch.indexOf(key) != -1 || this.SelectFootballMatch.length == 0) {
                            this.live_football.push({ "football_data": response.data.data[key][i] });
                        }
                    }

                    if (this.FootballMatchList.indexOf(key) == -1) {
                        this.FootballMatchList.push(key)
                    }
                }
            } else if (response.data == this.GLOBAL.TokenError) {
                this.$Message.success('以下内容登录可查看，请登录!');
            }

        }, response => {
            console.log(response);
        })
    },
    methods: {
        setTimer() {
            if (this.timer == null) {
                this.timer = setInterval(() => {

                    var url = "/Api/Sports/BasketBall/Live";
                    this.$ajax.get(url).then(response => {
                        if (response.data.status == this.GLOBAL.Success) {

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

                        } else if (response.data == this.GLOBAL.TokenError) {
                            this.$Message.success('以下内容登录可查看，请登录!');
                            if (this.timer) { //如果定时器在运行则关闭
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }
                    }, response => {
                        console.log(response);
                    })

                    var url = "/Api/Sports/FootBall/Live";
                    this.$ajax.get(url).then(response => {
                        if (response.data.status == this.GLOBAL.Success) {

                            var nRefreash = 0;
                            for (var key in response.data.data) { // 遍历Map
                                if (nRefreash == 0) {
                                    nRefreash = 1;
                                    this.live_football = [];
                                    if (this.SelectFootballMatch.length == 0) {
                                        this.FootballMatchList = [];
                                    }
                                }

                                for (var i = response.data.data[key].length - 1; i >= 0; i--) {
                                    if (this.SelectFootballMatch.indexOf(key) != -1 || this.SelectFootballMatch.length == 0) {
                                        this.live_football.push({ "football_data": response.data.data[key][i] });
                                    }
                                }

                                if (this.FootballMatchList.indexOf(key) == -1) {
                                    this.FootballMatchList.push(key)
                                }
                            }
                        } else if (response.data == this.GLOBAL.TokenError) {
                            this.$Message.success('以下内容登录可查看，请登录!');
                            if (this.timer) { //如果定时器在运行则关闭
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }

                    }, response => {
                        console.log(response);
                    })
                }, 1000)
            },
        }
    },
    computed: {
        table_width() {
            return [
                this.screen_width < 768 ? 'ph_table_width' : 'pc_table_width'
            ]
        }
    },
    beforeDestroy() {
        if (this.timer) { //如果定时器在运行则关闭
            clearInterval(this.timer);
            this.timer = null;
        }
    }
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