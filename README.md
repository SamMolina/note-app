# Note App

Note App is an web application that exposes APIs for creating, removing, listing and reading notes.

## Requirements

Uses Node v18.1.0 and npm v8.8.0.

## Useful Node commands

The project makes use of node and its package manager to help you out carrying some common tasks such as building the project or running it.

### Install dependencies

```
$ npm install
```

### Run the tests

```
$ npm test
```

### Run the application

```
$ npm start
```

## API
Below is a list of API endpoints with their respective input and output. 

### Create note

Endpoint
```
POST /add
```

Example of body
```
{
    "title": "Books to buy"
    "body": "Alice in Wonderland"
}
```

Parameters
| Parameter    | Description                 |
| ------------ | --------------------------- |
| title        | Note's title                |
| body         | Note's description          |

The following POST request, is an example request using CURL, creates a note locally.
```
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"title": "Books to buy", "body": "Alice in Wonderland"}' \
    http://localhost:3001/add
```

Example of response
```
{
    "status": "ok",
    "alert": {
        "type": "success",
        "message": "Note added!"
    }
}
```

### Remove note

Endpoint
```
DELETE /remove
```

Example of body
```
{
    "title": "Books to buy"
}
```

Parameters
| Parameter    | Description                 |
| ------------ | --------------------------- |
| title        | Existing note's title                |

The following POST request, is an example request using CURL, removes an existing note locally.
```
curl \
    -X DELETE \
    -H "Content-Type: application/json" \
    http://localhost:3001/remove?title\=Books%20to%20buy
```

Example of response
```
{
    "status": "ok",
    "alert": {
        "type": "success",
        "message": "Note removed!"
    }
}
```

### Read note

Endpoint
```
GET /read
```

Example of body
```
{
    "title": "Books to buy"
}
```

Parameters
| Parameter    | Description                 |
| ------------ | --------------------------- |
| title        | Existing note's title                |

The following POST request, is an example request using CURL, reads an existing note locally.
```
curl \
    -X GET \
    -H "Content-Type: application/json" \
    http://localhost:3001/read?title=Books%20to%20buy
```

Example of response
```
{
    "status": "ok",
    "data": {
        "title": "Books to buy",
        "body": "Alice in Wonderland"
    }
}
```

### List notes

Endpoint
```
GET /list
```

The following POST request, is an example request using CURL, reads an existing note locally.
```
curl \
    -X GET \
    -H "Content-Type: application/json" \
    http://localhost:3001/list
```

Example of response
```
{
    "status": "ok",
    "data": [
        {
            "title": "Books to buy",
            "body": "Alice in Wonderland"
        },
        {
            "title": "Movies to watch",
            "body": "How train your dragon"
        }
    ]
}
```
