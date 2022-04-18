from flask import request, abort, jsonify
import requests
from flask_restful import Resource
from ..utils.helper_functions import api_error
import logging
import json

logger = logging.getLogger('src.resources.token_uri')


class FetchTokenURIAPI(Resource):
    def get(self):
        request_arg = request.args.get('request', None)

        if not request_arg:
            abort(400, 'You must include "request" argument')

        r = requests.get(request_arg, headers={
                         'Content-Type': 'application/json'})

        if r.status_code < 300 and r.status_code >= 200:
            return jsonify(json.loads(r.text))
        else:
            logger.warning(api_error(r))
            abort(r.status_code, r.text)
