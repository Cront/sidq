"""Updated user model to have just name, email, pw as required

Revision ID: 7592cf734bb2
Revises: b50a87b30380
Create Date: 2025-06-19 05:02:08.125269

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7592cf734bb2'
down_revision = 'b50a87b30380'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('preferred_currency',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)
        batch_op.alter_column('timezone',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('timezone',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('preferred_currency',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)

    # ### end Alembic commands ###
