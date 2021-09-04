import json
from controllers.scrape import Scrape


def handler(event, context):
    page = 1
    id = None
    url = None

    response = None

    if 'queryStringParameters' in event and event['queryStringParameters'] is not None and 'page' in event['queryStringParameters']:
        page = event['queryStringParameters']['page']

    if 'queryStringParameters' in event and event['queryStringParameters'] is not None and 'url' in event['queryStringParameters']:
        url = event['queryStringParameters']['url']

    if 'pathParameters' in event and event['pathParameters'] is not None and 'id' in event['pathParameters']:
        id = event['pathParameters']['id']

    contlr = Scrape({'id': id, 'page': page, 'url': url}, '/scrape/')

    if id is not None:
        response = contlr.list()
    elif event['httpMethod'] == 'GET':
        response = contlr.lists()
    elif event['httpMethod'] == 'POST':
        response = contlr.create()

    return {
        'statusCode': response.statusCode,
        'body': json.dumps(response.__dict__)
    }


print(handler(
    {
        'httpMethod': 'GET',
            'queryStringParameters': {
                'url': 'https://google.com',
                'page': '2'
            }

    }, {}))
