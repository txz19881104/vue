<template>
    <div class="FictionContentShow" :style="{background: this.GLOBAL.FictionBackgroundColor}">
        <title>{{name}}</title>
        <!--
    <Row v-bind:style="{background: color1}">
      <Col :xs="{ span: 2, offset: 1}" :lg="{ span: 2, offset: 2 }">
        <ColorPicker v-model="color1"/>
      </Col>-->
        <Row>
            <Col :xs="{ span: 22, offset: 1}" :lg="{ span: 16, offset: 4 }">
            <div class="box_con">
                <div class="bookname">
                    <h1>{{name}}</h1>
                </div>
                <div v-if="screen_width < 768">
                    <div class="content_mobile" :style="{'color': this.GLOBAL.FictionFontColor, 'font-size': this.GLOBAL.FictionFontSize-6 +'pt'}">
                        <span v-html="fiction_content"></span>
                    </div>
                </div>
                <div v-else>
                    <div class="content" :style="{'color': this.GLOBAL.FictionFontColor, 'font-size': this.GLOBAL.FictionFontSize +'pt'}">
                        <span v-html="fiction_content"></span>
                    </div>
                </div>
                <div class="bottem">
                    <ButtonGroup size="large" shape="circle">
                        <Button type="primary" @click="Backward">
                            <Icon type="chevron-left"></Icon>
                            上一章
                        </Button>
                        <Button type="primary" @click="Forward">
                            下一章
                            <Icon type="chevron-right"></Icon>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import merge from 'webpack-merge'
import qs from 'qs'
export default {

    name: 'ComicPicShow',
    inject: ['reload'],
    data() {
        return {
            name: '',
            path: '',
            read_num: 0,
            num: 0,
            page: 0,
            screen_height: 200,
            screen_width: 200,
            id: 0,
            fiction_content: "",
        }
    },

    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        this.num = this.$route.query.num;
        this.url = this.$route.query.url;
        this.read_num = this.$route.query.num;
        this.screen_height = screen.height;
        this.screen_width = screen.width;

        //var url = "http://" + this.GLOBAL.ServerIP + ":" + this.GLOBAL.ServerPort + `/Name/Fiction/${this.id}/Chapter/${this.read_num}`;
        var url = this.url
        this.$ajax.get(url).then(response => {
            this.fiction_content = response.data;
        }, response => {
            console.log(response);
        })

        this.SaveRecord()
    },

    methods: {
        Backward: function() {

            if (this.read_num > 1) {
                this.read_num = Number(this.read_num) - 1;
                this.SaveRecord()
                var url = `/api/Name/Fiction/${this.id}/Chapter/${this.read_num}`;
                this.$ajax.get(url).then(response => {
                    this.$router.push({ query: merge(this.$route.query, { 'name': response.data.data[0].ChapterName, 'num': this.read_num, 'url': response.data.data[0].ContentUrl }) })
                    this.reload();
                }, response => {
                    console.log(response);
                })
            } else {
                this.$Message.success('已经是最开始章节!');
            }
        },

        Forward: function() {
            if (this.read_num > 0) {
                this.read_num = Number(this.read_num) + 1;
                var url = `/api/Name/Fiction/${this.id}/Chapter/${this.read_num}`;
                this.$ajax.get(url).then(response => {

                    if (response.data.status == 1) {
                        if (response.data.data.length != 0) {
                            console.log(response.data.data[0].ContentUrl);
                            this.$router.push({ query: merge(this.$route.query, { 'name': response.data.data[0].ChapterName, 'num': this.read_num, 'url': response.data.data[0].ContentUrl }) })
                            this.SaveRecord()
                            this.reload();
                        } else {
                            this.read_num = Number(this.read_num) - 1;
                            this.$Message.success('暂无下一章节!');
                        }
                    } else {
                        this.read_num = Number(this.read_num) - 1;
                        this.$Message.success('暂无下一章节!');
                    }
                }, response => {
                    console.log(response);
                })
            }
        },

        SaveRecord: function() {
            if (this.GLOBAL.IsLogin != 0) {
                var url = "/api/UserCookie";
                this.$ajax.post(url, qs.stringify({ CookieType: 'Fiction', NameID: this.id, ChapterName: this.name, ReadNum: this.read_num, ReadUrl: this.url, User: this.GLOBAL.UserName })).then(response => {
                    if (response.status == 200) {
                        if (response.data.status == 1) {
                            console.log("记录成功");
                        } else {
                            console.log("记录失败");
                        }
                    } else {
                        console.log("记录失败");
                    }
                }, response => {
                    console.log("记录失败");
                });
            }

            var FictionCookie = "NameID=" + this.id + ";ChapterName=" + this.name + ";ReadNum=" + this.read_num + ";ReadUrl=" + this.url;
            sessionStorage.setItem('FictionCookie', FictionCookie);

        }
    },
}
</script>
<style scoped>
.content {
    font-family: 方正启体简体, "Microsoft YaHei", 微软雅黑, 宋体;
    line-height: 150%;
    width: 90%;
    margin: auto;
    text-align: left;
}

.content_mobile {
    font-family: 方正启体简体, "Microsoft YaHei", 微软雅黑, 宋体;
    letter-spacing: 0.1rem;
    line-height: 150%;
    width: 100%;
    margin: auto;
    text-align: left;
}

.box_con {
    border: 0.3rem solid #88C6E5;
    overflow: hidden;
    margin: 0.3rem auto;
}

.bookname {
    border-bottom: 0.2rem dashed #88C6E5;
    line-height: 2rem;
    padding-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
}

.bottem {
    border-top: 0.2rem dashed #88C6E5;
    clear: both !important;
    text-align: center;
    margin: auto 0.5rem;
    padding: 1rem;
}
</style>