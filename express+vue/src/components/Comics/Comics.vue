<template>
    <div class="comic">
        <title>漫画</title>
        <Row class="style_magin_top_comic">
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4 }">
            <div class="topic-category h2-mod">
                <h2>全部漫画</h2>
                <Row class="style_magin back_color ">
                    <Carousel v-model="value" :autoplay="true" class="carousel_inner" loop>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <router-link :to="{name:'ComicChapter', query:{name:'海贼王', id:hzw_ID, img:'/static/海贼王/海贼王.jpg', introduce:'路飞为实现与因救他而断臂的香克斯的约定而出海，他在旅途中不断寻找志同道合的伙伴，开始了以成为海贼王为目标的伟大的冒险旅程。'} }"><img src="/static/海贼王/轮播.jpg" alt="海贼王"></router-link>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <router-link :to="{name:'ComicChapter', query:{name:'火影忍者', id:hyrz_ID, img:'/static/火影忍者/火影忍者.jpg', introduce:'在木叶忍者村，身为孤儿的漩涡鸣人受尽村人冷落。为了让更多的人认可自己，他的目标是成为火影。鸣人怀着过人的自信与勇气开始了训练，但一切要比他想象的要困难的多。'} }"><img src="/static/火影忍者/轮播.jpg" alt="火影忍者"></router-link>
                            </div>
                        </CarouselItem>
                    </Carousel>
                </Row>
                <div class="hr" />
                <Row class="style_magin back_color">
                    <div v-if="screen_width < 768">
                        <div v-for="data in comic_content" class="style_magin ">
                            <Col :xs="{ span: 18, offset:3 }" class="style_magin_top_comic">
                            <router-link :to="{name:'ComicChapter', query:{name:data.name, id:data.id, introduce:data.introduce, img:data.img} }"><img :src="data.img" class="style_Comic_pic" :alt="data.name">{{ data.name }}</router-link>
                            </Col>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="data in comic_content" class="style_magin ">
                            <Col :md="{ span:12 }" :lg="{ span:6 }" class="style_magin_top_comic">
                            <router-link :to="{name:'ComicChapter', query:{name:data.name, id:data.id, introduce:data.introduce, img:data.img} }"><img :src="data.img" class="style_Comic_pic_pc" :alt="data.name">{{ data.name }}</router-link>
                            </Col>
                        </div>
                    </div>
                </Row>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    name: 'comic',
    components: {},
    data() {
        return {
            value: 0,
            comic_content: [],
            screen_width: 200,
            keyword: '',
            hzw_ID: 0,
            hyrz_ID: 0,
            ID: 0
        }

    },

    methods: {
        getResult: function(keyword) {
            var url = "/Api/Entertainment/2/SearchResult/comic/All/" + keyword;
            this.$ajax.get(url).then(response => {
                if (response.data.status == this.GLOBAL.Success) {
                    if (keyword == "火影忍者") {
                        this.hyrz_ID = response.data.data[0].ID;
                    } else if (keyword == "航海王（海贼王）") {
                        this.hzw_ID = response.data.data[0].ID;
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
        this.getResult("火影忍者");
        this.getResult("航海王（海贼王）");

        var url = "/Api/Entertainment/" + this.GLOBAL.IsLogin + "/Name/comic/";
        this.$ajax.get(url).then(response => {
            if (response.data.status == this.GLOBAL.Success) {
                for (var i = 0; i < response.data.data.length; i++) {
                    var path = response.data.data[i].Img;
                    var comic_content = { "img": path, "name": response.data.data[i].Name, "introduce": response.data.data[i].Introduce, "id": response.data.data[i].ID }; // 字典 
                    this.comic_content.push(comic_content)
                }
            } else if (response.data == this.GLOBAL.TokenError) {
                this.$Message.success('以下内容登录可查看，请登录!');
            }
        }, response => {
            console.log(response);
        })

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
    margin-top: 0.5rem;
}

.style_magin_top_comic {
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