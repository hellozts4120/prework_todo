from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

class TodoList(APIView):
    def get(self, request, format=None):
        tasks = Todo.objects.all()
        serializer = TodoSerializer(tasks, many=True)
        return Response(serializer.data)

class AddTodo(APIView):
    def post(self, request, format=None):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateTodo(APIView):
    def post(self, request, format=None):
        try:
            todo = Todo.objects.get(id=request.data['id'])
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            todo.text = data['text']
            todo.priority = data['priority']
            todo.completed = data['completed']
            todo.expiredate = data['expiredate']
            todo.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)

class DeleteTodo(APIView):
    def post(self, request, format=None):
        print request.data
        try:
            todo = Todo.objects.get(id=request.data['id'])
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)