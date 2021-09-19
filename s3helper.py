import logging
import boto3
from botocore.exceptions import ClientError
class S3Helper:
    """
    Class to connect to S3 to get and put file objects to S3 bucket or its folders
    """

    def __init__(self, bucket=""):
        """
        Instantiates the s3 client object
        """

        self.bucket = bucket
        self.s3_client = boto3.client("s3")

    def set_bucket(self, bucket):
        self.bucket = bucket

    def upload_file(self, local_file_path, file_path_on_S3):
        """
        Creates a file in S3 bucket using the input data provided.
        """
        try:
            self.s3_client.upload_file(local_file_path, self.bucket, file_path_on_S3)
        except Exception as exception:
            logging.error("Error with upload_file : %s",exception)
            raise exception
            
    def put_object(self, dest_object_name, object_data):
        """
        Creates a file in S3 bucket using the input data provided.
        In case of an error boto3 raises an exception.
        """
        try:
            response = self.s3_client.put_object(
                Bucket=self.bucket, Key=dest_object_name, Body=object_data,ContentType='text/html')
            return response["ResponseMetadata"]["HTTPStatusCode"] == 200
        except Exception as e:
            logging.error("Error calling put_object() : %s",e)
            raise e
        
    def get_object(self, file_name):
        """
        Gets the object in the S3 bucket as a stream.
        In case of an error boto3 raises an exception.
        """
        try:
            file = self.s3_client.get_object(Bucket=self.bucket, Key=file_name)
            return file.get("Body")
        except Exception as exception:
            logging.error("Error calling get_object: %s", exception)
            raise exception

    def get_object_content(self, file_name):
        """
        Gets the object in the S3 bucket as text.
        In case of an error boto3 raises an exception.
        """
        try:
            file = self.s3_client.get_object(Bucket=self.bucket, Key=file_name)
            return file.get("Body").read().decode("utf-8")
        except Exception as exception:
            logging.error("Error calling get_object_content %s",exception)
            raise exception
    def copy_object(self, source_file_name, target_file_name, target_bucket=None):
        """
        Gets the object in the S3 bucket to another location or as a different file name
        in the same location within the same bucket.
        In case of an error boto3 raises an exception.
        """
        if not target_bucket:
            target_bucket = self.bucket
        try:
            response = self.s3_client.copy_object(
                CopySource={"Bucket": self.bucket, "Key": source_file_name},
                Key=target_file_name,
                Bucket=target_bucket,
                )
            return response["ResponseMetadata"]["HTTPStatusCode"] == 200
        except Exception as exception:
            logging.error("Error calling copy_object : %s",exception)
            raise exception
    def delete_object(self, file_name):
        """
        Delete the object in the S3 bucket.
        In case of an error boto3 raises an exception.
        """
        try:
            response = self.s3_client.delete_object(Bucket=self.bucket, Key=file_name)
            return response ["ResponseMetadata"]["HTTPStatusCode"] == 204
        except Exception as exception:
            logging.error("Error at delete object: %s",exception)
            raise exception

    def list_objects(self, prefix):
        """
        Lists all objects in an S3 bucket for a given prefix.
        In case of an error boto3 raises an exception.
        """
        paginator = self.s3_client.get_paginator("list_objects_v2")
        operation_parameters = {"Bucket": self.bucket, "Prefix": prefix}
        page_iterator = paginator.paginate(**operation_parameters)
        result = []
        for page in page_iterator:
            mapper = map(
                lambda x: {"Key": x["Key"], "Size": x["Size"]}, page["Contents"]
            )
            result.extend(mapper)
        return result

    def create_presigned_url(self, object_name, bucket_name, expiration=3600):
        """Generate a presigned URL to share an S3 object

        :param bucket_name: string
        :param object_name: string
        :param expiration: Time in seconds for the presigned URL to remain valid
        :return: Presigned URL as string. If error, returns None.
        """
        # Generate a presigned URL for the S3 object
        try:
            response = self.s3_client.generate_presigned_url(
                        'get_object',
                        Params={'Bucket': bucket_name, 'Key': object_name},
                        ExpiresIn=expiration
                        )
            return response
        except Exception as exception:
            logging.error("Error at create_presigned_url %s",exception)
            raise exception
    
    def get_object_keycount(self, bucket_name, object_path):
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=bucket_name,
                Prefix=object_path,
            )
            return response
        except Exception as exception:
            logging.error("Error at get_object_keycount %s",exception)
            return None
        