class Scrape(object):

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
                  examples:
                    success:
                        summary: Sample success response
                        value: {"message": "success", "data": [{"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0}], "pagination": {"nextUrl": "https://persistantlink.sample-url.com/scrape?page=3", "prevUrl": "https://persistantlink.sample-url.com/scrape?page=1", "total": 10}}

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
        ...

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
                            {"id": 1, "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", "timestamp": 1629246484, "url": "https://google.com", "parent": 0, "message": "success"}

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
        ...
