from webbrowser import get
from flask import Blueprint, current_app as app, make_response, request, abort
from sqlalchemy import or_
from ..models.web3 import BlockchainNetwork
from ..schemas.network import blockchain_network_schema, blockchain_network_list_schema
from ..schemas.query_params import network_query_params_schema
from flask_restful import Resource
import logging

logger = logging.getLogger('src.resources.network')


def get_options():
    options = dict()
    options['cursor'] = request.args.get('cursor', '')
    options['page_size'] = request.args.get('page_size', 100)

    errors = network_query_params_schema.validate(options)
    if errors:
        abort(400, errors)

    options = network_query_params_schema.dump(options)
    return options


class BlockchainNetworkAPI(Resource):
    def get(self, chain_id):
        """ Query table BlockchainNetwork by chain_id

        returns: {
            name,
            short_name,
            chain_id,
            network_id,
            block_explorer,
            supported,
            currency
        }
        """
        blockchain = BlockchainNetwork.query.filter_by(
            chain_id=chain_id).first()
        if blockchain is None:
            abort(400, 'Invalid chain!')

        response = blockchain_network_schema.dump(blockchain)

        return response, 200


class BlockchainNetworkListAPI(Resource):
    def get(self):
        """ Query ALL table BlockchainNetwork

        returns: {
            total: # of nfts for address,
            page: {page},
            page_size: {page_size},
            num_pages: int(({total} + {page_size} - 1) / {page_size})
            num_results = len({result})
            result = [
                {
                    name,
                    short_name,
                    chain_id,
                    network_id,
                    block_explorer,
                    supported,
                    currency
                }
            ]
        }
        """
        options = get_options()

        blockchain = BlockchainNetwork.query.paginate(
            options['page'], options['page_size'], error_out=True)
        response = dict(total=blockchain.total, page=options['page'],
                        page_size=options['page_size'], result=blockchain.items)

        response = blockchain_network_list_schema.dump(response)

        return response, 200
