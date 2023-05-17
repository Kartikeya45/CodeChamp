from django.contrib import admin
from .models import *

admin.site.register(UserProfile)
admin.site.register(Problem)
class SubmissionAdmin(admin.ModelAdmin):
    fields = ('code', 'status', 'submitted_at', 'problem', 'user')
    readonly_fields = ('submitted_at',)

admin.site.register(Submission, SubmissionAdmin)

