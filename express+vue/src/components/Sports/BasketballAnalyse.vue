<template>
	<div class="BasketballAnalyse">
		<title>BasketballAnalyse</title>
		<Row class="style_magin_top">
			<Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}"  class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;"> 
			    <Tabs type="card">
			        <TabPane label="Basketball" icon="ios-basketball">

			        	<table style="border:0.1rem #abc solid;"  border='1'>
			        		<h2 align="cen" style="color:green;">平均</h2>
			        		<div>
								<tr style="background:#cba;">
									<th style="background:#abc;"><div :class="table_width" :title="this.name">{{this.team_name}}</div></th>
									<th width="100">一</th>
									<th width="100">二</th>
									<th width="100">三</th>
									<th width="100">四</th>
									<th width="200">上下</th>
									<th width="200">全场</th>
									<th width="200">数量</th>
									<th width="200">大小</th>
								</tr>
								<tr>
									<td width="10rem" style="background:#fcc;">主场</td>
									<td width="100">{{this.Total.HTFirst}}</td>
									<td width="100">{{this.Total.HTSecond}}</td>
									<td width="100">{{this.Total.HTThird}}</td>
									<td width="100">{{this.Total.HTFourth}}</td>
									<td width="200">{{this.Total.HTFirst+this.Total.HTSecond}}/{{this.Total.HTThird+this.Total.HTFourth}}</td>
									<td width="200">{{this.Total.HTFirst+this.Total.HTSecond+this.Total.HTThird+this.Total.HTFourth}}</td>
									<td width="200">{{this.Total.HTCount}}</td>
									<td width="200">{{this.Total.HTBig}}/{{this.Total.HTBigSelf}}</td>
								</tr>
								<tr>
									<td width="10rem" style="background:#fcc;">客场</td>
									<td width="100">{{this.Total.VTFirst}}</td>
									<td width="100">{{this.Total.VTSecond}}</td>
									<td width="100">{{this.Total.VTThird}}</td>
									<td width="100">{{this.Total.VTFourth}}</td>
									<td width="200">{{this.Total.VTFirst+this.Total.VTSecond}}/{{this.Total.VTThird+this.Total.VTFourth}}</td>
									<td width="200">{{this.Total.VTFirst+this.Total.VTSecond+this.Total.VTThird+this.Total.VTFourth}}</td>
									<td width="100">{{this.Total.VTCount}}</td>
									<td width="200">{{this.Total.VTBig}}/{{this.Total.VTBigSelf}}</td>
								</tr>
							</div>
				        </table>
			        	<br/>
			            <br/>
			            <br/>
						<table style="border:0.1rem #abc solid;"  border='1'>
							<h2 align="cen" style="color:green;">主场</h2>
							<div v-for="data in basketball_analyse_ht">
								<tr  style="background:#cba;">
									<th style="background:#abc;"><div :class="table_width">{{data.MatchTime}}</div></th>
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
									<td style="background:#fcc;"><div :class="table_width" :title="data.HTName">{{data.HTName}}</div></td>
									<td width="100">{{data.HTFirst}}</td>
									<td width="100">{{data.HTSecond}}</td>
									<td width="100">{{data.HTThird}}</td>
									<td width="100">{{data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond}}/{{data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.ExpectTotal}}</td>
									<td width="200">{{data.ExpectDiff}}</td>
								</tr>
								<tr>
									<td style="background:#edf;"><div :class="table_width" :title="data.VTName">{{data.VTName}}</div></td>
									<td width="100">{{data.VTFirst}}</td>
									<td width="100">{{data.VTSecond}}</td>
									<td width="100">{{data.VTThird}}</td>
									<td width="100">{{data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond}}/{{data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth+data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
									<td width="200">{{(data.ExpectTotal-data.ExpectDiff)/2}}</td>
								</tr>
								<br/>
				            </div>	
				        </table>
			            <br/>
			            <br/>
			            <br/>
				        <table style="border:0.1rem #abc solid;"  border='1'>
				            <h2 align="cen" style="color:green;">客场</h2>
							<div v-for="data in basketball_analyse_vt" >
								<tr  style="background:#cba;">
									<th style="background:#abc;"><div :class="table_width">{{data.MatchTime}}</div></th>
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
									<td style="background:#fcc;"><div :class="table_width" :title="data.HTName">{{data.HTName}}</div></td>
									<td width="100">{{data.HTFirst}}</td>
									<td width="100">{{data.HTSecond}}</td>
									<td width="100">{{data.HTThird}}</td>
									<td width="100">{{data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond}}/{{data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth}}</td>
									<td width="200">{{data.ExpectTotal}}</td>
									<td width="200">{{data.ExpectDiff}}</td>
								</tr>
								<tr>
									<td style="background:#edf;"><div :class="table_width" :title="data.VTName">{{data.VTName}}</div></td>
									<td width="100">{{data.VTFirst}}</td>
									<td width="100">{{data.VTSecond}}</td>
									<td width="100">{{data.VTThird}}</td>
									<td width="100">{{data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond}}/{{data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
									<td width="200">{{data.HTFirst+data.HTSecond+data.HTThird+data.HTFourth+data.VTFirst+data.VTSecond+data.VTThird+data.VTFourth}}</td>
									<td width="200">{{(data.ExpectTotal+data.ExpectDiff)/2}}</td>
								</tr>
								<br/>
				            </div>	
						</table>
			        </TabPane>
			        <TabPane label="Football" icon="ios-football">足球</TabPane>
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
			name:'',
			team_name:'',
			basketball_analyse_ht:[],
			basketball_analyse_vt:[],
			Total: {"HTCount":0, "HTFirst":0, "HTSecond":0, "HTThird":0, "HTFourth":0, "HTBig":0, "HTBigSelf":0,
					"VTCount":0, "VTFirst":0, "VTSecond":0, "VTThird":0, "VTFourth":0, "VTBig":0, "VTBigSelf":0},
		}

	},
	mounted() {
		this.screen_width = screen.width;
		this.name = this.$route.query.name;
		this.team_name = this.$route.query.team_name;


		var url = `/api/Finish/BasketballAnalyse/${this.name}/ht/${this.team_name}`;
		this.$ajax.get(url).then(response => {
			for (var i = 0; i < response.data.data.length; i++) {
				var temp = response.data.data[i];
				this.basketball_analyse_ht.push(temp);
				
				this.Total.HTCount++;
				this.Total.HTFirst += temp.HTFirst;
				this.Total.HTSecond += temp.HTSecond;
				this.Total.HTThird += temp.HTThird;
				this.Total.HTFourth += temp.HTFourth;
				if ((temp.HTFirst+temp.HTSecond+temp.HTThird+temp.HTFourth+temp.VTFirst+temp.VTSecond+temp.VTThird+temp.VTFourth)>temp.ExpectTotal) {
					this.Total.HTBig++;
				}
				if ((temp.HTFirst+temp.HTSecond+temp.HTThird+temp.HTFourth)>((temp.ExpectTotal-temp.ExpectDiff)/2)) {
					this.Total.HTBigSelf++;
				}
			}

			if (this.Total.HTCount > 1) {
				this.Total.HTFirst = parseInt(this.Total.HTFirst/this.Total.HTCount);
				this.Total.HTSecond = parseInt(this.Total.HTSecond/this.Total.HTCount);
				this.Total.HTThird = parseInt(this.Total.HTThird/this.Total.HTCount);
				this.Total.HTFourth = parseInt(this.Total.HTFourth/this.Total.HTCount);
			}

		}, response => {
		  console.log(response);
		}) 

		var url = `/api/Finish/BasketballAnalyse/${this.name}/vt/${this.team_name}`;
		this.$ajax.get(url).then(response => {
			for (var i = 0; i < response.data.data.length; i++) {
				var temp = response.data.data[i];
				this.basketball_analyse_vt.push(temp);

				this.Total.VTCount++;
				this.Total.VTFirst += temp.VTFirst;
				this.Total.VTSecond += temp.VTSecond;
				this.Total.VTThird += temp.VTThird;
				this.Total.VTFourth += temp.VTFourth;
				if ((temp.HTFirst+temp.HTSecond+temp.HTThird+temp.HTFourth+temp.VTFirst+temp.VTSecond+temp.VTThird+temp.VTFourth)>temp.ExpectTotal) {
					this.Total.VTBig++;
				}
				if ((temp.VTFirst+temp.VTSecond+temp.VTThird+temp.VTFourth)>((temp.ExpectTotal+temp.ExpectDiff)/2)) {
					this.Total.VTBigSelf++;
				}
			}

			if (this.Total.VTCount > 1) {
				this.Total.VTFirst = parseInt(this.Total.VTFirst/this.Total.VTCount);
				this.Total.VTSecond = parseInt(this.Total.VTSecond/this.Total.VTCount);
				this.Total.VTThird = parseInt(this.Total.VTThird/this.Total.VTCount);
				this.Total.VTFourth = parseInt(this.Total.VTFourth/this.Total.VTCount);
			}
		}, response => {
		  console.log(response);
		}) 
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
	.table_td{
		height: 1.5rem;
		line-height: 2rem;
		text-align: left;
		overflow: hidden;
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
</style>