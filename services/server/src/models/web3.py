from .. import db
from . import BaseModel
from sqlalchemy import Column, Date, ForeignKey, Integer, JSON, String, Float, Boolean, BigInteger
from sqlalchemy.orm import relationship, backref


class BlockchainNetwork(BaseModel):
    __tablename__ = 'blockchain_network'

    name = Column(String(1000), nullable=False, unique=True)
    short_name = Column(String(1000), nullable=False, unique=True)
    chain_id = Column(Integer, nullable=False, unique=True)
    network_id = Column(Integer, nullable=False, unique=True)
    supported = Column(Boolean, default=False)
    currency = Column(String(30), nullable=False)
    block_explorer = Column(String(500))

    def __str__(self):
        return self.name


class NFTContract(BaseModel):
    __tablename__ = 'collection'

    name = Column(String(3000))
    symbol = Column(String(1000))
    contract_address = Column(String(50), nullable=False)
    contract_type = Column(String(50), nullable=False)
    image = Column(String(1000))
    verified = Column(Boolean, default=False)
    search_count = Column(BigInteger, default=1)
    network_id = Column(Integer, ForeignKey('blockchain_network.id'))
    network = relationship('BlockchainNetwork', backref='nft_contract')

    def __str__(self):
        return self.contract_address
