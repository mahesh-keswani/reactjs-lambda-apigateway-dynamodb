import json
from register import registerUser
from login import loginUser
import boto3
from util import buildResponse

registerPath = '/register'
loginPath = '/login'
homePath = '/home'
deletePath = '/delete'
editPath = '/edit'

TABLE_NAME = 'Users'

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    
    method = event['httpMethod']
    path = event['path']
    
    if method == 'POST' and path == registerPath:
        requestBody = json.loads(event['body'])
        response = registerUser(requestBody, dynamodb);

    elif method == 'POST' and path == loginPath:
        requestBody = json.loads( event['body'] )
        response = loginUser( requestBody, dynamodb )
    
    elif method == 'POST' and path == deletePath:
        requestBody = json.loads( event['body'] )
        table = dynamodb.Table(TABLE_NAME)
        
        try:
            email = requestBody['email']
            print(email)
            response = table.delete_item( Key={'email': email} )
            response = buildResponse(200, 'User deleted successfully')
        except Exception as e:
            response = buildResponse(503, 'Sever Error in delete, please try again later ' + str(e))
    
    elif method == 'POST' and path == editPath:
        requestBody = json.loads( event['body'] )
        table = dynamodb.Table(TABLE_NAME)
        
        email = requestBody['email']
        name = requestBody['name']
        password = requestBody['password']
        
        try:
            editResponse = table.update_item( Key={'email': email},
                                UpdateExpression="set #mahesh_name=:r, #mahesh_password=:p",
                                ExpressionAttributeNames={ "#mahesh_name": "name", "#mahesh_password": "password" },
                                ExpressionAttributeValues={':r': name, ':p': password },
                                ReturnValues="UPDATED_NEW"
                            )
            response = buildResponse(200, "User with email " + email + " edited successfully")
        except Exception as e:
            response = buildResponse(503, 'Sever Error in delete, please try again later ' + str(e))
            

    elif method == 'GET' and path == homePath:
        table = dynamodb.Table(TABLE_NAME)
        response = table.scan()
        if response['Count'] == 0:
            allUsers = []
        else:
            allUsers = response['Items']
            
        response = buildResponse(200, allUsers )
    else:
        response = buildResponse(404, 'Not found :(')
    
    return response