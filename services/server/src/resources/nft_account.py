from flask import request, abort
from ..schemas.nft import nft_token_list_schema, nft_token_transfer_list_schema
from ..schemas.query_params import nft_query_params_schema
from ..utils.moralis import MoralisApi
from flask_restful import Resource
import logging

logger = logging.getLogger('src.resources.nft_account')


def get_options(list=False):
    """ Returns the query params and handles errors with query params
    :param list: specify True if you should handle params for pagination
    """

    options = dict()
    options['chain'] = request.args.get('chain', 'eth')

    if list:
        options['cursor'] = request.args.get('cursor', '')
        options['page_size'] = request.args.get('page_size', 100)

    errors = nft_query_params_schema.validate(options)
    if errors:
        abort(400, errors)

    options = nft_query_params_schema.dump(options)
    return options


class NFTAccountAPI(Resource):
    def get(self, address):
        """ Query moralis.com/<string:address>/nft?chain={chain} for all nfts owned by a given eoa address

        :param chain (optional, default: eth): the chain to query on
        :param page (optional, default: 1): the page to query for will
        :param page_size (optional, default: 100): the number of results to return

        :returns: {
            total: # of nfts for address,
            page: {page},
            page_size: {page_size},
            num_pages: int(({total} + {page_size} - 1) / {page_size})
            num_results = len({result})
            result: [
                {contract_address, name, symbol, owner, token_uri, token_id, metadata}
            ]
        }
        """
        options = get_options(list=True)

        moralis_api = MoralisApi(
            chain=options['chain'], cursor=options['cursor'], page_size=options['page_size'])
        response, status_code = moralis_api.get_nft_account(address)

        if status_code >= 300:
            abort(status_code, response)
        
        response = nft_token_list_schema.dump(response)
        response['page'] -= 1 # this very specific api is broken for moralis.... ill never use moralis again

        return response, 200


class NFTAccountTransfersAPI(Resource):
    def get(self, address):
        """
        Query moralis.com/<string:address>/nft/transfers?chain={chain} for all nft transfers to and from a given eoa address

        :param chain (optional, default: eth): the chain to query on
        :param page (optional, default: 1): the page to query for will
        :param page_size (optional, default: 100): the number of results to return

        :returns: {
            total: # of nfts for address,
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
        }
        """
        options = get_options(list=True)

        moralis_api = MoralisApi(
            chain=options['chain'], cursor=options['cursor'], page_size=options['page_size'])
        response, status_code = moralis_api.get_nft_account_transfers(address)

        if status_code >= 300:
            abort(status_code, response)

        response = nft_token_transfer_list_schema.dump(response)

        return response, 200
