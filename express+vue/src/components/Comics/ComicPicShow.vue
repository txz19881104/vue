<template>
    <div class="ComicPicShow" :style="{background: this.GLOBAL.ComicBackgroundColor}">
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
                <div class="content_comic_pic">
                    <div v-for="data in comic_content">
                        <img :src="data" :class="PicShow" style="display: block;">
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
            comic_content: [],
            color1: '#fff'
        }
    },

    computed: {
        PicShow() {
            return [
                this.screen_width < 768 ? 'pic_show' : 'pc_pic_show'
            ]
        }
    },

    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        this.num = this.$route.query.num;
        this.read_num = this.num;
        this.screen_height = screen.height;
        this.screen_width = screen.width;

        console.log(this.name);
        console.log(this.id);
        console.log(this.read_num);

        var url = `/Api/Entertainment/comic/${this.id}/Chapter/${this.read_num}`;
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                for (var i = 0; i < response.data.data.length; i++) {
                    this.comic_content.push(response.data.data[i].ImgSrc)
                }
            } else if (response.data == this.GLOBAL.TokenError) {
                this.GLOBAL.LogOut();
                this.$ajax.defaults.headers.common['Token'] = "";
            }
        }, response => {
            console.log(response);
        })

        for (var i = 1; i < this.page; i++) {
            var path = this.path + this.name + "/" + i + ".jgp";
            this.comic_content.push({ "path": path });
        }

        this.SaveRecord()
    },

    methods: {
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    if (this.read_num > 0) {
                        this.read_num = this.read_num + 1;
                        var url = `/Api/Entertainment/comic/${this.id}/Chapter/${this.read_num}`;
                        this.$ajax.get(url).then(response => {
                            if (response.data.status == this.GLOBAL.Success) {
                                for (var i = 1; i < response.data.data.length; i++) {
                                    this.comic_content.push(response.data.data[i].ImgSrc)
                                }
                            } else if (response.data == this.GLOBAL.TokenError) {
                                this.$Message.success('以下内容登录可查看，请登录!');
                            }
                        }, response => {
                            console.log(response);
                        })
                    }
                    resolve();
                }, 2000);
            });
        },

        Backward: function() {
            if (this.read_num > 1) {
                this.read_num = Number(this.read_num) - 1;
                this.SaveRecord()
                var url = `/Api/Entertainment/comic/${this.id}/Chapter/${this.read_num}`;
                this.$ajax.get(url).then(response => {
                    if (response.data.status == this.GLOBAL.Success) {
                        this.$router.push({ query: merge(this.$route.query, { 'name': response.data.data[0].ChapterName, 'num': this.read_num }) })
                        this.reload();
                    } else if (response.data == this.GLOBAL.TokenError) {
                        this.$Message.success('以下内容登录可查看，请登录!');
                    }
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
                var url = `/Api/Entertainment/comic/${this.id}/Chapter/${this.read_num}`;
                this.$ajax.get(url).then(response => {
                    if (response.data.status == this.GLOBAL.Success) {
                        if (response.data.data.length != 0) {
                            this.$router.push({ query: merge(this.$route.query, { 'name': response.data.data[0].ChapterName, 'num': this.read_num }) })
                            this.SaveRecord()
                            this.reload();
                        } else {
                            this.read_num = Number(this.read_num) - 1;
                            this.$Message.success('暂无下一章节!');
                        }
                    } else if (response.data == this.GLOBAL.TokenError) {
                        this.$Message.success('以下内容登录可查看，请登录!');
                    }
                }, response => {
                    console.log(response);
                })
            }
        },

        SaveRecord: function() {
            if (this.GLOBAL.IsLogin != 0) {
                var url = "/Api/User/Cookie";
                this.$ajax.post(url, qs.stringify({ CookieType: 'Comic', NameID: this.id, ChapterName: this.name, ReadNum: this.read_num, User: this.GLOBAL.UserName })).then(response => {

                    if (response.status == 200) {
                        if (response.data.status == this.GLOBAL.Success) {
                            console.log("记录成功");
                        } else if (response.data == this.GLOBAL.TokenError) {
                            this.$Message.success('以下内容登录可查看，请登录!');
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

            var ComicCookie = "NameID=" + this.id + ";ChapterName=" + this.name + ";ReadNum=" + this.read_num;
            localStorage.setItem('ComicCookie', ComicCookie);

        }
    }
}
</script>
<style scoped>
.content_comic_pic {
    letter-spacing: 0.2em;
    margin: auto;
    text-align: center;
}

.box_con {
    border: 0.3rem solid #88C6E5;
    overflow: hidden;
    margin: 0.3rem auto;
}

.bookname {
    border-bottom: 0.2rem dashed #88C6E5;
    line-height: 2rem;
    padding-top: 4rem;
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

.pic_show {
    width: 100%;
}

.pc_pic_show {
    margin: 0 auto;
}
</style>