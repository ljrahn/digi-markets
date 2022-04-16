"""
Schemas used for creating nice api responses for network resources. Check out resources modules 
to see how they are used.
"""

from .. import ma
from ..models.web3 import BlockchainNetwork
from marshmallow import Schema, fields, ValidationError, pre_dump, post_dump


class BlockchainNetworkSchema(ma.SQLAlchemySchema):
    class Meta:
        model = BlockchainNetwork

    name = ma.auto_field()
    short_name = ma.auto_field()
    chain_id = ma.auto_field()
    network_id = ma.auto_field()
    supported = ma.auto_field()
    block_explorer = ma.auto_field()
    currency = ma.auto_field()


class BlockchainNetworkListSchema(Schema):
    class Meta:
        strict = True
        ordered = True

    total = fields.Integer()
    page = fields.Integer()
    page_size = fields.Integer()
    result = fields.Nested(BlockchainNetworkSchema, many=True)

    @post_dump
    def calc_num_pages(self, data, **kwargs):
        data['num_pages'] = int((
            data['total'] + data['page_size'] - 1) / data['page_size'])
        return data

    @post_dump
    def calc_num_results(self, data, **kwargs):
        data['num_results'] = len(data['result'])
        return data


blockchain_network_schema = BlockchainNetworkSchema()
blockchain_network_list_schema = BlockchainNetworkListSchema()
