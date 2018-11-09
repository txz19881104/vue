const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var mysql = require('mysql');
var models = require('./db');
var $sql = require('./sqlMap');

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var conn;

function handleDisconnect() {
	conn = mysql.createConnection(models.mysql); // Recreate the connection, since
	conn.connect(function(err) {              // The server is either down
		if(err) {                                     // or restarting (takes a while sometimes).
		   console.log('error when connecting to db:', err);
		   setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
		}                                     // to avoid a hot loop, and to allow our node script to
	});                                     // process asynchronous requests in the meantime.

	conn.on('error', function(err) {
		console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
			handleDisconnect();                         // lost due to either server restart, or a
        } 
		else {                                      // connnection idle timeout (the wait_timeout
		  throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
	// 连接数据库
	//var conn = mysql.createConnection(models.mysql);

	//conn.connect();


	app.get('/', function (req, res) {
		res.send('Hello World');
	})


app.get('/:authority/Name/:name', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicName + " WHERE Authority <= " + req.params.authority + ";"
	} else if ("Fiction" == req.params.name ) {
		sql = $sql.user.select_table_FictionName + " WHERE Authority <= " + req.params.authority + ";"
	}
	 
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})

app.get('/:authority/SearchResult/:name/All/:keyword', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicName + " WHERE Authority <= " + req.params.authority + " AND Name LIKE \"%" + req.params.keyword + "%\";";
	} else if ("Fiction" == req.params.name ) {
		sql = $sql.user.select_table_FictionName + " WHERE Authority <= " + req.params.authority + " AND Name LIKE \"%" + req.params.keyword + "%\";";
	}

	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})

app.get('/:authority/SearchResult/:name/Type/:datatype', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicName + " WHERE Authority <= " + req.params.authority + " AND Type LIKE \"%" + req.params.datatype + "%\";";
	} else if ("Fiction" == req.params.name ) {
		sql = $sql.user.select_table_FictionName + " WHERE Authority <= " + req.params.authority + " AND Type LIKE \"%" + req.params.datatype + "%\";";
	}

	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})

app.get('/Name/:name/Chapter/:id', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicChapter + req.params.id + " ORDER BY ChapterNum ASC;"
	} else if ( "Fiction" == req.params.name ) {
		sql = $sql.user.select_table_FictionChapterInfo + req.params.id + " ORDER BY ChapterNum ASC;"
	}
	
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})

app.get('/Name/:name/:id/ChapterByNum/:num', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicChapterNum + " WHERE Dept_ID = " + req.params.id + " AND ChapterNum = " + req.params.num + ";"
	} 
	
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})

app.get('/Name/:name/:id/Chapter/:num', function (req, res) {
	var sql = ""
	if ( "Comic" == req.params.name ) {
		sql = $sql.user.select_table_ComicImgSrc + " WHERE Comic_ID = " + req.params.id + " AND Comic_ChapterNum = " + req.params.num + ";"
	} else if ( "Fiction" == req.params.name ) {
		sql = $sql.user.select_table_FictionChapterContent + req.params.id + " AND ChapterNum = " + req.params.num + ";"
	}
		
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})








app.post('/Register', function (req, res) {
 
	var sql = "INSERT INTO EntertainmentDB.UserInfo (UserName, UserPassword) VALUES (" + "\"" + req.body.user +"\",\"" + req.body.password + "\");" 
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			var response = {
				"status":-1,
		        "err":err,
		    };
			res.send(response);
		}
		else {
			var response = {
				"status":1,
		        "rows":rows,
		    };
			res.send(response);  //这里在页面上输出数据
		}
	});
})

app.post('/Login', function (req, res) {
 
	var sql = "SELECT * FROM EntertainmentDB.UserInfo WHERE UserName = " + "\""  + req.body.user + "\""  + " AND UserPassword = " + "\"" + req.body.password + "\";" 
	conn.query(sql, function(err, rows, fields) {
		if (err || rows == false) {
			var response = {
				"status":-1,
		        "err":err,
		    };
			res.send(response);
		}
		else {
			var response = {
				"status":1,
		        "rows":rows,
		    };
			res.send(response);  //这里在页面上输出数据
		}
	});
})

app.post('/ChangeSetting', function (req, res) {
 	
	var sql = "UPDATE EntertainmentDB.UserInfo SET UserSetting = " + "\"" + req.body.setting + "\"" + " WHERE UserName = " + "\""  + req.body.user + "\";"
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			var response = {
				"status":-1,
		        "err":err,
		    };
			res.send(response);
		}
		else {
			var response = {
				"status":1,
		        "rows":rows,
		    };
			res.send(response);  //这里在页面上输出数据
		}
	});
})

app.post('/UserCookie', function (req, res) {
	var whereinfo = " WHERE CookieType = " + "\"" + req.body.CookieType + "\"" + " AND NameID = "+ req.body.NameID + " AND Dept_User = " + "\"" + req.body.User + "\";"
	var sql = $sql.user.select_table_UserCookie + whereinfo
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			var response = {
				"status":-1,
		        "err":err,
		    };
			res.send(response);
			return
		}

		if (rows == false)
		{

			if ( req.body.CookieType == "Fiction")
			{
				sql = "INSERT into EntertainmentDB.UserCookie (CookieType, NameID, ChapterName, ReadNum, ReadUrl, Dept_User) VALUES (" + 
															"\"" + req.body.CookieType +"\"," + 
															req.body.NameID + 
															",\"" + req.body.ChapterName + "\"," + 
															req.body.ReadNum + ",\"" + 
															req.body.ReadUrl + "\",\"" + 
															req.body.User + "\");"
			}
			else
			{
				sql = "INSERT into EntertainmentDB.UserCookie (CookieType, NameID, ChapterName, ReadNum, Dept_User) VALUES (" + 
															"\"" + req.body.CookieType +"\"," + 
															req.body.NameID + 
															",\"" + req.body.ChapterName + "\"," + 
															req.body.ReadNum + ",\"" + 
															req.body.User + "\");"
			}
		}
		else
		{
			if ( req.body.CookieType == "Fiction")
			{
				sql = "UPDATE EntertainmentDB.UserCookie SET ChapterName = " + "\"" + req.body.ChapterName +  
															 "\",ReadNum = " + req.body.ReadNum +  
															 ",ReadUrl = " + 
															 "\"" + req.body.ReadUrl + "\"," + 
															 " Dept_User = \"" + 
															 req.body.User + "\"" + 
															 whereinfo
			}
			else
			{
				sql = "UPDATE EntertainmentDB.UserCookie SET ChapterName = " + "\"" + req.body.ChapterName +  
															 "\",ReadNum = " + req.body.ReadNum +  
															 ",Dept_User = \"" + 
															 req.body.User + "\"" + 
															 whereinfo			
			}
		}

		conn.query(sql, function(err, rows, fields) {
			if (err) {
				console.log('[query] - :' + err);
				var response = {
					"status":-1,
			        "err":err,
			    };
				res.send(response);
			}
			else {
				var response = {
					"status":1,
			        "rows":rows,
			    };
				res.send(response);  //这里在页面上输出数据
			}
		});
	});
})

app.get('/Type/:type/User/:user/NameID/:nameid', function (req, res) {
	var sql = $sql.user.select_table_UserCookie + " WHERE CookieType = " + "\"" + req.params.type + "\"" + " AND NameID = "+ req.params.nameid + " AND Dept_User = " + "\"" + req.params.user + "\";"
	conn.query(sql, function(err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		res.send(rows);  //这里在页面上输出数据
	});
})


var server = app.listen(8000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
