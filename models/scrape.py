from models.models import models

class scrape(models):
    id = 0
    path = None
    timestamp = 0
    url = None
    parent = 0
    message = None

    @staticmethod
    def list(options=None, **kwargs):
        return models.list(
                options,
                table= 'url_content',
                db=kwargs['db'] if 'db' in kwargs else None,
                model=kwargs['model'] if 'model' in kwargs else scrape())

    @staticmethod
    def lists(options=None, **kwargs):
        return models.lists(
            options,
            db=kwargs['db'] if 'db' in kwargs else None,
            table='url_content',
            model=kwargs['model'] if 'model' in kwargs else scrape())

    """
    {
        "id": 1, 
        "path": "https://my-bucket.s3.us-west-2.amazonaws.com/google.com/", 
        "timestamp": 1629246484, 
        "url": "https://google.com", 
        "parent": 0
    }
    """
    def generate(self, scrap):
        scraperClass = scrape()
        scraperClass.id = scrap['url_id']
        scraperClass.path = scrap['url_shorten']
        scraperClass.timestamp = scrap['url_timestamp']
        scraperClass.url = scrap['url']
        scraperClass.parent = scrap['parent_url_id']
        return scraperClass.__dict__




