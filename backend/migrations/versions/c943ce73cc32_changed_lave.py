"""changed lave

Revision ID: c943ce73cc32
Revises: 6280a266df64
Create Date: 2024-01-21 03:40:27.742840

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c943ce73cc32'
down_revision = '6280a266df64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leavetype', schema=None) as batch_op:
        batch_op.drop_column('leave_description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leavetype', schema=None) as batch_op:
        batch_op.add_column(sa.Column('leave_description', sa.VARCHAR(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###