from django.contrib import admin
from .models import User, EmployerUser, EmployeeUser, Job

# Register your models here.
admin.site.register(User)
admin.site.register(EmployerUser)
admin.site.register(EmployeeUser)
admin.site.register(Job)