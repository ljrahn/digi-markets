"""
Schemas for validating query params
"""

from marshmallow import Schema, fields, ValidationError


def allowed_filters(data):
    ALLOWED_FILTERS = ['name', 'symbol']
    filters = data.split(',')

    for filter in filters:
        if filter not in ALLOWED_FILTERS:
            raise ValidationError(
                f'Filter not allowed. Allowed values: {",".join(ALLOWED_FILTERS)}')


class NetworkQueryParamsSchema(Schema):
    class Meta:
        strict = True

    page = fields.Integer()
    page_size = fields.Integer()


class NFTQueryParamsSchema(Schema):
    class Meta:
        strict = True

    chain = fields.Str()
    page = fields.Integer()
    page_size = fields.Integer()


class NFTSearchQueryParamsSchema(Schema):
    class Meta:
        strict = True

    q = fields.Str(required=True)
    filter = fields.Str(required=True, validate=allowed_filters)
    verified = fields.Bool()
    chain = fields.Str()
    page = fields.Integer()
    page_size = fields.Integer()


network_query_params_schema = NetworkQueryParamsSchema()
nft_query_params_schema = NFTQueryParamsSchema()
nft_search_query_params_schema = NFTSearchQueryParamsSchema()
