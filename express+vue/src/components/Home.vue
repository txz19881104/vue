
<template>
	<div class="home">
		<title>Txz</title>
		<Row>
			<img :src="pic_path" width="100%"/>
		</Row>
    
	</div>
</template>

<script>
export default {

	components :{
	},
	data() {
		return{
			pic_path:"../../static/phone0.jpg",
			screen_width: 200,
		}

	},
	mounted() {
    	this.screen_width = screen.width;
    	var randomNum0to4 = Math.round(Math.random() * 4);
    	if (this.screen_width < 768) {
    		this.pic_path = "../../static/phone" + randomNum0to4 + ".jpg"
    	} else {
    		this.pic_path = "../../static/computer" + randomNum0to4 + ".jpg"
    	}
    	
	},
}

</script>
