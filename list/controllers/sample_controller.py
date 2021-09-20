from providers.s3 import S3
class SampleController(object):
    def __init__(self):
        self.s3provider = S3()

    def print_stuff(self):
        ...
    
    def run_stuff(self):
        ...
    def execute(self):
        self.run_stuff()
        self.print_stuff()
