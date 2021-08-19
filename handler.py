import logging
import json
import os
from controllers.sample_controller import SampleController
from providers.db import DB

def handle(event,context):
    # context - https://docs.aws.amazon.com/lambda/latest/dg/python-context.html
    # event - https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html
    logging.info("Entered Event with",event)
    sc = SampleController().execute()
    db = DB()
    return {
        
    }

db = DB()
