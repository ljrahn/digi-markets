from flask import request, abort
from sqlalchemy import or_
from ..utils.moralis import MoralisApi
from ..models.web3 import NFTContract, BlockchainNetwork
from ..schemas.query_params import nft_search_query_params_schema
from ..schemas.nft import nft_contract_db_schema, nft_contract_db_list_schema
from flask_restful import Resource
import logging

logger = logging.getLogger('src.resources.nft_contract')


def use_blockchain():
    """ return blockchain specified by shortname in request args else return eth blockchain
    """
    short_name_chain = request.args.get('chain', 'eth')
    blockchain = BlockchainNetwork.query.filter_by(
        short_name=short_name_chain).first()
    if blockchain is None:
        abort(400, 'Invalid chain!')
    return blockchain


def get_search_options():
    """ Returns the query params and handles errors with query params
    """
    options = dict()
    options['chain'] = request.args.get('chain', 'eth')
    options['page'] = request.args.get('page', 1)
    options['page_size'] = request.args.get('page_size', 100)
    if 'q' in request.args:
        options['q'] = request.args.get('q')
    if 'filter' in request.args:
        options['filter'] = request.args.get('filter')
    if 'verified' in request.args:
        options['verified'] = request.args.get('verified')

    errors = nft_search_query_params_schema.validate(options)
    if errors:
        abort(400, errors)

    options = nft_search_query_params_schema.dump(options)
    return options


class NFTContractMetadataAPI(Resource):
    def get(self, address):
        """ Get contract metadata

        :param chain (optional, default: eth): the chain to query on

        :returns: {    
            contract_address, 
            name, 
            image, 
            verified, 
            network: {chain_id, name, short_name}, 
            search_count, 
            symbol, 
            contract_type
        }
        """
        blockchain = use_blockchain()
        address = address.lower()

        contract = NFTContract.query.filter_by(
            contract_address=address)
        contract = contract.filter_by(network_id=blockchain.id).first()

        # if contract does not exist in database create the entry by querying moralis api
        if not contract:
            moralis_api = MoralisApi(chain=request.args.get('chain', 'eth'))
            response, status_code = moralis_api.get_nft_contract_metadata(
                address)
            if status_code >= 300:
                abort(status_code, response)

            create_contract = NFTContract(
                contract_address=response['token_address'], name=response['name'],
                symbol=response['symbol'], contract_type=response['contract_type'], network=blockchain)

            create_contract.create()
            contract = NFTContract.query.filter_by(
                contract_address=address).first()

        # Apply schema for nice api response
        response = nft_contract_db_schema.dump(contract)

        return response, 200

    def post(self, address):
        """ Query table NFTContract by address for existing contract entry. IF no entry: 
        (Query moralis.com/nft/<string:address>/metadata?chain={chain}, If exists: 
        (add entry to table NFTContract, increase search count by 1) ELSE: 
        RETURN {message: "Contract does not exist", success: false}) ELSE: 
        Increase contract entry search count by 1

        :param chain (optional, default: eth): the chain to query on

        :returns: {    
            contract_address, 
            name, 
            image, 
            verified, 
            network: {chain_id, name, short_name}, 
            search_count, 
            symbol, 
            contract_type
        }
        """
        blockchain = use_blockchain()
        address = address.lower()

        contract = NFTContract.query.filter_by(
            contract_address=address)
        contract = contract.filter_by(network_id=blockchain.id).first()

        # if contract does not exist in database create the entry by querying moralis api
        if not contract:
            moralis_api = MoralisApi(chain=request.args.get('chain', 'eth'))
            response, status_code = moralis_api.get_nft_contract_metadata(
                address)
            if status_code >= 300:
                abort(status_code, response)

            create_contract = NFTContract(
                contract_address=response['token_address'], name=response['name'],
                symbol=response['symbol'], contract_type=response['contract_type'], network=blockchain)

            create_contract.create()
        # If it does exist in the database, increase the search count by 1
        else:
            contract.search_count += 1
            contract.update()

        contract = NFTContract.query.filter_by(
            contract_address=address).first()

        # Apply schema for nice api response
        response = nft_contract_db_schema.dump(contract)

        return response, 201


class NFTContractSearchAPI(Resource):
    def get(self):
        """ Query table NFTContract sorted by verified THEN highest search count. Searches for partial words. 
        Searches case insensitive

        :param q (required): Search query to execute
        :param filter (required): Filter to use. Options: "name", "symbol", "name,symbol"
        :param chain (optional, default: eth): the chain to query on
        :param page (optional, default: 0):
        :param page_size (optional, default: 100): the number of results to return
        :param verified (optional, default: null): Set true to only display verified contracts. Set false to
        only display non verified contracts. Do not set to display both

        returns: [
            total: # of contracts,
            page: {page},
            page_size: {page_size},
            num_pages: int(({total} + {page_size} - 1) / {page_size})
            num_results = len({result})
            result: {
                contract_address,
                name, image,
                verified,
                network: {chain_id, name, short_name},
                search_count,
                symbol,
                contract_type
            }
        ]
        """
        blockchain = use_blockchain()
        options = get_search_options()

        # prepare the the columns that will be included in search (name, symbol)
        columns = list()
        filter_options = options['filter'].split(',')
        if 'name' in filter_options:
            columns.append(NFTContract.name)
        if 'symbol' in filter_options:
            columns.append(NFTContract.symbol)
        query_columns = [col.ilike(f'%{options["q"]}%')
                         for col in columns]

        # Apply filters
        contract_list = NFTContract.query.filter_by(network=blockchain)
        contract_list = contract_list.filter(or_(*query_columns))
        if 'verified' in options:
            contract_list = contract_list.filter_by(
                verified=options['verified'])

        # Order by verified, and search count
        contract_list = contract_list.order_by(
            NFTContract.verified.desc(), NFTContract.search_count.desc())

        # Apply Pagination
        contract_list = contract_list.paginate(
            options['page'], options['page_size'], error_out=True)

        response = dict(total=contract_list.total, page=options['page'],
                        page_size=options['page_size'], result=contract_list.items)

        # Apply Schema
        response = nft_contract_db_list_schema.dump(response)
        return response, 200
