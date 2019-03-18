<template>
    <div class="fiction">
        <title>小说</title>
        <Row class="style_magin_top_fiction">
            <Col :xs="{ span: 24, offset: 0 }" :md="{ span:20, offset:2 }" :lg="{ span: 16, offset: 4 }">
            <div class="topic-category h2-mod">
                <h2>{{name}}小说</h2>
                <div :class="MobileShow" id="menu">
                    <ul>
                        <template v-for="(data,index) in fiction_type">
                            <li><span :class="{ ClickNav:changeRed == index}" @click="SelectFictionByType(data,index)">{{data}}</span></li>
                        </template>
                    </ul>
                </div>
                <div class="hr" />
                <Row class="style_magin back_color">
                    <div v-for="data in fiction_content" class="style_magin ">
                        <Col :xs="{ span: 7, offset:1 }" :md="{ span:4, offset:1  }" :lg="{ span:3, offset:1 }" class="style_magin_top_fiction">
                        <router-link :to="{name:'FictionChapter', query:{name:data.name, id:data.id, introduce:data.introduce, img:data.img} }">
                            <img :src="data.img" :class="Moblie_Fiction_PicShow" :alt="data.name"></img>
                            <div id="fiction_name">{{ data.name }}</div>
                        </router-link>
                        </Col>
                    </div>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import merge from 'webpack-merge'
export default {
    name: 'Fiction',
    inject: ['reload'],
    components: {},
    data() {
        return {
            name: "全部",
            value: 0,
            fiction_content: [],
            screen_width: 200,
            keyword: '',
            hzw_ID: 0,
            hyrz_ID: 0,
            ID: 0,
            changeRed: 0,
            fiction_type: ["全部", "玄幻", "修真", "都市", "历史", "网游", "科幻", "恐怖"]
        }

    },

    methods: {
        SelectFictionByType: function(name, index) {
            this.$router.push({ query: merge(this.$route.query, { 'name': name, 'index': index }) })
            this.reload();
        },

        FictionShow() {
            this.fiction_content = []
            this.screen_width = screen.width;

            if (this.$route.query.name != null) {
                this.name = this.$route.query.name
            } else {
                this.name = "全部"
            }

            if (this.$route.query.index != null) {
                this.changeRed = this.$route.query.index;
            } else {
                this.changeRed = 0;
            }

            var url = "/Api/Entertainment/" + this.GLOBAL.IsLogin + "/Name/fiction/";
            if (this.name != "全部") {
                url = "/Api/Entertainment/" + this.GLOBAL.IsLogin + "/SearchResult/fiction/Type/" + this.name;
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
        }
    },

    computed: {
        MobileShow() {
            return [
                this.screen_width < 768 ? 'mobile_ul' : ''
            ]
        },

        Moblie_Fiction_PicShow() {
            return [
                this.screen_width < 768 ? 'style_fiction_pic' : 'style_fiction_pic_pc'
            ]
        },

    },

    mounted() {
        this.GLOBAL.GetGlobalValue()
        this.FictionShow()
    },

    watch: {
        $route() {
            this.FictionShow()
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

.style_fiction_pic_pc {
    height: 10rem;
    width: 8rem;
    display: block;
    margin-left: 10%;

}

.style_fiction_pic {
    height: 7rem;
    margin-left: 10%;
    display: block;
}

.style_magin {
    margin-right: 1.5rem;
}

.style_magin_top_fiction {
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
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 0.5rem;
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

.list {
    padding: 1rem;
}

.mobile_ul {
    margin-bottom: 2.5rem;
}

#menu ul {
    padding: 1rem;
}

#menu ul li {
    font-size: 14px;
    font-weight: bolder;
    list-style-image: none;
    list-style-type: none;
    float: left;
}

#menu ul li span {
    display: block;
    /* 作为一个块 */
    padding-top: 0.2rem;
    padding-right: 1.5rem;
    /* 设置块的属性 */
    padding-bottom: 0.2rem;
    padding-left: 1.5rem;
    border-radius: 1rem;
    transition: .2s;
}

#menu ul li span:hover {
    color: #00FFFF;

}

#fiction_name {
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
}

.ClickNav {
    color: #00FFFF;
}
</style>