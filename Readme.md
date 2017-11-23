//Add a statement
curl -H "Content-Type: application/json" -X POST -d @./test/test.json https://2hmzoogb6l.execute-api.us-east-1.amazonaws.com/latest/statement

//Get all statements
curl https://2hmzoogb6l.execute-api.us-east-1.amazonaws.com/latest/statement