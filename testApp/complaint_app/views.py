from rest_framework import viewsets
from .models import UserProfile, Complaint
from django.db.models import Count
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = ComplaintSerializer

    def get_queryset(self):
        user_profile = self.request.user.userprofile
        if len(user_profile.district) < 2:
            self.district = str(user_profile.district).zfill(2)
        else:
            self.district = user_profile.district
        return Complaint.objects.filter(account='NYCC' + self.district)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class OpenCasesViewSet(ComplaintViewSet):
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(closedate__isnull=True)


class ClosedCasesViewSet(ComplaintViewSet):
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(closedate__isnull=False)


class TopComplaintTypeViewSet(ComplaintViewSet):
    def get_queryset(self):
        queryset = super().get_queryset()
        complaint_types = queryset.values('complaint_type').annotate(
            count=Count('complaint_type')).order_by('-count')[:3]
        top_types = [item['complaint_type'] for item in complaint_types]
        return queryset.filter(complaint_type__in=top_types)


class ConstituentsViewSet(ComplaintViewSet):
    def get_queryset(self):
        queryset = super().get_queryset()
        district = 'NYCC' + self.district
        print(district)
        return queryset.filter(council_dist=district)


class UserProfileViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def list(self, request):
        user = request.user
        user_profile = user.userprofile
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
