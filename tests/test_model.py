import unittest
from unittest.mock import MagicMock
from models.scrape import scrape
from models.pagination import pagination

class test_scrape_model(unittest.TestCase):
    scrape_model = None
    database_content = None

    def setUp(self) -> None:
        self.scrape_model = scrape()
        self.database_content = {
            'url_id': 1,
            'url_shorten': 'https://persistent.io/332',
            'url_timestamp': 344224555,
            'url': 'https://google.com',
            'parent_url_id': 1,
        }

    def test_generate(self):

        generated_model = self.scrape_model.generate(
            self.database_content
        )
        self.assertEqual(self.database_content['url_id'], generated_model['id'])
        self.assertEqual(self.database_content['url_shorten'], generated_model['path'])
        self.assertEqual(self.database_content['url_timestamp'], generated_model['timestamp'])
        self.assertEqual(self.database_content['url'], generated_model['url'])
        self.assertEqual(self.database_content['parent_url_id'], generated_model['parent'])

    def test_list(self):

        self.scrape_model.generate = MagicMock(name='generate', return_value={
            'id': self.database_content['url_id'],
            'path': self.database_content['url_shorten'],
            'url_timestamp': self.database_content['url_timestamp'],
            'url': self.database_content['url'],
            'parent': self.database_content['parent_url_id']
        })
        db = MagicMock(name='DB')
        db.__connect = MagicMock(name='__connect')
        db.one = MagicMock(name='one', return_value=self.database_content)

        options = {}
        self.scrape_model.list(options, table= 'url_content', model=self.scrape_model, db=db)
        self.scrape_model.generate.assert_called_with(self.database_content)
        db.one.assert_called_with(table='url_content', options=options)


    def test_lists(self):
        self.scrape_model.generate = MagicMock(name='generate', return_value={
            'id': self.database_content['url_id'],
            'path': self.database_content['url_shorten'],
            'url_timestamp': self.database_content['url_timestamp'],
            'url': self.database_content['url'],
            'parent': self.database_content['parent_url_id']
        })

        db = MagicMock(name='DB')
        db.__connect = MagicMock(name='__connect')
        pgn = pagination(1, 2)
        db.get = MagicMock(name='get', return_value=(pgn, [self.database_content]))
        options = {}
        self.scrape_model.lists(options, table= 'url_content', model=self.scrape_model, db=db)
        db.get.assert_called_with(table='url_content', options=options)
        self.scrape_model.generate.assert_called_with(self.database_content)

