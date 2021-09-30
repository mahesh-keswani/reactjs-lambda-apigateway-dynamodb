import boto3
from boto3.dynamodb.conditions import Key, Attr
from util import buildResponse

def loginUser(requestBody, dynamodb=None):
	tableName = 'Users'
	
	email = requestBody['email']
	password = requestBody['password']
	
	if not dynamodb:
		dynamodb = boto3.resource('dynamodb')

	table = dynamodb.Table(tableName)

	try:
		isUserExists = table.query(
			KeyConditionExpression=Key('email').eq(email),
			FilterExpression=Attr('password').eq(password)
		)

		# if user does not exists
		if isUserExists['Count'] == 0:
			respone = buildResponse(403, 'Credentials does not exists in our database')
		else:
			user = isUserExists['Items'][0]
			
			userJson = {
				"name": user['name'],
				"email": user['email'],
				"password": user['password']
			}
			
			print(user)
			print("\n\n", userJson)
			
			respone = buildResponse(200, str(userJson) )

	except Exception as e:
		respone = buildResponse(503, 'Sever Error in register, please try again later ' + str(e) )

	
	return respone		