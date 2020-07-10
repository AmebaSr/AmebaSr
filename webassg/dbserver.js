var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
		if (action === "/register") {
			console.log("register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"name" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if( action ==="/newpage")
		{
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			return res.end("<h1>welcome to new page</h1><p><a href=\"/alexpage\">register</a></p>");
		}
		else if (action === "/login"){
			console.log("login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"name" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return res.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/index"){
			console.log("index");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/delete"){
			//console.log("Member_page");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"name" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									splitFavlist[1]="\""+splitFavlist[1]+"\"";
									 var myquery = { name : splitName[1], favlist : splitFavlist[1] };
									dbo.collection("favlist").deleteMany(myquery, function(err,favres)
									{
										console.log("Data removed");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"name" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}
		}
		
		else if (action === "/video"){
			console.log("video");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"name" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"name" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"name" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}
		else
			{
				//form = publicPath + "ajaxSignupForm.html";
				//form = "index.html";
				form = "video.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
						}
					});
				}
		}
		else if (action === "/readfavourlist")
		{
			//console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				//console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					//console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						//console.log("mess="+user);
						//console.log(tempSplitName);
				//console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					console.log(splitName[1]);
					dbo.collection("favlist").find({"name" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				//console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						//console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			});
		});
	}
}

else if (action === "/changePWDB")
		{
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						
						
						
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						var stringMsg = JSON.parse(msg);
						var splitArr = formData.split(",");
						var splitOldPW = splitArr[0];
						var splitNewPW = splitArr[1];
						var splitUserName = splitArr[2];
					
						
						/**
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitOldPW = splitMsg[1];
						var tempSplitNewPW = splitMsg[2];
						var tempSplitUserName = splitMsg[3];
						
						var splitOldPW = tempSplitOldPW.split("=");
						var splitNewPW = tempSplitNewPW.split("=");
						var splitUserName = tempSplitUserName.split("=");
						var searchOP = " OldPassword:" + splitOldPW[1];
						var searchNP = " NewPassword:" + splitNewPW[1];
						var searchUserName = " userName:" + splitNewPW[2];
						console.log("");
						console.log(splitNewPW[2]);
						console.log("");
						**/
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							
							dbo.collection("user").count({"name":splitUserName ,"password" : splitOldPW }, function(err, count){
								//console.log(err, count);
								finalcount = count;
								//console.log("myconut="+count);
								if(finalcount > 0)
								{
									MongoClient.connect(dbUrl, function(err, db) {
												var finalcount2;
												if (err) throw err;
												var dbo = db.db("database");
												var myobj2 = stringMsg;
												console.log(user);
												var myquery2 = { name: splitUserName,password: splitOldPW};
													  var newvalues2 = { $set: {password: splitNewPW } };
													dbo.collection("user").updateOne(myquery2, newvalues2, function(err, count2){
													console.log(err, count2);
													finalcount2 = count2;
													console.log("myconut="+count);
													if(finalcount2 > 0)
													{
														console.log("Login failed");
															db.close();
															//return res.end(msg);
														return res.end("fail");
														
													}
													else
													{
														console.log("Login success");
														console.log("");
														console.log(splitNewPW[2]);
														console.log("");
														db.close();
														return res.end("");
													}
												  });
											});
								}
								else
								{
										console.log("Invaild old password");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
						
						
						/**
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							var myquery = { password: splitOldName[1]};
								  var newvalues = { $set: {name: splitNewName[1] } };
								  dbo.collection("user").updateOne(myquery, newvalues, function(err, count){
							console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
									
								}
								else
								{
									console.log("Login success");
									db.close();
									return res.end(splitNewName[1]);
								}
							  });
							});**/
						});
					});
			}	

		}

		else if (action === "/changeNameDB")
		{
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitOldName = splitMsg[1];
						var tempSplitNewName = splitMsg[2];
						
						var splitOldName = tempSplitOldName.split("=");
						var splitNewName = tempSplitNewName.split("=");
						var searchON = " OldName:" + splitOldName[1];
						var searchNN = " NewName:" + splitNewName[1];
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							var myquery = { name: splitOldName[1]};
								  var newvalues = { $set: {name: splitNewName[1] } };
								  
								  
								  dbo.collection("user").count({"name" : splitNewName[1]}, function(err, count){
										console.log(err, count);
										finalcount = count;
										if(finalcount > 0)
										{
											if(err) throw err;
											console.log("user already exist");
											db.close();
											return res.end("taken");
										}
										else
										{
											dbo.collection("user").updateOne(myquery, newvalues, function(err, count){
									console.log(err, count);
										finalcount = count;
										console.log("myconut="+count);
										if(finalcount > 0)
										{
											console.log("Login failed");
												db.close();
												//return res.end(msg);
											return res.end("fail");
											
										}
										else
										{
											dbo.collection("favlist").updateMany(myquery, newvalues, function(err, count){
												console.log(err, count);
													finalcount = count;
													console.log("myconut="+count);
													if(finalcount > 0)
													{
														//console.log("Login failed");
															db.close();
															//return res.end(msg);
														return res.end("fail");
														
													}
													else
													{
														//console.log("Login success");
														db.close();
														return res.end(splitNewName[1]);
													}
											});
										}
							  });
										}
									});
								  
								  
								  
							});
						});
					});
			}	

		}
		else if (action === "/removefavourlist")
		{
			if (req.method === "POST") {
				console.log("action = post");
				delfavData = '';
				delfav = '';
				return req.on('data', function(data) {
					delfavData += data;
					console.log("delfavlist data="+ delfavData);
					return req.on('end', function() {
						var delfavlist;
						delfavlist = qs.parse(delfavData);
						delfav = JSON.stringify(delfavlist);
						console.log("delfav"+delfav);
						stringdelfav = JSON.parse(delfav);
						var splitdelfav = delfavData.split("&");
						console.log("splitdelfav="+splitdelfav);
						var tempSplitName = splitdelfav[1];

						var tempSplitDelfavlist = splitdelfav[2];
						
						var splitName = tempSplitName.split("=");
						var splitDelfavlist = tempSplitDelfavlist.split("=");
						console.log(splitName[1]);
						console.log(splitDelfavlist[1]);
				MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("database");
				dbo.collection("favlist").remove({"name" : splitName[1], "favlist" : splitDelfavlist[1]}, function(err, obj)
                {
    				if (err) throw err;
    				console.log("1 document deleted");
    				db.close();
					return res.end("OK");
					});
                
              });
            });
          });
		}
	}	
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "login.html", "text/html");
				}
				else
				{
					sendFileContent(res, "finalindex.html", "text/html");
				}
			}
			else if (req.url === "/register")
			{
				sendFileContent(res, "register.html", "text/html");
			}
			else if (req.url === "/login")
			{
				sendFileContent(res, "login.html", "text/html");
			}
			else if (req.url === "/about")
			{
				sendFileContent(res, "about.html", "text/html");
			}
			else if (req.url === "/fav")
			{
				sendFileContent(res, "fav.html", "text/html");
			}
			else if (req.url === "/video")
			{
				sendFileContent(res, "video.html", "text/html");
			}
			
			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpeg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpeg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		}
	});

	server.listen(9487);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);


 