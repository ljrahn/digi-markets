from flask import current_app as app
import requests
from urllib.parse import urlencode
from .helper_functions import api_error
import logging

logger = logging.getLogger('src.utils.moralis')


class MoralisApi:
    """
    Moralis API class for fetching data from Moralis HTTP API
    """

    def __init__(self, chain: str = 'eth', cursor: str = '', page_size: int = 100, disable_total: str ='false'):
        self.__base_url = app.config['MORALIS_BASE_URL']
        self.__api_key = app.config["MORALIS_API_KEY"]
        self.chain = chain
        self.cursor = cursor
        self.page_size = page_size
        self.disable_total = disable_total

    @property
    def options(self):
        options = dict()
        if self.chain is not None:
            options['chain'] = self.chain
        if self.page_size is not None:
            options['limit'] = self.page_size
        if self.cursor != '':
            options['cursor'] = self.cursor
        if self.disable_total is not None:
            options['disable_total'] = self.disable_total
        return options

    def __get(self, endpoint: str) -> dict:
        logger.info(urlencode(self.options))
        logger.info(f'{self.__base_url}{endpoint}?{urlencode(self.options)}')

        r = requests.get(f'{self.__base_url}{endpoint}?{urlencode(self.options)}', headers={
                         'Content-Type': 'application/json', 'X-API-Key': self.__api_key})

        if r.status_code >= 200 and r.status_code < 300:
            return r.json(), r.status_code
        else:
            logger.warning(api_error(r, error_name=f'MORALIS {r.status_code}: \
                          {self.__base_url}{endpoint}?{urlencode(self.options)}'))
            return r.json(), r.status_code

    def get_nft_token_list(self, contract_address: str) -> dict:
        endpoint = f'/nft/{contract_address}'
        return self.__get(endpoint)

    def get_nft_token(self, contract_address: str, token_id: int) -> dict:
        endpoint = f'/nft/{contract_address}/{token_id}'
        return self.__get(endpoint)

    def get_nft_token_transfers(self, contract_address: str, token_id: int) -> dict:
        endpoint = f'/nft/{contract_address}/{token_id}/transfers'
        return self.__get(endpoint)

    def get_nft_account(self, account_address: str) -> dict:
        endpoint = f'/{account_address}/nft'
        return self.__get(endpoint)

    def get_nft_account_transfers(self, account_address: str) -> dict:
        endpoint = f'/{account_address}/nft/transfers'
        return self.__get(endpoint)

    def get_nft_contract_metadata(self, contract_address: str) -> dict:
        endpoint = f'/nft/{contract_address}/metadata'
        return self.__get(endpoint)
