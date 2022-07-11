from dataclasses import field

from tortoise import fields 
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model 

from passlib.hash import bcrypt


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(128)
    hashed_password = fields.CharField(128)
    board_data = fields.JSONField(default='{"tasks": {}, "columns": {}, "columnOrder": []}')

    def verify_password(self, password):
        return bcrypt.verify(password, self.hashed_password)



UserPydantic = pydantic_model_creator(User, name='User')
UserInPydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True, exclude=('board_data',))


__all__ = ['UserInPydantic', 'UserPydantic', 'User']