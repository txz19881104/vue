<template>
	<div class="Sports">
		<title>Sports</title>
		<Row class="style_magin_top">
			<Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}"  class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;"> 
			    <Tabs type="card">
			        <TabPane label="Basketball" icon="ios-basketball">
						<table style="border:0.1rem #abc solid;"  border='1'>
							<div v-for="data in live_basketball" >
								<tr style="background:#cba;">
									<th  style="background:#abc;"><div :class="table_width" :title="data.basketball_data.Name">{{data.basketball_data.Name}}</div></th>
									<th width="100" :class="{back_color:(data.basketball_name.first.length!=1)}">{{data.basketball_name.first}}</th>
									<th width="100" :class="{back_color:(data.basketball_name.second.length!=1)}">{{data.basketball_name.second}}</th>
									<th width="100" :class="{back_color:(data.basketball_name.third.length!=1)}">{{data.basketball_name.third}}</th>
									<th width="100" :class="{back_color:(data.basketball_name.fourth.length!=1)}">{{data.basketball_name.fourth}}</th>
									<th width="200">上下</th>
									<th width="200">全场</th>
									<th width="200">大小</th>
								</tr>
								<tr>
									<td style="background:#fcc;" >
										<div :class="table_width" :title="data.basketball_data.HTName">
											<router-link :to="{name:'BasketballAnalyse', query:{name:data.basketball_data.Name, team_name:data.basketball_data.HTName}}">
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
											<router-link :to="{name:'BasketballAnalyse', query:{name:data.basketball_data.Name, team_name:data.basketball_data.VTName}}">
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
									<td width="200" style="background:#fcc;" >{{data.basketball_data.ExpectTotal}}</td>
								</tr>
								<br/>

				            </div>	
						</table>
			        </TabPane>
			        <TabPane label="Football" icon="ios-football">
						<table style="border:0.1rem #abc solid;"  border='1'>
							<div v-for="data in live_football" >
								<tr  style="background:#cba;">
									<th width="200" style="background:#abc;">{{data.Name}}</th>
									<th width="100">时间</th>
									<th width="100">半场</th>
									<th width="100">全场</th>
									<th width="100">射门</th>
									<th width="100">射正</th>
									<th width="100">角球</th>
									<th width="100">半角</th>
									<th width="100">红牌</th>
									<th width="100">黄牌</th>
								</tr>
								<tr>
									<td width="200" style="background:#fcc;" class="table_td">
										<router-link :to="{name:'BasketballAnalyse', query:{name:data.HTName}}">
											{{data.HTName}}
										</router-link>
									</td>
									<td width="100">{{data.HTFirst}}</td>
									<td width="100">{{data.HTSecond}}</td>
									<td width="100">{{data.HTThird}}</td>
									<td width="100">{{data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond}}/{{data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.ExpectTotal-0.5}}</td>
								</tr>
								<tr>
									<td width="200" style="background:#edf;" class="table_td">
										<router-link :to="{name:'BasketballAnalyse', query:{name:data.VTName}}">
											{{data.VTName}}
										</router-link>
									</td>
									<td width="100">{{data.VTFirst}}</td>
									<td width="100">{{data.VTSecond}}</td>
									<td width="100">{{data.VTThird}}</td>
									<td width="100">{{data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond}}/{{data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth+data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
								</tr>
								<br/>

				            </div>	
						</table>			        
					</TabPane>
			    </Tabs>
			</Col>
		</Row>
	</div>
</template>

<script>
export default {

	components :{
	},
	data() {
		return{
			screen_width: 200,
			live_basketball:[],
			
		}

	},
	mounted() {
		this.screen_width = screen.width;
		setInterval(this.timer, 1000);


		var url = "/api/Live/BasketBall";
		this.$ajax.get(url).then(response => {
			for (var i = 0; i < response.data.data.length; i++) {
				var temp = {"first":"一", "second":"二", "third":"三", "fourth":"四", };
				var time = response.data.data[i].MatchTime;
				if (response.data.data[i].MatchTime.search("第一节") != -1) {
					temp.first = time.substr(time.length-5,time.length);
				} else if (response.data.data[i].MatchTime.search("第二节") != -1) {
					temp.second = time.substr(time.length-5,time.length);
				} else if (response.data.data[i].MatchTime.search("第三节") != -1) {
					temp.third = time.substr(time.length-5,time.length);
				} else if (response.data.data[i].MatchTime.search("第四节") != -1) {
					temp.fourth = time.substr(time.length-5,time.length);
				}
				this.live_basketball.push({"basketball_name":temp, "basketball_data":response.data.data[i]});
			}
		}, response => {
		  console.log(response);
		}) 

	},
	methods: {
		timer: function () {
			
	        var url = "/api/Live/BasketBall";
			this.$ajax.get(url).then(response => {
				if (response.data.data.length > 0) {
					this.live_basketball = []
				}
				for (var i = 0; i < response.data.data.length; i++) {
					var temp = {"first":"一", "second":"二", "third":"三", "fourth":"四", };
					var time = response.data.data[i].MatchTime;
					if (response.data.data[i].MatchTime.search("第一节") != -1) {
						temp.first = time.substr(time.length-5,time.length);
					} else if (response.data.data[i].MatchTime.search("第二节") != -1) {
						temp.second = time.substr(time.length-5,time.length);
					} else if (response.data.data[i].MatchTime.search("第三节") != -1) {
						temp.third = time.substr(time.length-5,time.length);
					} else if (response.data.data[i].MatchTime.search("第四节") != -1) {
						temp.fourth = time.substr(time.length-5,time.length);
					}
					this.live_basketball.push({"basketball_name":temp, "basketball_data":response.data.data[i]});
				}
			}, response => {
			  console.log(response);
			}) 
	      }
    },
    computed: {
      table_width () {
          return [
              this.screen_width < 768 ? 'ph_table_width' : 'pc_table_width'
          ]
      }
  	},
}

</script>

<style>
	.style_magin_top {
		margin-top: 0.5rem;
	}

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        margin-top: -1rem;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 0.2rem;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 0.1rem solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 0.1rem;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }

	.pc_table_width{
		width: 10rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.ph_table_width{
		width: 4rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.back_color {
		background: #fcc;
	}
</style>