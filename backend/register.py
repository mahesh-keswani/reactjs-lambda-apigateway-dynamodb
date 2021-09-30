import boto3
from boto3.dynamodb.conditions import Key
from util import buildResponse

def registerUser(requestBody, dynamodb=None):
	tableName = 'Users'

	name = requestBody['name']
	email = requestBody['email']
	password = requestBody['password']
	
	if not dynamodb:
		dynamodb = boto3.resource('dynamodb')

	table = dynamodb.Table(tableName)

	try:
		isUserExists = table.query(
			KeyConditionExpression=Key('email').eq(email)
		)
	
		# if the user does not exist
		if isUserExists['Count'] == 0:
			table.put_item(
				Item={
					'name': name,
					'email': email,
					'password': password
				}
			)
			response = buildResponse(200, 'User Registered Successfully :D')
		else:
			response = buildResponse(401, 'User already exists :(')
	
	except Exception as e:
		response = buildResponse(503, 'Sever Error in register, please try again later ' + str(e) )
	
	
	return response