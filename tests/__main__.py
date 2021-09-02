import unittest
from tests.test_scrape import test_scrape
from tests.test_pagination import test_pagination
from tests.test_model import test_scrape_model
from tests.test_response import test_response


def pagination_test_suite():
    suite = unittest.TestSuite()
    suite.addTest(test_pagination('test_next'))
    suite.addTest(test_pagination('test_prev'))
    suite.addTest(test_pagination('test_total_current_limit'))
    return suite


def model_test_suite():
    suite = unittest.TestSuite()
    suite.addTest(test_scrape_model('test_generate'))
    suite.addTest(test_scrape_model('test_list'))
    suite.addTest(test_scrape_model('test_lists'))
    return suite

def response_suite():
    suite = unittest.TestSuite()
    suite.addTest(test_response('test_model_values'))
    return suite


"""
    To run test cases, please use python -m tests
"""
def scrape_test_suite():
    suite = unittest.TestSuite()
    suite.addTest(test_scrape('test_single_list'))
    suite.addTest(test_scrape('test_lists_with_next_pagination'))
    suite.addTest(test_scrape('test_list_with_no_next_pagination'))
    return suite



if __name__ == "__main__":
    test_runner = unittest.TextTestRunner()
    test_runner.run(pagination_test_suite())
    test_runner.run(model_test_suite())
    test_runner.run(response_suite())
    test_runner.run(scrape_test_suite())
