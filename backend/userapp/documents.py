from django_elasticsearch_dsl import DocType, Index
from userapp.models import SpaUser

custom_user = Index('custom_users')


@custom_user.doc_type
class SpaUserDocument(DocType):

    class Meta:
        model = SpaUser

        fields = ['email', 'id']