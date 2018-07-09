
- The application is deployed to AWS using serverless and node js
- Serverless framework has been used to build and deploy the application
- AWS dynamo table and lambda services are used by serverless to deploy

Build and Deploy:
-----------------
- From the root project dir
    serverless deploy
- Serverless builds the instance on AWS and provides the endpoints for the REST API
    ANY - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/
    POST - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msg
    GET - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs
    GET - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs/{user}
    DELETE - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs/{user}
    
    (The endpoints could be replaced with custom domain after registering the domain on AWs console with API GATEWAY and Route53 services)


- ANY - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/ 
    welcome page

- POST - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msg
    Add the the user and msg to the dynamo table
    
- GET - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs
    Get all the msgs from the dynamo table

- GET - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs/{user}
    Get a specific msg by providing the user of the msg as the key
    All checks if the msg is a palindrome or not

- DELETE - https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msgs/{user}
    Delete a specific msg by providing the user of the msg as the key


Test:
-----
    Postman can be used to test the end points

    - POST msg
        https://pe8t8bwzu3.execute-api.us-east-1.amazonaws.com/dev/msg
            body: {
                "user": "John",
                "msg": "Hello"
            }

    