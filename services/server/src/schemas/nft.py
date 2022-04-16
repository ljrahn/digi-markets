"""
Schemas used for creating nice api responses for nft resources. Check out resources modules 
to see how they are used.
"""

from marshmallow import Schema, fields, ValidationError, pre_dump, post_dump
from .. import ma
from .network import BlockchainNetworkSchema
from ..models.web3 import NFTContract


def must_be_hex(data):
    if data[:2] != '0x':
        raise ValidationError("String is not an address.")
    try:
        int(data, 16)
    except ValueError:
        raise ValidationError("String is not an address.")


class NFTTokenSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    contract_address = fields.Str(
        attribute='token_address', validate=must_be_hex)
    name = fields.Str()
    symbol = fields.Str()
    owner_of = fields.Str(validate=must_be_hex)
    contract_type = fields.Str()
    token_uri = fields.Url()
    token_id = fields.Str()
    metadata = fields.Str()


class NFTTokenListSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    total = fields.Integer()
    page = fields.Integer()
    page_size = fields.Integer()
    result = fields.Nested(NFTTokenSchema, many=True)

    @pre_dump
    def page_plus_one(self, data, **kwargs):
        data['page'] = data['page'] + 1
        return data

    @post_dump
    def calc_num_pages(self, data, **kwargs):
        data['num_pages'] = int((
            data['total'] + data['page_size'] - 1) / data['page_size'])
        return data

    @post_dump
    def calc_num_results(self, data, **kwargs):
        data['num_results'] = len(data['result'])
        return data


class NFTTokenTransferSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    block_number = fields.Integer()
    block_timestamp = fields.Str()
    transaction_hash = fields.Str(validate=must_be_hex)
    from_address = fields.Str(validate=must_be_hex)
    to_address = fields.Str(validate=must_be_hex)
    contract_type = fields.Str()
    value = fields.Integer()
    contract_address = fields.Str(
        attribute='token_address', validate=must_be_hex)
    token_id = fields.Str()


class NFTTokenTransferListSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    total = fields.Integer()
    page = fields.Integer()
    page_size = fields.Integer()
    result = fields.Nested(NFTTokenTransferSchema, many=True)

    @pre_dump
    def page_plus_one(self, data, **kwargs):
        data['page'] = data['page'] + 1
        return data

    @post_dump
    def calc_num_pages(self, data, **kwargs):
        data['num_pages'] = int((
            data['total'] + data['page_size'] - 1) / data['page_size'])
        return data

    @post_dump
    def calc_num_results(self, data, **kwargs):
        data['num_results'] = len(data['result'])
        return data


class NFTContractSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    name = fields.Str()
    symbol = fields.Str()
    contract_address = fields.Str(validate=must_be_hex)
    image = fields.Url()
    verified = fields.Boolean()


class NFTContractListSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    total = fields.Integer()
    page = fields.Integer()
    page_size = fields.Integer()
    result = fields.Nested(NFTContractSchema, many=True)

    @pre_dump
    def page_plus_one(self, data, **kwargs):
        data['page'] = data['page'] + 1
        return data

    @post_dump
    def calc_num_pages(self, data, **kwargs):
        data['num_pages'] = int((
            data['total'] + data['page_size'] - 1) / data['page_size'])
        return data

    @post_dump
    def calc_num_results(self, data, **kwargs):
        data['num_results'] = len(data['result'])
        return data


class NFTContractDBSchema(ma.SQLAlchemySchema):
    class Meta:
        strict = True
        ordered = True
        model = NFTContract

    name = ma.auto_field()
    symbol = ma.auto_field()
    contract_address = ma.auto_field()
    contract_type = ma.auto_field()
    image = ma.auto_field()
    verified = ma.auto_field()
    search_count = ma.auto_field()
    network = fields.Nested(
        BlockchainNetworkSchema(only=("short_name", "name", "chain_id")))


class NFTContractDBListSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    total = fields.Integer()
    page = fields.Integer()
    page_size = fields.Integer()
    result = fields.Nested(NFTContractDBSchema, many=True)

    @post_dump
    def calc_num_pages(self, data, **kwargs):
        data['num_pages'] = int((
            data['total'] + data['page_size'] - 1) / data['page_size'])
        return data

    @post_dump
    def calc_num_results(self, data, **kwargs):
        data['num_results'] = len(data['result'])
        return data


nft_token_schema = NFTTokenSchema()
nft_token_list_schema = NFTTokenListSchema()
nft_token_transfer_list_schema = NFTTokenTransferListSchema()
nft_contract_schema = NFTContractSchema()
nft_contract_list_schema = NFTContractListSchema()
nft_contract_db_schema = NFTContractDBSchema()
nft_contract_db_list_schema = NFTContractDBListSchema()
