"""Changed from db.String to db.Text

Revision ID: 83327fb917de
Revises: 40f1268a4993
Create Date: 2025-05-04 14:42:04.355181

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83327fb917de'
down_revision = '40f1268a4993'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('organization', schema=None) as batch_op:
        batch_op.alter_column('org_description',
               existing_type=sa.VARCHAR(length=800),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('organization', schema=None) as batch_op:
        batch_op.alter_column('org_description',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=800),
               existing_nullable=True)

    # ### end Alembic commands ###
