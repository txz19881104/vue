<template>
	<div class="Setting"> 	
	    <ul id="setting">
	    	<li>小说背景颜色设置:<ColorPicker v-model="FictionBackgroundColor" @on-open-change="ChangeFictionBackgroundColor" alpha style="margin-left: 3rem"/></li>
	    	<li>小说文字颜色设置:<ColorPicker v-model="FictionFontColor" @on-open-change="ChangeFictionTextColor" alpha style="margin-left: 3rem"/></li>
	    	<li>小说文字大小设置:<Slider v-model="FictionFontSize" @on-input="ChangeFictionFontSize" style="margin-left: 3rem"></Slider></li>
	    	<li>漫画背景颜色设置:<ColorPicker v-model="ComicBackgroundColor" @on-open-change="ChangeComicBackgroundColor" alpha style="margin-left: 3rem"/></li>
		</ul>
	</div>
</template>
<script>
    export default {
        inject: ['reload'],
        data () {
            return {
                FictionBackgroundColor: this.GLOBAL.FictionBackgroundColor,
                FictionFontColor: this.GLOBAL.FictionFontColor,
                FictionFontSize: this.GLOBAL.FictionFontSize,
                ComicBackgroundColor: this.GLOBAL.ComicBackgroundColor
            }
        },
        methods: {
        	ChangeFictionBackgroundColor:function(){
                this.GLOBAL.FictionBackgroundColor = this.FictionBackgroundColor;
        	},
        	ChangeFictionTextColor:function(){
                this.GLOBAL.FictionFontColor = this.FictionFontColor;
        	},
        	ChangeFictionFontSize:function(){
                this.GLOBAL.FictionFontSize = this.FictionFontSize;
        	},
        	ChangeComicBackgroundColor:function(){
                this.GLOBAL.ComicBackgroundColor = this.ComicBackgroundColor;
        	},
        },
        mounted() {
        },
    }
</script>

<style type="text/css">
	#setting li{  
		font-size: 14pt;
		font-weight: bolder; 
		list-style-image: none;  
		list-style-type: none;  
		margin: 0rem 2rem 1rem 1rem;
	}  
</style>
