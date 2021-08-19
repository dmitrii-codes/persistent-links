from apispec import APISpec
from controllers import scrape
from utils.documentation.docplugin import DocPlugin
from apispec.ext.marshmallow import MarshmallowPlugin
from marshmallow import Schema, fields

import json

def resolver(schema):
    return None

spec = APISpec(
    title='Persistent Link',
    version="0.0.1",
    openapi_version="3.0.2",
    plugins=[DocPlugin(), MarshmallowPlugin(schema_name_resolver=resolver)]
)

scrapper = scrape.Scrape()

class PaginationSchema(Schema):
    nextUrl = fields.Str(metadata={"description": "URL to call for the next page, only available if next is available"})
    prevUrl = fields.Str(metadata={"description": "URL to call for the prev page, only available if prev is available"})
    total = fields.Int(metadata={"description": "The total number of data available"})

class URLSchema(Schema):
    id = fields.Int(dump_only=True, metadata={"description": "The primary key of this field"})
    path = fields.Str(metadata={"description": "Location of this file on S3 bucket"})
    timezone = fields.Int(metadata={"description": "The epoch timestamp when this file was created"})
    url = fields.Str(metadata={"description": "The URL that created this file"})
    parent = fields.Int(dump_only=True, metadata={"description": "The parent ID of this URL, zero if this is the only scrape that has happened for this URL"})
    msg = fields.Str(metadata={"description": "The message server returns upon completion"})

spec.components.schema("URL", schema=URLSchema)
spec.components.schema("Pagination", schema=PaginationSchema)
spec.path(path='/scrape', func=scrapper.create)
spec.path(path='/scrape', func=scrapper.lists)
spec.path(path='/scrape/{id}', func =scrapper.list)
openAPIFile = open('openapi.json', 'w')
openAPIYamlFile = open('openapi.yaml', 'w')
print(json.dump(spec.to_dict(), openAPIFile, indent=2))
print()
