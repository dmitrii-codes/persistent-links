import requests
from bs4 import BeautifulSoup
from time import sleep
import datetime
import re
from helpers.s3helper import S3Helper
import uuid
import random, string
from helpers.db import DB
import json

config = {"User-Agent": "uol-scraper","From": "***REMOVED***"}
public_dataset_bn = "***REMOVED***"

S3_PATH = "***REMOVED***"
s3helper = S3Helper(bucket=public_dataset_bn)
dbhelper = DB()

response = {
    "headers" : {
            'Access-Control-Allow-Origin': '*',
            
        },
    "statusCode" : 200,
    "data" : ""
}

def generate_file_name(scrapeurl):
    url = scrapeurl[:63]
    url = url.replace('.','')
    url = re.sub('[^a-zA-Z0-9\n\.]','',url)
    url  = ''.join([url,'.html'])
    return url
    
def write_to_s3(fdata,fname):
    s3_filename = generate_file_name(fname)
    s3helper.put_object(s3_filename,str(fdata))
    s3_object_path = ''.join([S3_PATH,s3_filename])
    return s3_object_path


def generate_shortened_url():
    x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(8))
    return x

def write_to_table(url):
    row_id = 0
    query = '''
    INSERT into url ({column}) VALUE ('{values}');
    '''.format(values=url,column='url')
    print (query)
    row_id = dbhelper.execute_query(query)
    print ("Query executed")
    return row_id


def write_data_to_table(idx,short_url,s3_object_path,d):
    query = '''
    INSERT into url_content 
    (url_id,url_shorten,url_content,url_timestamp)
     VALUE ({idx},'{short_url}','{s3_object_path}','{d}');
    '''.format(idx=idx,short_url=short_url,s3_object_path=s3_object_path,d=d)
    print (query)
    dbhelper.execute_query(query)
    print ("Query executed")

def handle(event,context):
    data = {}
    d = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    url_to_scrape = event.get("url")
    page = requests.get(url_to_scrape, headers=config)
    soup = BeautifulSoup(page.content, "html.parser")
    
    s3_object_path = write_to_s3(soup,url_to_scrape)
    idx =  write_to_table(url_to_scrape)
    short_url = generate_shortened_url()
    write_data_to_table(idx,short_url,s3_object_path,d)

    data['id'] = idx
    data['path'] = s3_object_path
    data['url'] = short_url
    data['message'] = 'success'
    data['timestamp'] = d
    response['data'] = data

    return response




   
