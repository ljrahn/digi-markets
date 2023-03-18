import sys
import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, session, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from flask_login import LoginManager
from flask_admin import Admin
from flask_admin.menu import MenuLink
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_wtf.csrf import CSRFProtect
from flask_bootstrap import Bootstrap
from flask_cors import CORS
import eventlet
from datetime import timedelta


app = Flask(__name__)
login_manager = LoginManager()
db = SQLAlchemy()
ma = Marshmallow()
admin = Admin()
cors = CORS()
csrf = CSRFProtect()
migrate = Migrate()
bootstrap = Bootstrap()
socketio = SocketIO()  # just incase socketio is needed in the future ;)
eventlet.monkey_patch()


def create_app():
    """ Initilizes the flask app
    """

    # Load application variables
    if os.environ.get('ENVIRONMENT') == 'prod':
        app.config.from_object("config.ProdConfig")
    elif os.environ.get('ENVIRONMENT') == 'dev':
        app.config.from_object("config.DevConfig")
    else:
        print(
            'Environment variable "ENVIRONMENT" was not specified. Options: "prod", "dev".')
        sys.exit(4)

    # Log Setup
    setup_logging(app)
    app.logger.info(app.config)
    app.logger.info('Application starting!')

    # Initilize modules
    from .main.admin import MyAdminIndexView
    db.init_app(app)
    login_manager.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app, cors_allowed_origins='*')
    if app.config['ENV'] == 'production':
        cors.init_app(app, resources={
            r"/api/*": {"origins": "https://digimarkets.lujr.ca"}})
    else:
        cors.init_app(app)

    bootstrap.init_app(app)
    csrf.init_app(app)
    admin.init_app(app, index_view=MyAdminIndexView(
        url='/api/admin'), url='/api/admin')
    admin.add_link(MenuLink(name='Logout', url='/api/logout'))

    # Register Blueprints
    from .main.auth import auth
    from .resources import api_bp
    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(api_bp, url_prefix='/api')
    csrf.exempt(api_bp)

    # Import Models
    from .models.user import User
    from .models.web3 import NFTContract, BlockchainNetwork

    # Initalize database
    create_database(app, User, NFTContract, BlockchainNetwork)

    # Setup login manager
    login_manager.login_view = 'auth.login'

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def setup_logging(app):
    if not app.config["LOCAL"]:
        os.system(
            f'mkdir -p {os.path.dirname(app.config["SERVER_LOG_PATH"])}')
        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(logging.Formatter(
            '[%(asctime)s] [%(levelname)s] : %(name)s:%(lineno)d - %(message)s'))
        rotating_file_handler = RotatingFileHandler(
            app.config["SERVER_LOG_PATH"], maxBytes=200000, backupCount=10)
        rotating_file_handler.setFormatter(logging.Formatter(
            '[%(asctime)s] [%(levelname)s] : %(name)s:%(lineno)d - %(message)s'))
        if (app.logger.hasHandlers()):
            app.logger.handlers.clear()
        app.logger.addHandler(stream_handler)
        app.logger.addHandler(rotating_file_handler)
        app.logger.setLevel(logging.DEBUG)


def create_database(app, User, NFTContract, BlockchainNetwork):
    """ Create Database
    """
    with app.app_context():
        db.create_all()
        init_admin_user(app, User)
        init_network_data(app, BlockchainNetwork)
        app.logger.info('Database is setup!')


def init_admin_user(app, User):
    """ Recreates the admin user everytime server boots up
    """
    User.__table__.drop(db.session.bind)
    User.__table__.create(db.session.bind, checkfirst=True)

    admin_user = User(
        username=app.config['SERVER_ADMIN_USER'], password=generate_password_hash(
            app.config['SERVER_ADMIN_PASSWORD'], method='sha256'))
    admin_user.create()
    app.logger.info('Admin User Created!')


def init_network_data(app, BlockchainNetwork):
    """ Initilizes database for blockchain network data specified in ../db_data/initial_network_data.json
    """
    for single_network in app.config['BLOCKCHAIN_NETWORK_DATA']:
        check_exists = BlockchainNetwork.query.filter_by(
            chain_id=single_network['chain_id']).first()
        if not check_exists:
            network = BlockchainNetwork(**single_network)
            network.create()

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     """ Redirect to admin home page for any route not found
#     """
#     return redirect('/api/admin')


@app.before_request
def session_timeout():
    """ Session should timeout
    """
    session.permanent = True
    app.permanent_session_lifetime = timedelta(hours=1)
