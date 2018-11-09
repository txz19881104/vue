// sql语句
var sqlMap = {
    // 用户
    user: {
        select_table_ComicName: 'SELECT * FROM EntertainmentDB.ComicName',
        select_table_ComicChapter: 'SELECT * FROM EntertainmentDB.ComicChapter WHERE Dept_ID=', 
        select_table_ComicChapterNum: 'SELECT * FROM EntertainmentDB.ComicChapter', 
        select_table_ComicImgSrc: 'SELECT * FROM EntertainmentDB.ComicImgSrc', 
        select_table_FictionName: 'SELECT * FROM EntertainmentDB.FictionName',
        select_table_FictionChapterInfo: 'SELECT * FROM EntertainmentDB.FictionChapter WHERE Dept_ID=', 
        select_table_FictionChapterInfoNum: 'SELECT * FROM EntertainmentDB.FictionChapter WHERE ChapterNum=', 
        select_table_FictionChapterContent: 'SELECT * FROM EntertainmentDB.FictionChapter WHERE Dept_ID=', 
        select_table_UserCookie: 'SELECT * FROM EntertainmentDB.UserCookie',

    }
}

module.exports = sqlMap;
