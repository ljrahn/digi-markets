from flask import request, abort
from ..schemas.nft import nft_token_schema, nft_token_list_schema, nft_token_transfer_list_schema
from ..schemas.query_params import nft_query_params_schema
from ..utils.moralis import MoralisApi
from flask_restful import Resource
import logging

logger = logging.getLogger('src.resources.nft_token')


def get_options(list=False):
    """ Returns the query params and handles errors with query params
    :param list: specify True if you should handle params for pagination
    """
    options = dict()
    options['chain'] = request.args.get('chain', 'eth')

    if list:
        options['page'] = request.args.get('page', 1)
        options['page_size'] = request.args.get('page_size', 100)

    errors = nft_query_params_schema.validate(options)
    if errors:
        abort(400, errors)

    options = nft_query_params_schema.dump(options)
    return options


class NFTTokenListAPI(Resource):
    def get(self, address):
        """ Query moralis.com/nft/<string:address>?chain={chain} for page_size nfts of given contract

        :param chain (optional, default: eth): the chain to query on
        :param page (optional, default: 1): the page to query for
        :param page_size (optional, default: 100): the number of results to return

        returns: {
            total: # of nfts for contract,
            page: {page},
            page_size: {page_size},
            num_pages: int(({total} + {page_size} - 1) / {page_size})
            num_results = len({result})
            result: [
                {
                    contract_address, 
                    name, 
                    symbol, 
                    token_uri, 
                    token_id,
                    metadata
                }
            ]
        }
        """
        options = get_options(list=True)

        moralis_api = MoralisApi(
            chain=options['chain'], page=options['page'], page_size=options['page_size'])

        response, status_code = moralis_api.get_nft_token_list(address)
        if status_code >= 300:
            abort(status_code, response)

        response = nft_token_list_schema.dump(response)

        if response['total'] == 0:
            abort(404, {'message': 'no tokens exist for this contract address'})

        return response, 200


class NFTTokenAPI(Resource):
    def get(self, address, token_id):
        """ Query moralis.com/nft/<string:address>/<integer:token_id>?chain={chain} for 
        data on a given token id of a contract

        :param chain (optional, default: eth): the chain to query on

        returns: {
            contract_address, 
            name, 
            symbol, 
            owner, 
            token_uri, 
            token_id, 
            metadata
        }

        """
        options = get_options()

        moralis_api = MoralisApi(chain=options['chain'])
        response, status_code = moralis_api.get_nft_token(address, token_id)

        if status_code >= 300:
            abort(status_code, response)

        response = nft_token_schema.dump(response)

        return response, 200


class NFTTokenTransfersAPI(Resource):
    def get(self, address, token_id):
        """ Query moralis.com/nft/<string:address>/<integer:token_id>/transfers?chain={chain} 
            for transfer data on a given token id for a given contract

        :param chain (optional, default: eth): the chain to query on
        :param page (optional, default: 1): the page to query for will
        :param page_size (optional, default: 100): the number of results to return

        :returns: {
            total: # of transfers for token_id,
            page: {page},
            page_size: {page_size},
            num_pages: int(({total} + {page_size} - 1) / {page_size})
            num_results = len({result})
            result: [
                {
                    block_number, 
                    block_timestamp, 
                    transaction_hash, 
                    from_address, 
                    to_address, 
                    value, 
                    contract_address, 
                    name, 
                    symbol, 
                    token_id
                }
        ]
        """
        options = get_options(list=True)

        moralis_api = MoralisApi(
            chain=options['chain'], page=options['page'], page_size=options['page_size'])

        response, status_code = moralis_api.get_nft_token_transfers(
            address, token_id)
        if status_code >= 300:
            abort(status_code, response)

        response = nft_token_transfer_list_schema.dump(response)

        if response['total'] == 0:
            abort(404, {'message': 'no tokens exist for this contract address'})

        return response, 200
