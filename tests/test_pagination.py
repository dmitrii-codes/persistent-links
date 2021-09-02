import unittest
from models.pagination import pagination

class test_pagination(unittest.TestCase):
    pgn = None

    def setUp(self) -> None:
        self.pgn = pagination.link('/scrape', 1, 22)

    def test_next(self):
        self.assertEqual(self.pgn.next, 2)
        self.assertEqual(self.pgn.nextPage, '/scrape?page=2')


    def test_prev(self):
        self.assertEqual(self.pgn.prev, 0)
        self.assertEqual(self.pgn.prevPage, '/scrape?page=0')
        self.pgn  = pagination.link('/scrape', 2, 22)
        self.assertEqual(self.pgn.prev, 1)
        self.assertEqual(self.pgn.prevPage, '/scrape?page=1')

    def test_total_current_limit(self):
        self.assertEqual(self.pgn.limit, 20)
        self.assertEqual(self.pgn.total, 22)
