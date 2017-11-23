const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');

const table = 'statement';

var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;

// Create new statement
api.post('/statement', function (request) {
	'use strict';
	console.log(request);
	var params = {
		TableName: table,
		Item: {
			id: Date.now(),
			text: request.body.text,
			illegalVotes: request.body.illegalVotes,
			frownedUponVotes: request.body.frownedUponVotes
		}
	};
	// return dynamo result directly
	return dynamoDb.put(params).promise();
}, { success: 201 }); // Return HTTP status 201 - Created when successful

// GET all statements
api.get('/statement', function (request) {
  return dynamoDb.scan({ TableName: table }).promise()
      .then(response => response.Items)
});

// GET a specific statement
api.get('/statement/{id}', function (request) {
	'use strict';
	var id, params;
	// Get the id from the pathParams
	id = request.pathParams.id;
	params = {
		TableName: table,
		Key: {
			id: parseInt(id)
		}
	};

	// post-process dynamo result before returning
	return dynamoDb.get(params).promise().then(function (response) {
		return response.Item;
	});
});

// Update a statement
api.put('/statement/{id}', function (request) {
	'use strict';
	var params = {
		TableName: table,
		Item: {
			id: parseInt(request.pathParams.id),
			text: request.body.text,
			illegalVotes: request.body.illegalVotes,
			frownedUponVotes: request.body.frownedUponVotes
		}
	};
	// return dynamo result directly
	return dynamoDb.put(params).promise();
}, { success: 201 }); // Return HTTP status 201 - Created when successful