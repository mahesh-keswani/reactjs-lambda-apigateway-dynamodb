import json

def buildResponse(statusCode, body):
	return {
	'statusCode': statusCode,
	'headers': {
		'Access-Control-Allow-Origin' : '*',
		'Content-Type': 'application/json'
	},
	'body': json.dumps(body)
	}