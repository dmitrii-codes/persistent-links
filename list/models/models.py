from providers.db import DB

class models:
    tableAlias = 'a'

    def generate(self, scrap):
        pass

    @staticmethod
    def list(options = None, **kwargs):
        db = kwargs['db'] if 'db' in kwargs and kwargs['db'] is not None else DB(models.tableAlias)
        return kwargs['model'].generate(
                db.one(table=kwargs['table'], options=options)
            )

    @staticmethod
    def lists(options = None, **kwargs):
        db = kwargs['db'] if 'db' in kwargs and kwargs['db'] is not None else DB(models.tableAlias)
        scrape_lists = db.get(table=kwargs['table'], options = options)
        return scrape_lists[0], [kwargs['model'].generate(value) for value in scrape_lists[1]]
