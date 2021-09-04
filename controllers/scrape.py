from models.scrape import scrape as scp_model
from models.response import response as model_response
from models.pagination import pagination as model_pagination

class Scrape(object):
    currentUrl = None
    event = None

    def __init__(self, event, currentUrl):
        self.event = event
        self.currentUrl = currentUrl


    def create(self):
        """Scrapes an URL, stores and return the file information and timestamp
        ---
        post:
          description: Scrapes an URL, stores using the current timestamp and returns file information
          parameters:
                - name: 'url'
                  in: 'query'
                  required: true
                  description: The link of the URL to scrape
                  schema:
                    type: string
                  examples:
                    Input:
                        summary: Test link
                        value: "https://google.com"
          responses:
            200:
                description: Creates a scraped version of the URL with timestamp
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/URL'
                        examples:
                            google:
                                summary: Scrapped google
                                value:
                                    {"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0, "message": "success"}
                            github:
                                summary: Scrapped github
                                value:
                                    {"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0, "message": "success"}
            400:
                description: Bad request, Invalid URL
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    description: The error message
                        examples:
                            noUrl:
                                summary: Invalid URL
                                value: {"msg": "Invalid URL provided, please provide a valid URL"}
            501:
                description: Timeout, The server could not scrape and has timed out
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    description: The error message from the server
                        examples:
                            noUrl:
                                summary: Server timeout
                                value: {"msg": "Server timed out scrapping, please try again later"}

        """
        ...

    def get_model(self):
        return scp_model()

    def lists(self):

        """Return all scrapped version from a particular URL if URL is provided or return history
        ---
        get:
          description: Get all scrapped version of a particular URL
          parameters:
                - name: page
                  in: 'query'
                  schema:
                    type: 'integer'
                  examples:
                    Input:
                     summary: page number
                     value: 1
                - name: url
                  in: 'query'
                  schema:
                    type: 'string'
                  examples:
                    Input:
                        summary: URL to fetch scrapes
                        value: "https://google.com"
          responses:
            200:
              description: Return list of URL scrapped
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                        msg:
                            type: string
                        data:
                            type: array
                            items:
                                $ref: '#/components/schemas/URL'
                        pagination:
                            $ref: '#/components/schemas/Pagination'
                        status:
                            type: string
                  examples:
                    success:
                        summary: Sample success response
                        value: {"status": "success", "data": [{"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0}], "pagination": {"nextUrl": "https://persistantlink.sample-url.com/scrape?page=3", "prevUrl": "https://persistantlink.sample-url.com/scrape?page=1", "total": 20, "next": 3, "prev": 1, "limit": 20}}

            500:
                description: An error occurred
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    description: The error message from the server
                        examples:
                            ServerError:
                                summary: Server error
                                value: {"msg": "An error occurred. Please try again"}

        """
        response = model_response()

        try:


            model = self.get_model()
            page_number = int(self.event['page']) if 'page' in self.event and self.event['page'] is not None else 1
            model_list = model.lists({
                'query': ' LEFT JOIN url u on a.url_id=u.id WHERE u.url like %s' if 'url' in self.event and self.event['url'] is not None else ' LEFT JOIN url u on a.url_id=u.id' ,
                'fields': 'a.url_shorten, a.url_content, UNiX_TIMESTAMP(a.url_timestamp) as url_timestamp,u.url, a.id as url_id, u.id as parent_url_id',
                'limit': [(page_number - 1) * model_pagination.limit, model_pagination.limit],
                'parameter':  [ '%' + self.event['url'] + '%'] if 'url' in self.event and self.event['url'] is not None else []
            })
            response.data = model_list[1]

            response.status = 'success'
            response.pagination = model_pagination.link(self.currentUrl, page_number, model_list[0]['total'] if model_list[0] is not None else 0).__dict__
        except Exception as error:
            response.status = 'An error occurred. Please try again'
            response.statusCode = 500
            response.msg = error.__str__()

        return response



    def list(self):
        """Return one scrapped version from a particular URL
        ---
        get:
          description: Get all scrapped version of a particular URL
          parameters:
                - name: 'id'
                  in: 'path'
                  schema:
                    type: 'integer'
                  examples:
                    Input:
                        summary: Scrapped content ID
                        value: 1
          responses:
            200:
              description: Return single URL scrapped using the ID
              content:
                application/json:
                  schema:
                        $ref: '#/components/schemas/URL'
                  examples:
                    success:
                        summary: Sample success response
                        value:
                            {"data": {"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0}, "status":"success", "message": "success"}

            400:
                description: Invalid request, Invalid ID provided
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    description: Error message

                        examples:
                            InvalidId:
                                summary: Invalid ID error
                                value: {"msg": "Invalid scrape ID provided. Please check and try again"}


            500:
                description: An error occurred
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    description: The error message from the server
                        examples:
                            noUrl:
                                summary: Server error
                                value: {"msg": "An error occurred. Please try again"}
        """
        response = model_response()
        try:
            model = self.get_model()

            if 'id' not in self.event:
                response.statusCode = 400
                raise ValueError('Value URL id is required')

            response.data = model.list({
                'query': ' LEFT JOIN url u on a.url_id=u.id WHERE a.id = %s',
                'fields': 'a.url_shorten, a.url_content, UNIX_TIMESTAMP(a.url_timestamp) as url_timestamp,u.url, a.id as url_id, u.id as parent_url_id',
                'parameter': [self.event['id']]
            })

            response.status = 'success'
        except Exception as error:
            if response.statusCode == 200:
                response.statusCode = 500
            response.status = 'error'
            response.msg = error.__str__()
        return response



