import unittest
from models.response import response
from models.pagination import pagination


class test_response(unittest.TestCase):

    """
    verify the pagination can assign values
    """
    def test_model_values(self):
        pgn = pagination.link('/scrape', 1, 22)
        resp = response()
        resp.msg = 'Test msg'
        resp.status = 'success'
        resp.data = None
        resp.pagination = pgn

        self.assertEqual(resp.msg, 'Test msg')
        self.assertEqual(resp.status, 'success')
        self.assertEqual(resp.pagination, pgn)
