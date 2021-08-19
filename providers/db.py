import sys
import mysql.connector
from utils import constants

"""
Database Helper to connect to remote MySQL database
"""


class DB:
    _dbConn = False

    # Initialize the DatabaseHelper
    def __init__(self):
        self.__connect()

    # Connect to a database using configuration from constants
    def __connect(self):
        try:
            self.dbConn = mysql.connector.connect(
                host=constants.DATABASE_HOST,
                user=constants.DATABASE_USERNAME,
                password=constants.DATABASE_PASSWORD,
                database=constants.DATABASE_NAME
            )
            print('Database connected successfully!!')

        except Exception as error:
            sys.stderr.write('Database connection failed ' + str(error))
            sys.exit()
