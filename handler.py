import logging
import json
import os
from controllers.sample_controller import SampleController
from controllers.scrape import Scrape
from providers.db import DB

def handle(event,context):
    # context - https://docs.aws.amazon.com/lambda/latest/dg/python-context.html
    # event - https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html
    logging.info("Entered Event with",event)
    # sc = SampleController().execute()
    contlr = Scrape(event, '/scrape/')

    list_res = contlr.lists()
    return {
        
    }

handle({
    'page': 1
}, {})
