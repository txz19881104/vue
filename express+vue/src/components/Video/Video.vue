<template>
	<div class="Video">
		<title>Txz</title>
		<Row>
			<Col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 24, offset: 0}" :lg="{ span: 24, offset: 0 }">
				<h2 style="margin-top: 10rem">To be continue...</h2>
				<video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
			</Col>
		</Row>
    
	</div>
</template>

<script>
export default {

	data()
	{
		return {
			playerOptions: { 
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度 
				autoplay: false, //如果true,浏览器准备好时开始回放。 
				muted: false, // 默认情况下将会消除任何音频。 
				loop: false, // 导致视频一结束就重新开始。 
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持） 
				language: 'zh-CN', aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。 
				sources: [
				{ 
					type: "video/mp4", 
					src: "https://txz-1256783950.cos.ap-beijing.myqcloud.com/Video/%E7%B2%89%E7%BA%A2%E7%8C%AA%E5%B0%8F%E5%A6%B9%20Peppa%20Pig%20%E7%AC%AC1%E5%AD%A3%E5%86%85%E5%B5%8C%E5%AD%97%E5%B9%95%E7%89%88/S1E01_%E8%B8%8F%E6%B0%B4%E5%9D%91.mp4" //url地址 
				}], 
				poster: "../../static/images/test.jpg", //你的封面地址 
				// width: document.documentElement.clientWidth, 
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。 
				controlBar: { 
					timeDivider: true, 
					durationDisplay: true, 
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮 
				} 
			}
		}
	},
	components: {
	},
	methods: {
		onPlayerPlay(player) {
	  		alert("play");
		},
		onPlayerPause(player){
	  		alert("pause");
		},
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
</style>