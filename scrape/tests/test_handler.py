from handler import handle
from unittest import TestCase
import os
import sys
import json
test_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, test_path + "/../")

class EventContext:
    #event holds the input to the serverless function
    def __init__(self):
        self.event = {'url' : 'https://www.programiz.com/python-programming/datetime/strftime'}
        
class TestHandler(TestCase):
    #add more tests here!
    def test_handler(self):
        event = EventContext().event
        print (handle(event,''))

   