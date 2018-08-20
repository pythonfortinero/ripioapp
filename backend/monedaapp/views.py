from django.shortcuts import render
from rest_framework import status
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from monedaapp.models import Exchange
from monedaapp.serializers import MoneyTransferSerializer


@login_required(login_url='/accounts/login/')
def index(request):
    return render(request, 'moneda/index.html')


@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def exchange_list(request, user_id):
    if request.method == 'GET':
        exchange = Exchange.objects.filter(rows__user__id=user_id)
        serializer = MoneyTransferSerializer(exchange, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MoneyTransferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
