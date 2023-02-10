from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentsViewSet, UserProfileViewSet

router = routers.SimpleRouter()
router.register(r'', ComplaintViewSet, base_name='complaint')
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet,
                base_name='topComplaints')
router.register(r'constituents', ConstituentsViewSet, base_name='constituents')
router.register(r'user', UserProfileViewSet, base_name='user')
urlpatterns = [
    path(
        'user/', UserProfileViewSet.as_view({'get': 'list'}), name='userProfile'),
    path('openCases/',
         OpenCasesViewSet.as_view({'get': 'list'}), name='openCases'),
    path('closedCases/',
         ClosedCasesViewSet.as_view({'get': 'list'}), name='closedCases'),
    path('topComplaints/',
         TopComplaintTypeViewSet.as_view({'get': 'list'}), name='topComplaints'),
    path('constituents/',
         ConstituentsViewSet.as_view({'get': 'list'}), name='constituents'),

]
urlpatterns += router.urls
