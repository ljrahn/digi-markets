import os
from dotenv import load_dotenv
load_dotenv()


class Config:
    DEBUG = False
    LOCAL = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')

    POSTGRES_DB = os.getenv('POSTGRES_DB')
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    DB_URL = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}'
    SQLALCHEMY_DATABASE_URI = DB_URL

    SERVER_LOG_PATH = os.getenv('SERVER_LOG_PATH')

    SERVER_URL = os.getenv('SERVER_URL')
    CLIENT_URL = os.getenv('CLIENT_URL')

    SERVER_ADMIN_USER = os.getenv('SERVER_ADMIN_USER')
    SERVER_ADMIN_PASSWORD = os.getenv('SERVER_ADMIN_PASSWORD')

    MORALIS_BASE_URL = os.getenv('MORALIS_BASE_URL')
    MORALIS_API_KEY = os.getenv('MORALIS_API_KEY')


class DevConfig(Config):
    DEBUG = True
    ENV = 'development'

    if os.getenv('LOCAL') == 'true':
        LOCAL = True


class ProdConfig(Config):
    ENV = 'production'
