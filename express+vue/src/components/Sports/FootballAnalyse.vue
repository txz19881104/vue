<template>
    <div class="BasketballAnalyse">
        <title>BasketballAnalyse</title>
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="数据" icon="ios-football">
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <h2 align="cen" style="color:green;">进行中</h2>
                        <div v-for="data in live_football">
                            <tr style="background:#cba;">
                                <td width="200" style="background:#fcc;" class="table_td" @click="GetTeamStatics('ht', data.football_data)">
                                    {{data.football_data.HTName}}
                                </td>
                                <td width="300" style="background:#abc;">
                                    {{data.football_data.Name}} {{data.football_data.EventSta}}
                                </td>
                                <td width="200" style="background:#edf;" class="table_td" @click="GetTeamStatics('vt', data.football_data.VTName, data.football_data.VTNameAlias)">
                                    {{data.football_data.VTName}}
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
                            <tr>
                                <td width="100">{{data.football_data.HTStatic}}</td>
                                <td width="200">绝杀</td>
                                <td width="100">{{data.football_data.VTStatic}}</td>
                            </tr>
                            <br />
                        </div>
                    </table>
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <h2 align="cen" style="color:green;">完场</h2>
                        <div v-for="data in over_football">
                            <tr style="background:#cba;">
                                <td width="200" style="background:#fcc;" class="table_td">
                                    {{data.football_data.HTName}}
                                </td>
                                <td width="300" style="background:#abc;">
                                    {{data.football_data.Name}} {{data.football_data.EventSta}}
                                </td>
                                <td width="200" style="background:#edf;" class="table_td">
                                    {{data.football_data.VTName}}
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
                </TabPane>
                <TabPane label="分析" icon="ios-football">
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <h2 align="cen" style="color:green;">统计</h2>
                        <div>
                            <tr style="background:#cba;">
                                <th style="background:#abc;">
                                    <div :class="table_width" :title="this.name">{{this.name}}</div>
                                </th>
                                <th width="200" style="background:#fcc;">统计</th>
                                <th width="200" style="background:#fcc;">概率</th>
                            </tr>
                            <tr>
                                <td width="100">上半场</td>
                                <td width="100">{{(this.analyse.UpGoalCount/this.analyse.MatchTotal).toFixed(2)}}</td>
                                <td width="100">{{(this.analyse.UpHaveGoalMatch/this.analyse.MatchTotal).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td width="100">下半场</td>
                                <td width="100">{{(this.analyse.DownGoalCount/this.analyse.MatchTotal).toFixed(2)}}</td>
                                <td width="100">{{(this.analyse.DownHaveGoalMatch/this.analyse.MatchTotal).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td width="100">全场</td>
                                <td width="100">{{(this.analyse.GoalTotal/this.analyse.MatchTotal).toFixed(2)}}</td>
                                <td width="100">{{(this.analyse.AllHaveGoalMatch/this.analyse.MatchTotal).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td width="100">角球</td>
                                <td width="100">{{(this.analyse.CornerTotal/this.analyse.HaveCornerMatch).toFixed(2)}}</td>
                                <td width="100">有效：{{this.analyse.HaveCornerMatch}}</td>
                            </tr>
                            <tr>
                                <td width="100">射门</td>
                                <td width="100">{{(this.analyse.ShootCount/this.analyse.TotalShootMatch).toFixed(2)}}</td>
                                <td width="100">{{(this.analyse.ShootCount/this.analyse.GoalTotal).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td width="100">射正</td>
                                <td width="100">{{(this.analyse.ShootOnCount/this.analyse.TotalShootMatch).toFixed(2)}}</td>
                                <td width="100">{{(this.analyse.ShootOnCount/this.analyse.GoalTotal).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td width="100" style="overflow: hidden;text-overflow: ellipsis;">比赛数量</td>
                                <td width="100">总数：{{this.analyse.MatchTotal}}</td>
                                <td width="100">有效：{{this.analyse.TotalGoalTimeMatch}}</td>
                            </tr>
                        </div>
                    </table>
                    <div id="FootballGoalTime" :style="{width: '100%', height: '30rem'}"></div>
                    <div id="UpEffectDown" :style="{width: '100%', height: '30rem'}"></div>
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
            name: '',
            team_name: '',
            type: '',
            match: [],
            analyse: "",
            ht_statics: "",
            vt_statics: "",
            live_football: [],
            over_football: [],
            timer: null,

            FootballGoalTime: {
                title: {
                    text: '进球时间段'
                },
                tooltip: {},
                legend: {
                    data: ['百分比']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "概率",
                    type: 'line',
                    itemStyle: { normal: { color: 'rgba(181,195,52,1)', label: { show: true, textStyle: { color: '#27727B' } } } },
                    data: []
                }, ]
            },
            UpEffectDown: {
                title: {
                    text: '上半场进球数对下半场影响'
                },
                tooltip: {},
                legend: {
                    data: ['百分比']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: [],
                    type: 'bar',
                    itemStyle: { normal: { color: 'rgba(181,195,52,1)', label: { show: true, textStyle: { color: '#27727B' } } } },
                    data: []
                }, ]
            }
        }

    },
    mounted() {
        this.GLOBAL.GetGlobalValue()
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()

        this.screen_width = screen.width;
        this.name = this.$route.query.name;

        var url = `/Api/Sports/FootBall/Finish/Analyse/${this.name}`;
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                this.analyse = response.data.analyse
                for (var key in this.analyse.MapFootballGoal) {
                    this.FootballGoalTime.xAxis.data.push(key + "\n" + this.analyse.MapFootballGoal[key].GoalMatchNum)
                    this.FootballGoalTime.series[0].data.push((this.analyse.MapFootballGoal[key].GoalMatchNum / this.analyse.TotalGoalTimeMatch).toFixed(2))
                }
                for (var key in this.analyse.MapUpEffectDown) {
                    if (this.analyse.MapUpEffectDown[key].GoalHaveGoalMatch <= 99 && this.screen_width < 768) {
                        this.UpEffectDown.xAxis.data.push(key + "\n" + this.analyse.MapUpEffectDown[key].GoalHaveGoalMatch)
                    } else {
                        this.UpEffectDown.xAxis.data.push(key + "\n" + 99)
                    }

                    this.UpEffectDown.series[0].data.push((this.analyse.MapUpEffectDown[key].GoalHaveGoalMatch / this.analyse.MapUpEffectDown[key].GoalTotalGoalMatch).toFixed(2))
                }

                this.live_football = []
                if (response.data.data != null) {
                    for (var i = response.data.data.length - 1; i >= 0; i--) {
                        this.live_football.push({ "football_data": response.data.data[i] });
                    }
                }


                this.over_football = []
                if (response.data.over != null) {
                    for (var i = response.data.over.length - 1; i >= 0; i--) {
                        this.over_football.push({ "football_data": response.data.over[i] });
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
        GetTeamStatics: function(strH, stMatch) {
            var url = `/Api/Sports/FootBall/Finish/TeamAnalyse/${this.name}/${strH}/${stMatch.HTName}/${stMatch.HTNameAlias}`;
            if (strH == "vt") {
                url = `/Api/Sports/FootBall/Finish/TeamAnalyse/${this.name}/${strH}/${stMatch.VTName}/${stMatch.VTNameAlias}`;
            }

            this.$ajax.get(url).then(response => {
                if (response.data.status == this.GLOBAL.Success) {
                    if (strH == "ht") {
                        stMatch.HTStatic = response.data.data
                    } else {
                        stMatch.VTStatic = response.data.data
                    }
                } else if (response.data == this.GLOBAL.TokenError) {
                    this.$Message.success('以下内容登录可查看，请登录!');
                }
            }, response => {
                console.log(response);
            })
        },

        drawLine: function() {
            //指定图标的配置和数据 

            var FootballGoalTime = this.$echarts.init(document.getElementById('FootballGoalTime')); //使用制定的配置项和数据显示图表 
            FootballGoalTime.setOption(this.FootballGoalTime);
            var UpEffectDown = this.$echarts.init(document.getElementById('UpEffectDown')); //使用制定的配置项和数据显示图表 
            UpEffectDown.setOption(this.UpEffectDown);
        },

        setTimer() {
            if (this.timer == null) {
                this.timer = setInterval(() => {
                    var url = `/Api/Sports/FootBall/Finish/TeamAnalyse/${this.name}`;
                    this.$ajax.get(url).then(response => {
                        if (response.data.status == this.GLOBAL.Success) {
                            this.live_football = []
                            if (response.data.data != null) {
                                for (var i = response.data.data.length - 1; i >= 0; i--) {
                                    this.live_football.push({ "football_data": response.data.data[i] });
                                }
                            }


                            this.over_football = []
                            if (response.data.over != null) {
                                for (var i = response.data.over.length - 1; i >= 0; i--) {
                                    this.over_football.push({ "football_data": response.data.over[i] });
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
            }
        },
    },
    computed: {
        table_width() {
            return [
                this.screen_width < 768 ? 'ph_table_width' : 'pc_table_width'
            ]
        },
    },
    updated: function() {
        this.drawLine()
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
.table_td {
    height: 1.5rem;
    line-height: 2rem;
    text-align: left;
    overflow: hidden;
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
    background: #cba;
}
</style>