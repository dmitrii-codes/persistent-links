from providers.db import DB

class models:
    tableAlias = 'a'

    def generate(self, scrap):
        pass

    @staticmethod
    def list(options = None, **kwargs):
        db = DB(models.tableAlias) if 'db' not in kwargs else kwargs['db']
        return kwargs['model'].generate(
                db.one(table=kwargs['table'], options=options)
            )

    @staticmethod
    def lists(options = None, **kwargs):
        db = DB(models.tableAlias) if 'db' not in kwargs else kwargs['db']
        scrape_lists = db.get(table=kwargs['table'], options = options)
        return scrape_lists[0], [kwargs['model'].generate(value) for value in scrape_lists[1]]
