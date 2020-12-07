# Kaplan Assignment

### Teck stack used:
  - Nodejs 
  - Typescript
  - Expressjs
  - MongoDB
  - Jest
  - Swagger

### Get started:
  1. Clone the repo: `$ git clone https://github.com/ashrafkm/kaplan-assignment.git`
  2. Install dependencies: `$ npm install `
  3. Run the server: `$ npm run dev` 
  4. Unit test: `$ npm test`

### API's
1. List assignments: 
```javascript
"METHOD": GET 
"URL": localhost:7010/api/assignment/list
"RESPONSE":{
    "code": 200,
    "total": 2,
    "data": [
        {
            "_id": "5fcc766a451eba2f820712f6",
            "tags": [
                "kana",
                "julian"
            ],
            "title": "tes43",
            "description": "test",
            "type": "Stest1",
            "createdAt": "2020-12-06"
        },
        {
            "_id": "5fc87942b78316893db6f66e",
            "tags": [
                "nancy",
                "ashraf",
                "NEW"
            ],
            "title": "test33",
            "description": "test DESC33",
            "type": "Stest1",
            "createdAt": "2020-12-03"
        }
    ]
}
```

2. Assignment details: 
```javascript
"METHOD": GET
"URL": localhost:7010/api/assignment/{id}
"EXAMPLE": localhost:7010/api/assignment/5fc87942b78316893db6f66e
"RESPONSE":{
    "code": 200,
    "data": {
        "_id": "5fc87942b78316893db6f66e",
        "tags": [
            "nancy",
            "ashraf"
        ],
        "title": "test3",
        "description": "test",
        "type": "Stest1",
        "createdAt": "2020-12-03"
    }
}
```

3. Create assignment: 
```javascript 
"METHOD": POST: 
"URL": localhost:7010/api/assignment/create
"Request body": {
    "title":"test name",
    "description":"test desc",
    "type":"test type",
    "tags":["kana", "julian"],
}
"RESPONSE":{
    "code": 200,
    "message": "Succesfully created!.",
    "data": {
        "tags": [
            "kana",
            "julian"
        ],
        "createdAt": "2020-12-06T05:45:19.013Z",
        "deleted": 0,
        "_id": "5fcc766a451eba2f820712f6",
        "title": "test name",
        "description": "test desc",
        "type": "Stest1",
        "__v": 0
    }
}
 ```

4. Search assignments: 
```javascript
"METHOD": GET
"URL" http://localhost:7010/api/assignment/search?key={search key}
"EXAMPLE": http://localhost:7010/api/assignment/search?key=julian
"RESPONSE":{
    "code": 200,
    "data": [
        {
            "_id": "5fc8809bca53ed8f2e12d1c1",
            "tags": [
                "nancy",
                "julian"
            ],
            "title": "test1",
            "description": "test",
            "type": "Stest1",
            "createdAt": "2020-12-03"
        },
        {
            "_id": "5fc880adca53ed8f2e12d1c2",
            "tags": [
                "kana",
                "julian"
            ],
            "title": "test2",
            "description": "test",
            "type": "Stest1",
            "createdAt": "2020-12-03"
        }
    ]
}
```

5. Add new tags to a assignment: 
 ```javascript
 "METHOD": PUT
 "URL" : localhost:7010/api/assignment/add-tags/{id}
 "EXAMPLE": localhost:7010/api/assignment/add-tags/5fc880adca53ed8f2e12d1c2
 "REQUEST BODY":{
           "tags": ["ashraf"]
 }
 "RESPONSE":{
    "code": 200,
    "message": "Succesfully updated!."
}
 ```


6. Update a assignments: 
```JAVASCRIPT 
"METHOD": PUT
"URL": localhost:7010/api/assignment/update/{id}
"EXAMPLE": localhost:7010/api/assignment/update/5fc87942b78316893db6f66e
"REQUEST": {
        "tags": [
            "nancy",
            "ashraf",
            "NEW"
        ],
        "title": "test33",
        "description": "test DESC33",
        "type": "Stest1"
}
"RESPONSE":{
    "code": 200,
    "message": "Succesfully updated!."
}
    
 ```

