from flask import Blueprint, render_template, redirect, url_for, request, flash, abort, session, current_app as app
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from ..forms.login import LoginForm
from ..models.user import User


import logging

auth = Blueprint('auth', __name__)
logger = logging.getLogger('src.main.auth')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    """ Handling Login Route
    """
    def _redirect_dest(fallback):
        dest = request.args.get('next')
        if not dest:
            return redirect(fallback)
        return redirect(dest)

    form = LoginForm()

    if form.validate_on_submit():

        admin = User.query.filter_by(username=form.username.data).first()
        if admin:
            if check_password_hash(admin.password, form.password.data):
                login_user(admin)
                logger.info('Admin User Logged In')
                return _redirect_dest('/api/admin')
            else:
                flash('Incorrect username or password. Please try again.',
                      category='error')
                return redirect(url_for('auth.login'))
        else:
            flash('Incorrect username or password. Please try again.',
                  category='error')
            return redirect(url_for('auth.login'))

    return render_template('login.html', user=current_user, form=form)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    logger.info('Admin User Logged Out')
    return redirect(url_for('auth.login'))
