# -*- coding:utf-8 -*-
from rest_framework import serializers
from todolist.models import Todo

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Todo
        fields = ('id', 'text', 'priority', 'expiredate', 'completed')