import psycopg2

username = 'postgres'
password = 'admin'
dbName = 'aima_forum'

def db_connection():
  return psycopg2.connect(user=username, password=password, dbname=dbName, host='localhost', port='5432')