<template>
    <div class="FictionChapter">
        <title>{{name}}</title>
        <meta name="keywords" :content="name" />
        <Row class="style_magin_top">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4}">
            <div class="topic-category ">
                <Row class="style_magin back_color">
                    <Col :xs="{ span: 22, offset: 1}" :lg="{ span: 3, offset: 2 }" class="div_left">
                    <img :src="img" width="120" height="150" style="float:left;margin-top:1rem;">
                    </Col>
                    <Col :xs="{ span: 22, offset: 1}" :lg="{  span: 16, offset: 1 }">
                    <Row>
                        <h2 class="text_left fiction_name">{{name}}</h2>
                    </Row>
                    <Row>
                        <div class="text_left fiction_intro">
                            <span>小说简介</span>
                        </div>
                    </Row>
                    <Row>
                        <div class="text_left intro_switch">
                            <span>{{introduce}}</span>
                        </div>
                    </Row>
                    <Row class="style_row div_left">
                        <router-link :to="{name:'FictionContentShow', query:{name:first_content.name, id:first_content.id, num:first_content.num, url:first_content.url} }">
                            <button type="button" class="btn btn-primary" style="margin-top: 0.5rem;">{{readChapter}}</button>
                        </router-link>
                    </Row>
                    </Col>
                </Row>
                <div class="hr" />
                <Row class="back_color">
                    <Col :xs="{ span: 22, offset: 1 }" :lg="{ span: 20, offset: 2 }">
                    <Tabs type="card" class="style_magin">
                        <TabPane v-for="Chapter in fiction_content" :key="Chapter.name" :label="Chapter.name">
                            <template v-for="(data) in (Chapter.content)">
                                <div v-if="screen_width < 768">
                                    <Col :xs="{ span: 11, offset: 1}">
                                    <div class="table_td">
                                        <router-link :to="{name:'FictionContentShow', query:{name:data.name, id:data.id, num:data.num, url:data.url} }">{{data.name}}</router-link>
                                    </div>
                                    <hr />
                                    </Col>
                                </div>
                                <div v-else>
                                    <Col :md="{ span: 12}" :lg="{ span: 6}">
                                    <div class="table_td">
                                        <router-link :to="{name:'FictionContentShow', query:{name:data.name, id:data.id, num:data.num, url:data.url} }">{{data.name}}</router-link>
                                    </div>
                                    <hr />
                                    </Col>
                                </div>
                            </template>
                        </TabPane>
                    </Tabs>
                    </Col>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: 'fictionChapter',
    data() {
        return {
            name: '',
            id: 0,
            img: '',
            introduce: '',
            ChapterNum: [],
            first_content: { "name": "开始阅读", "id": 0, "num": 0 },
            fiction_content: [],
            screen_width: 200,
            readChapter: '开始阅读'
        }
    },
    mounted() {
        this.GLOBAL.GetGlobalValue()

        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        this.img = this.$route.query.img;
        this.introduce = this.$route.query.introduce;
        this.screen_width = screen.width;

        var url = "/api/Name/Fiction/Chapter/" + this.id;
        this.$ajax.get(url).then(response => {
            var lst_fiction = []
            var dic_fiction = []
            var i;

            for (i = 1; i < response.data.data.length + 1; i++) {
                var content = { "name": response.data.data[i - 1].ChapterName, "id": this.id, "num": response.data.data[i - 1].ChapterNum, "url": response.data.data[i - 1].ContentUrl };

                lst_fiction.push(content);
                if (i == 1) {
                    if (this.first_content.id == 0) {
                        this.first_content = content;
                    }

                } else {
                    if (i % 100 == 0) {
                        var name = (i - 99) + "-" + i;
                        var dict_temp = { "name": name, "content": lst_fiction };
                        this.fiction_content.push(dict_temp);
                        lst_fiction = [];
                    }
                }
            }

            var name = (i - (i % 100) + 1) + "-" + i;
            var dict_temp = { "name": name, "content": lst_fiction };
            this.fiction_content.push(dict_temp);

        }, response => {
            console.log(response);
        })


        if (this.GLOBAL.IsLogin != 0) {
            var url = "/api/Type/Fiction/User/" + this.GLOBAL.UserName + "/NameID/" + this.id;
            this.$ajax.get(url).then(response => {
                if (response.data.status == 1) {
                    if (response.data.data.length != 0) {
                        this.first_content = { "name": response.data.data[0].ChapterName, "id": this.id, "num": response.data.data[0].ReadNum, "url": response.data.data[0].ReadUrl };
                        this.readChapter = response.data.data[0].ChapterName;
                    }
                }
            }, response => {
                console.log(response);
            })
        } else {
            var FictionCookie = sessionStorage.getItem('FictionCookie');
            this.GetFictionCookie(FictionCookie)
            if (FictionCookie != null) {
                this.first_content = { "name": this.name, "id": this.id, "num": this.read_num, "url": this.url };
                this.readChapter = this.name;
            }
        }

    },

    methods: {
        GetFictionCookie: function(fiction_value) {
            var arr = fiction_value.split(';'); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'NameID') {
                    this.id = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'ChapterName') {
                    this.name = arr2[1];
                } else if (arr2[0] == 'ReadNum') {
                    this.read_num = arr2[1];
                } else if (arr2[0] == 'ReadUrl') {
                    this.url = arr2[1];
                }

            }
        },

    }
}
</script>
<style scoped>
.fiction_name {
    color: #333;
    font-size: 1.5rem;
    margin-top: 1rem;
}

.fiction_intro span {
    display: inline-block;
    border-bottom: 0.2rem solid #f5ce03;
}

.intro_switch span {
    display: inline-block;
    color: green;
}

.style_magin {
    margin-left: 0rem;
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
</style>