"""empty message

Revision ID: 1388f3a3adcc
Revises: 
Create Date: 2022-04-08 16:56:44.292311

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1388f3a3adcc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blockchain_network', sa.Column('block_explorer', sa.String(length=500), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('blockchain_network', 'block_explorer')
    # ### end Alembic commands ###