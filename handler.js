'use strict';

const AWS = require('aws-sdk');

module.exports.create = async event => {
  let bodyObj = JSON.parse(event.body);
  let putParams = {
    TableName: process.env.DYNAMODB_CONTACT_TABLE,
    Item: {
      email: bodyObj.email,
      createdAt: parseInt(Date.now()/1000),
      firstName: bodyObj.firstName,
      surname: bodyObj.surname,
      phone: bodyObj.phone
    }
  };

  let putResultObj = null;
  try {
    var documentClient = new AWS.DynamoDB.DocumentClient();
    putResultObj = await documentClient.put(putParams).promise();
  } catch (putError) {
    console.log('There was an error putting item', putError);
    console.log('putParams', putParams);
    throw new Error('There was an error putting item');
  }
  console.log('putResultObj', putResultObj);
  return {
    statusCode: 201
  };
};
