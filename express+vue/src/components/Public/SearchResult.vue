<template>
    <div class="SearchResult">
        <title>{{keyword}}</title>
        <Row class="style_magin_top_search">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4 }">
            <div class="topic-category h2-mod">
                <h2>漫画关键词 {{keyword}} 的搜索结果</h2>
                <Row class="style_magin back_color">
                    <div v-for="data in comic_content" class="style_magin ">
                        <Col :xs="{ span: 18, offset:3 }" :lg="{ span:5, offset:1  }" class="style_magin_top_search">
                        <router-link :to="{name:'ComicChapter', query:{name:data.name, id:data.id, introduce:data.introduce, img:data.img} }"><img :src="data.img" class="style_Comic_pic" :alt="data.name">{{ data.name }}</router-link>
                        </Col>
                    </div>
                </Row>
            </div>
            </Col>
        </Row>
        <Row class="style_magin_top_search">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4 }">
            <div class="topic-category h2-mod">
                <h2>小说关键词 {{keyword}} 的搜索结果</h2>
                <Row class="style_magin back_color">
                    <div v-for="data in fiction_content" class="style_magin ">
                        <Col :xs="{ span: 7, offset:1 }" :md="{ span:4, offset:1  }" :lg="{ span:3, offset:1 }" class="style_magin_top_search">
                        <router-link :to="{name:'FictionChapter', query:{name:data.name, id:data.id, introduce:data.introduce, img:data.img} }"><img :src="data.img" :class="Moblie_Fiction_PicShow" :alt="data.name">{{ data.name }}</router-link>
                        </Col>
                    </div>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: 'SearchResult',
    components: {},
    data() {
        return {
            value: 0,
            comic_content: [],
            fiction_content: [],
            screen_width: 200,
            keyword: ''
        }

    },
    computed: {
        Moblie_Fiction_PicShow() {
            return [
                this.screen_width < 768 ? 'style_fiction_pic' : 'style_fiction_pic_pc'
            ]
        },

    },
    methods: {
        getComicsResult: function() {
            this.comic_content = []
            var url = "";
            if (this.$route.query.keyword) {
                this.keyword = this.$route.query.keyword;
                url = "/Api/Entertainment/" + this.GLOBAL.IsLogin + "/SearchResult/comic/All/" + this.keyword;
            }

            this.$ajax.get(url).then(response => {
                if (response.data.status == this.GLOBAL.Success) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        var path = response.data.data[i].Img;
                        var comic_content = { "name": response.data.data[i].Name, "introduce": response.data.data[i].Introduce, "id": response.data.data[i].ID, "img": path }; // 字典 
                        this.comic_content.push(comic_content)
                    }
                } else if (response.data == this.GLOBAL.TokenError) {
                    this.$Message.success('以下内容登录可查看，请登录!');
                }
            }, response => {
                console.log(response);
            })
        },

        getFictionResult: function() {
            this.fiction_content = []
            var url = "";
            if (this.$route.query.keyword) {
                this.keyword = this.$route.query.keyword;
                url = "/Api/Entertainment/" + this.GLOBAL.IsLogin + "/SearchResult/fiction/All/" + this.keyword;
            }

            this.$ajax.get(url).then(response => {
                if (response.data.status == this.GLOBAL.Success) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        var path = response.data.data[i].Img;
                        var fiction_content = { "name": response.data.data[i].Name, "introduce": response.data.data[i].Introduce, "id": response.data.data[i].ID, "img": path }; // 字典 
                        this.fiction_content.push(fiction_content)
                    }
                } else if (response.data == this.GLOBAL.TokenError) {
                    this.$Message.success('以下内容登录可查看，请登录!');
                }
            }, response => {
                console.log(response);
            })
        },
    },

    mounted() {
        this.GLOBAL.GetGlobalValue()
        this.screen_width = screen.width;

        console.log(this.$route.query.keyword)

        this.getComicsResult();
        this.getFictionResult();

    },
    watch: {
        '$route'(to, from) {
            console.log(this.$route.query.keyword)

            this.getComicsResult();
            this.getFictionResult();
        }
    }
}
</script>
<style scoped>
.carousel_inner img {
    margin: 0 auto;
    width: 70%;
    height: 70%;
}

.style_Comic_pic_pc {
    height: 10rem;
    width: 80%;
    display: block;
    margin-left: 10%;
}

.style_Comic_pic {
    height: 7rem;
    width: 80%;
    display: block;
    margin-left: 10%;
}

.style_magin {
    margin-left: 0rem;
}

.style_magin_top_search {
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

.style_fiction_pic_pc {
    height: 10rem;
    width: 8rem;
    display: block;
    margin-left: 10%;

}

.style_fiction_pic {
    height: 7rem;
    margin-left: 10%;
}

.topic-category {
    border-radius: 0.5rem;
    border: 0.2rem solid #e5e5e5;
    background-color: #eee;
}

.h2-mod h2 {
    color: #666;
    background-color: #ddd;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
</style>