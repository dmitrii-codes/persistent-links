import sys
import mysql.connector
from utils import constants

"""
Database Helper to connect to remote MySQL database
"""
class DB:
    dbConn = False
    dbCursor = None
    tableAlias = None

    # Initialize the DatabaseHelper
    def __init__(self, tableAlias = 'a'):
        self.__connect()
        self.tableAlias = tableAlias

    # Connect to a database using configuration from constants
    def __connect(self):
        try:
            self.dbConn = mysql.connector.connect(
                host=constants.DATABASE_HOST,
                user=constants.DATABASE_USERNAME,
                password=constants.DATABASE_PASSWORD,
                database=constants.DATABASE_NAME
            )
            self.dbCursor = self.dbConn.cursor(buffered=True, dictionary=True)
            print('Database connected successfully!!')

        except Exception as error:
            sys.stderr.write('Database connection failed ' + str(error))
            sys.exit()

    """
    table: table name
    values: dict of the key nd value to add to the table
    """
    def write(self, table, values):
        keyStr = '('
        valueStr = '('
        valueTuple = [table]
        for key, value in values.items():
            if valueStr != '(':
                valueStr += ','
            if keyStr != '(':
                keyStr += ','

            keyStr += "`" + key + "`"
            valueStr += '%s'
            valueTuple.append(value)

        keyStr += ")"
        valueStr += ")"

        sql = "INSERT INTO ({}) ({}) VALUE ({})".format(table, keyStr, valueStr)
        return self.dbCursor.execute(sql, tuple(valueTuple))

    def buildQQuery(self, table, options):
        parameters = ()
        pgn = None
        if options is None:
            options = {}
        sql = "SELECT {} FROM " + table + " " + self.tableAlias + " "


        if 'query' in options:
            sql += " {} ".format(options['query'])

        if 'query' in options and 'parameter' in options:
            parameters = tuple(options['parameter'])

        pgn = self.pagination(sql.format('count(*) as total'), parameters)

        if 'limit' in options:
            sql += " limit {0}, {1}".format(*options['limit'])



        if 'fields' in options:
            sql = sql.format(options['fields'])
        else:
            sql = sql.format('*')
        return pgn, sql, parameters

    """
    Options 
        query: query to append to the main query
        fields: fields to fetch
        parameter: parameter tuple for prepared statement
        limit: number to limit eg start_number, total_return string of comma separated integer
    """
    def get(self, table, options=None):
        (pgn, sql, parameters) = self.buildQQuery(table, options)
        self.dbCursor.execute(sql, parameters)

        return pgn, self.dbCursor.fetchall()

    """
    Options 
        query: query to append to the main query
        fields: fields to fetch
        parameter: parameter tuple for prepared statement
    """
    def one(self, table, options=None):
        pgn, sql, parameters = self.buildQQuery(table, options)
        self.dbCursor.execute(sql, parameters)
        return self.dbCursor.fetchone()

    def pagination(self, sql, parameters):
        self.dbCursor.execute(sql, parameters)
        return self.dbCursor.fetchone()
