import unittest
from unittest.mock import MagicMock
from controllers.scrape import Scrape
from models.scrape import scrape as scp_model

class test_scrape(unittest.TestCase):
    scrape = None
    database_content = None

    def tearDown(self) -> None:
        pass

    def setUp(self) -> None:
        self.scrape = Scrape({
            'page': 1,
            'id': 1
        }, '/scrape')
        self.database_content = {
            'url_id': 1,
            'url_shorten': 'https://persistent.io/332',
            'url_timestamp': 344224555,
            'url': 'https://google.com',
            'parent_url_id': 1,
        }

    def test_single_list(self):
        self.scrape.get_model = scp_model
        self.scrape.get_model.list = MagicMock(name='list', return_value={
            'id': self.database_content['url_id'],
            'path': self.database_content['url_shorten'],
            'url_timestamp': self.database_content['url_timestamp'],
            'url': self.database_content['url'],
            'parent': self.database_content['parent_url_id']
        })
        scrape_list = self.scrape.list()
        self.assertEqual(scrape_list.data['id'], self.database_content['url_id'])

    def test_list_empty_value(self):
        self.scrape.get_model = scp_model
        self.scrape.get_model.list = MagicMock(name='list', return_value=None)
        scrape_list = self.scrape.list()
        self.assertIsNone(scrape_list.data)

    def test_lists_with_next_pagination(self):
        self.scrape.get_model = scp_model
        self.scrape.get_model.lists = MagicMock(name='lists', return_value=({'total': 22}, [{
            'id': self.database_content['url_id'],
            'path': self.database_content['url_shorten'],
            'url_timestamp': self.database_content['url_timestamp'],
            'url': self.database_content['url'],
            'parent': self.database_content['parent_url_id']
        }]))
        scrape_lists = self.scrape.lists()
        self.assertEqual(scrape_lists.pagination['total'], 22)
        self.assertEqual(scrape_lists.pagination['nextPage'], '/scrape?page=2')
        self.assertTrue('prevPage' not in scrape_lists.pagination)
        self.assertEqual(scrape_lists.pagination['current'], 1)
        self.assertGreater(len(scrape_lists.data), 0)


    def test_list_with_no_next_pagination(self):
        self.scrape.get_model = scp_model
        self.scrape.get_model.lists = MagicMock(name='lists', return_value=({'total': 2}, [{
            'id': self.database_content['url_id'],
            'path': self.database_content['url_shorten'],
            'url_timestamp': self.database_content['url_timestamp'],
            'url': self.database_content['url'],
            'parent': self.database_content['parent_url_id']
        }]))
        scrape_lists = self.scrape.lists()
        self.assertEqual(scrape_lists.pagination['total'], 2)
        self.assertTrue('nextPage' not in scrape_lists.pagination)
        self.assertTrue('prevPage' not in scrape_lists.pagination)
        self.assertEqual(scrape_lists.pagination['current'], 1)
        self.assertGreater(len(scrape_lists.data), 0)
