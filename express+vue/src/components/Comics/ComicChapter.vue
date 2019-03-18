h<template>
    <div class="ComicChapter">
        <title>{{name}}</title>
        <meta name="keywords" :content="name" />
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}">
            <div class="topic-category">
                <Row class="style_magin back_color">
                    <Col :xs="{ span: 22, offset: 1}" :lg="{ span: 10, offset: 1 }" class="div_left">
                    <img :src="img" width="100%" height="100%" style="float:left;">
                    </Col>
                    <Col :xs="{ span: 22, offset: 1}" :lg="{  span: 11, offset: 1 }">
                    <Row>
                        <h2 class="text_left comic_name">{{name}}</h2>
                    </Row>
                    <Row>
                        <div class="text_left comic_intro">
                            <span>漫画简介</span>
                        </div>
                    </Row>
                    <Row>
                        <div class="text_left intro_switch">
                            <span>{{introduce}}</span>
                        </div>
                    </Row>
                    <Row class="style_row div_left">
                        <router-link :to="{name:'ComicPicShow', query:{name:first_content.name, id:first_content.id, num:first_content.num} }">
                            <button type="button" class="btn btn-primary" style="margin-top: 3rem;" :class="{read_back_color:(is_update==true)}">{{readChapter}}</button>
                        </router-link>
                    </Row>
                    </Col>
                </Row>
                <div class="hr" />
                <Row class="back_color">
                    <Col :xs="{ span: 22, offset: 1 }" :lg="{ span: 20, offset: 2 }">
                    <Scroll :on-reach-bottom="handleReachBottom" :distance-to-edge="-10" :height="600">
                        <template v-for="(data) in comic_content" style="width: 100%;">
                            <Col :xs="{ span: 12}" :md="{ span: 12}" :lg="{ span: 6}">
                            <div class="table_td">
                                <router-link :to="{name:'ComicPicShow', query:{name:data.name, id:data.id, num:data.num} }">{{data.name}}</router-link>
                            </div>
                            <hr />
                            </Col>
                        </template>
                    </Scroll>
                    </Col>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: 'ComicChapter',
    data() {
        return {
            name: '',
            id: 0,
            img: '',
            introduce: '',
            ChapterNum: [],
            first_content: { "name": "开始阅读", "id": 0, "num": 0 },
            comic_content: [],
            screen_width: 200,
            readChapter: "开始阅读",
            current_chapter_num: 0,
            max_chapter: 0,
            read_chapter: 0,
            is_update: false,
            bGetResponse: false,
        }
    },
    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        this.introduce = this.$route.query.introduce;
        this.img = this.$route.query.img;
        this.screen_width = screen.width;


        var url = "/Api/Entertainment/comic/Chapter/" + this.id + "/" + this.current_chapter_num;
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                var i;

                this.max_chapter = response.data.max_chapter;
                if (this.max_chapter > this.read_chapter) {
                    this.is_update = true;
                }

                for (i = 1; i < response.data.data.length + 1; i++) {
                    var content = { "name": response.data.data[i - 1].ChapterName, "id": this.id, "num": response.data.data[i - 1].ChapterNum, "url": response.data.data[i - 1].ContentUrl };

                    this.comic_content.push(content);
                    if (i == 1) {
                        if (this.first_content.id == 0) {
                            this.first_content = content;
                        }
                    }
                }

                this.current_chapter_num = this.current_chapter_num + 400;

            } else if (response.data == this.GLOBAL.TokenError) {
                this.$Message.success('以下内容登录可查看，请登录!');
            }

        }, response => {
            console.log(response);
        })


        if (this.GLOBAL.IsLogin != 0) {
            var url = "/Api/User/Type/comic/User/" + this.GLOBAL.UserName + "/NameID/" + this.id;
            this.$ajax.get(url).then(response => {
                if (response.data.status == this.GLOBAL.Success) {
                    if (response.data.data.length != 0) {
                        this.first_content = { "name": response.data.data[0].ChapterName, "id": this.id, "num": response.data.data[0].ReadNum };

                        this.read_chapter = response.data.data[0].ReadNum;
                        if (this.max_chapter > this.read_chapter) {
                            this.is_update = true;
                        }

                        this.readChapter = response.data.data[0].ChapterName;
                    }
                } else if (response.data == this.GLOBAL.TokenError) {
                    this.$Message.success('以下内容登录可查看，请登录!');
                }
            }, response => {
                console.log(response);
            })
        } else {
            var ComicCookie = localStorage.getItem('ComicCookie');
            this.GetComicCookie(ComicCookie)
            if (ComicCookie != null) {
                this.first_content = { "name": this.name, "id": this.id, "num": this.read_num };
                this.readChapter = this.name;
            }
        }

    },

    methods: {
        GetComicCookie: function(comic_value) {
            var arr = comic_value.split(';'); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'NameID') {
                    this.id = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'ChapterName') {
                    this.name = arr2[1];
                } else if (arr2[0] == 'ReadNum') {
                    this.read_num = arr2[1];
                }
            }
        },
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    var url = "/Api/User/Type/comic/User/" + this.GLOBAL.UserName + "/NameID/" + this.id;

                    if (!this.bGetResponse) {
                        this.bGetResponse = true;
                        this.$ajax.get(url).then(response => {
                            if (response.data.status == this.GLOBAL.Success) {
                                var i;

                                for (i = 1; i < response.data.data.length + 1; i++) {
                                    var content = { "name": response.data.data[i - 1].ChapterName, "id": this.id, "num": response.data.data[i - 1].ChapterNum, "url": response.data.data[i - 1].ContentUrl };

                                    this.comic_content.push(content);
                                }

                                this.current_chapter_num = this.current_chapter_num + 400;
                                this.bGetResponse = false;
                            } else if (response.data == this.GLOBAL.TokenError) {
                                this.$Message.success('以下内容登录可查看，请登录!');
                            }

                        }, response => {
                            console.log(response);
                            this.bGetResponse = false;
                        })
                    }
                    resolve();
                }, 2000);
            });
        }
    }
}
</script>
<style scoped>
.comic_name {
    color: #333;
    font-size: 1.5rem;
    padding-top: 1rem;
}

.comic_intro span {
    display: inline-block;
    border-bottom: 0.2rem solid #f5ce03;
}

.intro_switch span {
    display: inline-block;
    color: green;
}

.style_magin {
    margin-left: 0rem;
    margin-top: 0.5rem;
}

.back_color {
    background: #eee;
}

.text_left {
    text-align: left;
}

.div_left {
    float: left;
}

.hr {
    border-bottom: 0.2rem solid #bbb;
    margin-bottom: 0.4rem;
    height: 0.5rem;
}

.table_td {
    height: 1.5rem;
    line-height: 2rem;
    text-align: left;
    overflow: hidden;
}

.style_magin_top {
    margin-top: 0.5rem;
}

.topic-category {
    border-radius: 0.5rem;
    border: 0.2rem solid #e5e5e5;
    background-color: #eee;
}

.read_back_color {
    background: #fcc;
}
</style>