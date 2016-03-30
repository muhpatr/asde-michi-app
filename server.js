var Hapi = require('hapi');
var Bell = require('bell');
var Boom = require('boom');
var HapiMongoDB = require('hapi-mongodb');
var Cookie = require('hapi-auth-cookie');
var Config = require('getconfig');

var server = new Hapi.Server();

var DBOptions = { "url": "mongodb://localhost:27017/arlin", "settings": { "db": { "native_parser": false } } };

server.connection({ 
    host: Config.hostname, 
    port: Config.port 
});

server.register([{ register: Bell }, { register: Cookie }, { register: HapiMongoDB, options: DBOptions }], function (err) {
    if (err) {
        throw err;
    }
    
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: Config.auth.twitter.password,
        isSecure: false,
        clientId: Config.auth.twitter.clientId,
        clientSecret: Config.auth.twitter.clientSecret
    });

    server.auth.strategy('session', 'cookie', {
        password: Config.session.cookieOptions.password,
        cookie: 'sid',
        redirectTo: '/login',
        redirectOnTry: false,
        isSecure: false
    })

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: 'twitter',
            handler: function (request, reply) {
                var t = request.auth.credentials;
				
				var users = {
                    _id: t.profile.id,
                    twitter_id: t.profile.id,
                    twitter_username: t.profile.username,
					username: t.profile.username,
                    avatar: t.profile.raw.profile_image_url.replace('_normal', ''),
                };
				
				var db = request.server.plugins['hapi-mongodb'].db;
				
				db.collection('Users').findOne({"_id" : users.twitter_id}, function(err, result) {					
					if (result) {
						db.collection('Users').update({"_id" : users.twitter_id},
								{$set: {"updated_date" : new Date(),
										"twitter_username" : users.twitter_username,
										"username" : users.twitter_username,
										"avatar" : users.avatar}});
					} else {
						db.collection('Users').insert({ "_id": users.twitter_id,
								"created_date" : new Date(),
								"updated_date" : new Date(),
								"twitter_id" : users.twitter_id,
								"twitter_username" : users.twitter_username,
								"username" : users.twitter_username,
								"avatar" : users.avatar
							});
					}
				});
				
				request.auth.session.clear();
				request.auth.session.set(users);
                return reply.redirect('/');

            }
        }
    });
    
    server.route({
        method: 'GET',
        path: '/logout',
        config: {
            auth: 'session',
            handler: function (request, reply) {
                request.auth.session.clear();
                return reply.redirect('/');
            }
        }
    });
    
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            handler: function (request, reply) {
				var db = request.server.plugins['hapi-mongodb'].db;
				
                if(request.auth.isAuthenticated) {
                    reply('<h1>Session</h1><pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>' + 'Click <a href="/logout">here</a> to logout.')
                }
                else {
                    reply('<h1><a href="/login">Login Via Twitter</a></h1>')
                }
				
            }
        }
    });
    
    server.start(function (err) {
        console.log('Server started at:', server.info.uri);
    });
    
});