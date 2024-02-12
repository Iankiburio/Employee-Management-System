"""annual default value

Revision ID: b818241ef8cb
Revises: e0eef111bb1c
Create Date: 2024-02-12 17:10:33.286787

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b818241ef8cb'
down_revision = 'e0eef111bb1c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee_balances', schema=None) as batch_op:
        batch_op.alter_column('annual_leave_entitled',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee_balances', schema=None) as batch_op:
        batch_op.alter_column('annual_leave_entitled',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
