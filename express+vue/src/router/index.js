import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Comics from '@/components/Comics/Comics'
import ComicChapter from '@/components/Comics/ComicChapter'
import ComicPicShow from '@/components/Comics/ComicPicShow'
import SearchResult from '@/components/Public/SearchResult'
import Fiction from '@/components/Fiction/Fiction'
import FictionChapter from '@/components/Fiction/FictionChapter'
import FictionContentShow from '@/components/Fiction/FictionContentShow'
import Video from '@/components/Video/Video'
import Article from '@/components/Article/Article'
import Login from '@/components/Public/Login'
import Person from '@/components/Public/Person'
import Sports from '@/components/Sports/Sports'
import BasketballAnalyse from '@/components/Sports/BasketballAnalyse'
import FootballAnalyse from '@/components/Sports/FootballAnalyse'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Comics',
      name: 'Comics',
      component: Comics
    },
    {
      path: '/Comics/ComicChapter',
      name: 'ComicChapter',
      component: ComicChapter
    },
    {
      path: '/Comics/ComicPicShow',
      name: 'ComicPicShow',
      component: ComicPicShow
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/Fiction',
      name: 'Fiction',
      component: Fiction
    },
    {
      path: '/Fiction/FictionChapter',
      name: 'FictionChapter',
      component: FictionChapter
    },
    {
      path: '/Fiction/FictionContentShow',
      name: 'FictionContentShow',
      component: FictionContentShow
    },
    {
      path: '/Video',
      name: 'Video',
      component: Video
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Person',
      name: 'Person',
      component: Person
    },
    {
      path: '/Sports',
      name: 'Sports',
      component: Sports
    },
    {
      path: '/BasketballAnalyse',
      name: 'BasketballAnalyse',
      component: BasketballAnalyse
    },
    {
      path: '/FootballAnalyse',
      name: 'FootballAnalyse',
      component: FootballAnalyse
    },
  ]
})
