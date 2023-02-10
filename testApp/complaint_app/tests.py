from rest_framework.test import APITestCase, APIClient
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import Complaint, UserProfile
from rest_framework.authtoken.models import Token
from .serializers import ComplaintSerializer, UserProfileSerializer, UserSerializer
from django.db.models import Count

# Create your tests here.

class ComplaintViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.complaint1 = Complaint.objects.create(
            unique_key='101', account='NYCC01', complaint_type='Noise', descriptor='Loud Music/Party')
        self.complaint2 = Complaint.objects.create(
            unique_key='102', account='NYCC02', complaint_type='Heating', descriptor='Lack of Heat')
        self.complaint3 = Complaint.objects.create(
            unique_key='103', account='NYCC01', complaint_type='Water', descriptor='Water Quality')
        self.user_profile = UserProfile.objects.create(
            user=self.user, full_name='Test User', district='01')

    def test_list_complaints(self):
        url = reverse('complaint-list')
        response = self.client.get(url, format='json')
        complaints = Complaint.objects.filter(account='NYCC01')
        serializer = ComplaintSerializer(complaints, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_open_cases(self):
        url = reverse('openCases')
        response = self.client.get(url, format='json')
        complaints = Complaint.objects.filter(account='NYCC01', closedate__isnull=True)
        serializer = ComplaintSerializer(complaints, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_closed_cases(self):
        url = reverse('closedCases')
        response = self.client.get(url, format='json')
        complaints = Complaint.objects.filter(account='NYCC01', closedate__isnull=False)
        serializer = ComplaintSerializer(complaints, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_top_complaint_types(self):
        url = reverse('topComplaints')
        response = self.client.get(url, format='json')
        complaints = Complaint.objects.filter(account='NYCC01')
        complaint_types = complaints.values('complaint_type').annotate(
            count=Count('complaint_type')).order_by('-count')[:3]
        top_types = [item['complaint_type'] for item in complaint_types]
        complaints = complaints.filter(complaint_type__in=top_types)
        serializer = ComplaintSerializer(complaints, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_constituents(self):
        url = reverse('constituents')
        response = self.client.get(url, format='json')
        complaints = Complaint.objects.filter(council_dist='NYCC01')
        serializer = ComplaintSerializer(complaints, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


# class UserProfileViewSetTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(
#             username='testuser', password='testpass')
#         self.token = Token.objects.create(user=self.user)
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

#     def test_get_user_profile(self):
#         url = reverse('userProfile')
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         user_profile = UserProfile.objects.get(user=self.user)
#         serializer = UserProfileSerializer(user_profile)
#         self.assertEqual(response.data, serializer.data)

class UserProfileViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.user_profile = UserProfile.objects.create(user=self.user, full_name='Test User', district='01')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_user_profile(self):
        url = '/api/complaints/user/'
        response = self.client.get(url)
        if response.status_code == status.HTTP_200_OK:
            expected_response = {
            # 'user': UserSerializer(self.user).data,
            'userprofile': UserProfileSerializer(self.user_profile).data
            }
            self.assertEqual(response.data, expected_response)
        else:
            self.fail("Response status code was not 200 OK")
   