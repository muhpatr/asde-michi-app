Arlin API v0 References
=======================

Base route: `/api`

> Currently:  
> We don't require strict authentication for accessing the API, since we're not planning to publicize it yet.  
> All of our sorts are based on `creation_date` in descending order. Initially, we don't limit scope range and not even a quota.

List of routes for basic actions:

| Route   | HTTP | Description
|---------|------|------------
| `info`  | GET  | Get information about the entire site
| `users` | GET  | Get all users
| `users/signin?username={username}` | GET | Sign in with `username`

List of routes for questions:

| Route            | HTTP | Description
|------------------|------|------------
| `questions`      | GET  | Get all the questions
| `questions`      | POST | Create a question with a payload
| `questions/{id}` | GET  | Get a single question
| `questions/{id}` | DEL  | Delete a question
| `questions/{id}` | PUT  | Update a question with new payload

[TODO WIP HERE]

List of routes for filter regarding search:

| Route               | HTTP | Description
|---------------------|------|------------
| `questions?id={id}` | GET  | Get `id` match in questions
| `questions?id={id}` | GET  | Get `id` like in questions

*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *

Inspiration
===========

> We should learn about API design best practices from the top sites.

Example from Stack Exchange
---------------------------

### Documentation

+ [Stack Exchange API](https://api.stackexchange.com/docs)
+ [Usage of /questions/{ids}/answers - Stack Exchange API](https://api.stackexchange.com/docs/answers-on-questions)

### User URL

+ LONG: http://superuser.com/users/4560/steven

### Question URL

+ LONG: http://superuser.com/questions/1055977/why-are-hex-editors-called-binary-editors
+ SHORT: http://superuser.com/q/1055977/62725
+ TAG: http://superuser.com/questions/tagged/hexadecimal

### Answer URL

+ SHORT: http://superuser.com/a/1055987/62725
+ SHORT: http://superuser.com/a/1056019/62725

Example from Quora
------------------

> Quora has some very long URL. And unfortunately, they haven't provide a public API yet. <https://www.quora.com/Does-a-Quora-API-exist>

### Question URL

+ LONG: https://www.quora.com/How-important-is-bug-free-in-coding-interviews

### Answer URL

+ LONG: https://www.quora.com/How-important-is-bug-free-in-coding-interviews/answer/Gayle-Laakmann-McDowell

Example from Haaash
-------------------

> We're only bringing Haaash experience design with concrete Stack Overflow information architecture. Therefore, since Haaash also haven't provide public API, we shouldn't based on it.

+ VERY LONG: http://5oopx.haaash.com/1/how-do-i-reply-to-comments-in-the-5oopx-iphone-app
