<template>
    <div class="BasketballAnalyse">
        <title>BasketballAnalyse</title>
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
            <Tabs type="card">
                <TabPane label="数据" icon="ios-basketball">
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <h2 align="cen" style="color:green;">平均</h2>
                        <div>
                            <tr style="background:#cba;">
                                <th style="background:#abc;">
                                    <div :class="table_width" :title="this.name">{{this.team_name}}</div>
                                </th>
                                <th width="100">一</th>
                                <th width="100">二</th>
                                <th width="100">三</th>
                                <th width="100">四</th>
                                <th width="200">上下</th>
                                <th width="200">全场</th>
                                <th width="200">数量</th>
                                <th width="200">大球</th>
                            </tr>
                            <tr>
                                <td width="10rem" style="background:#fcc;">主队</td>
                                <td width="100">{{this.analyse.HTFirstScore}}</td>
                                <td width="100">{{this.analyse.HTSecondScore}}</td>
                                <td width="100">{{this.analyse.HTThirdScore}}</td>
                                <td width="100">{{this.analyse.HTFourthScore}}</td>
                                <td width="200">{{this.analyse.HTFirstScore+this.analyse.HTSecondScore}}/{{this.analyse.HTThirdScore+this.analyse.HTFourthScore}}</td>
                                <td width="200">{{this.analyse.HTFirstScore+this.analyse.HTSecondScore+this.analyse.HTThirdScore+this.analyse.HTFourthScore}}</td>
                                <td width="200">{{this.analyse.MatchCount}}</td>
                                <td width="200">{{this.analyse.HTMatchBig}}</td>
                            </tr>
                            <tr>
                                <td width="10rem" style="background:#fcc;">客队</td>
                                <td width="100">{{this.analyse.VTFirstScore}}</td>
                                <td width="100">{{this.analyse.VTSecondScore}}</td>
                                <td width="100">{{this.analyse.VTThirdScore}}</td>
                                <td width="100">{{this.analyse.VTFourthScore}}</td>
                                <td width="200">{{this.analyse.VTFirstScore+this.analyse.VTSecondScore}}/{{this.analyse.VTThirdScore+this.analyse.VTFourthScore}}</td>
                                <td width="200">{{this.analyse.VTFirstScore+this.analyse.VTSecondScore+this.analyse.VTThirdScore+this.analyse.VTFourthScore}}</td>
                                <td width="200">{{this.analyse.MatchCount}}</td>
                                <td width="200">{{this.analyse.VTMatchBig}}</td>
                            </tr>
                        </div>
                    </table>
                    <br />
                    <br />
                    <br />
                    <table style="border:0.1rem #abc solid;" border='1'>
                        <h2 align="cen" style="color:green;">比赛记录</h2>
                        <div v-for="data in match">
                            <tr style="background:#cba;">
                                <th style="background:#abc;">
                                    <div :class="table_width">{{data.MatchTime}}</div>
                                </th>
                                <th width="100">1</th>
                                <th width="100">2</th>
                                <th width="100">3</th>
                                <th width="100">4</th>
                                <th width="200">上下</th>
                                <th width="200">全场</th>
                                <th width="200">大小</th>
                                <th width="200">让分</th>
                            </tr>
                            <tr>
                                <td style="background:#fcc;">
                                    <div :class="table_width" :title="data.HTName">{{data.HTName}}</div>
                                </td>
                                <td width="100">{{data.HTFirst}}</td>
                                <td width="100">{{data.HTSecond}}</td>
                                <td width="100">{{data.HTThird}}</td>
                                <td width="100">{{data.HTFourth}}</td>
                                <td width="200">{{data.HTFirst+data.HTSecond}}/{{data.HTThird+data.HTFourth}}</td>
                                <td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth}}</td>
                                <td width="200">{{data.ExpectTotal}}</td>
                                <td width="200">{{(data.ExpectTotal+data.ExpectDiff)/2}}</td>
                            </tr>
                            <tr>
                                <td style="background:#edf;">
                                    <div :class="table_width" :title="data.VTName">{{data.VTName}}</div>
                                </td>
                                <td width="100">{{data.VTFirst}}</td>
                                <td width="100">{{data.VTSecond}}</td>
                                <td width="100">{{data.VTThird}}</td>
                                <td width="100">{{data.VTFourth}}</td>
                                <td width="200">{{data.VTFirst+data.VTSecond}}/{{data.VTThird+data.VTFourth}}</td>
                                <td width="200">{{data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
                                <td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth+data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
                                <td width="200">{{data.ExpectDiff}}</td>
                            </tr>
                            <br />
                        </div>
                    </table>
                </TabPane>
                <TabPane label="分析" icon="ios-football">
                    <div id="myChart" :style="{width: '100%', height: '30rem'}"></div>
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
            name: 'NBA_常规赛',
            team_name: '勇士',
            type: '',
            match: [],
            analyse: "",

            option: {
                title: {
                    text: '单节大球概率'
                },
                tooltip: {},
                legend: {
                    data: ['百分比']
                },
                xAxis: {
                    //data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
                    data: ["一", "二", "三", "四"]
                },
                yAxis: {},
                series: [{
                        name: "主队",
                        type: 'bar',
                        itemStyle: { normal: { color: 'rgba(181,195,52,1)', label: { show: true, textStyle: { color: '#27727B' } } } },
                        data: []
                    },
                    {
                        name: '客队',
                        type: 'bar',
                        itemStyle: { normal: { color: 'rgba(252,206,16,1)', label: { show: true, textStyle: { color: '#E87C25' } } } },
                        data: []
                    },
                ]
            }
        }

    },
    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.screen_width = screen.width;
        this.name = this.$route.query.name;
        this.team_name = this.$route.query.team_name;
        this.type = this.$route.query.type;

        var url = `/Api/Sports/Basketball/Finish/Analyse/${this.name}/${this.type}/${this.team_name}`;
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                for (var i = 0; i < response.data.data.length; i++) {
                    this.match.push(response.data.data[i]);
                }
                this.analyse = response.data.analyse
                this.option.series[0].data = [this.analyse.HTFirstBig, this.analyse.HTSecondBig, this.analyse.HTThirdBig, this.analyse.HTFourthBig]
                this.option.series[1].data = [this.analyse.VTFirstBig, this.analyse.VTSecondBig, this.analyse.VTThirdBig, this.analyse.VTFourthBig]
            } else if (response.data == this.GLOBAL.TokenError) {
                this.$Message.success('以下内容登录可查看，请登录!');
            }
        }, response => {
            console.log(response);
        })
    },
    methods: {
        drawLine: function() {
            //指定图标的配置和数据 

            var myChart = this.$echarts.init(document.getElementById('myChart')); //使用制定的配置项和数据显示图表 
            myChart.setOption(this.option);
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
</style>