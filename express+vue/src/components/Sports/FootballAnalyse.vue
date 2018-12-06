<template>
    <div class="BasketballAnalyse">
        <title>BasketballAnalyse</title>
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="数据" icon="ios-basketball">
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
                </TabPane>
                <TabPane label="分析" icon="ios-football">
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

            FootballGoalTime: {
                title: {
                    text: '进球时间段'
                },
                tooltip: {},
                legend: {
                    data: ['百分比']
                },
                xAxis: {
                    //data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
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
                    //data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
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
        this.screen_width = screen.width;
        this.name = this.$route.query.name;
        console.log(this.name);

        var url = `/api/Finish/FootballAnalyse/${this.name}`;
        this.$ajax.get(url).then(response => {
            if (response.data.status == 1) {
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
            }
        }, response => {
            console.log(response);
        })
    },
    methods: {
        drawLine: function() {
            //指定图标的配置和数据 

            var FootballGoalTime = this.$echarts.init(document.getElementById('FootballGoalTime')); //使用制定的配置项和数据显示图表 
            FootballGoalTime.setOption(this.FootballGoalTime);
            var UpEffectDown = this.$echarts.init(document.getElementById('UpEffectDown')); //使用制定的配置项和数据显示图表 
            UpEffectDown.setOption(this.UpEffectDown);
        }
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
    }
}
</script>
<style>
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
</style>