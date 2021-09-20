from handler import handle
from unittest import TestCase
import os
import sys

test_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, test_path + "/../")

#How to run unittests
'''
cd to root directory
python3 -m unittest tests/test_handler.py

'''
class EventContext:
    #event holds the input to the serverless function
    def __init__(self):
        self.event = {}
        
class TestHandler(TestCase):
    #add more tests here!
    def test_handler(self):
        event = EventContext().event
        print (handle(event,''))

   