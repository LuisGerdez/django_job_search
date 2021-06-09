from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
	USER_TYPE_CHOICES = ((1, 'Employer'),(2, 'Employee'))
	user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=2)

class EmployerUser(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
	company_name = models.CharField(max_length=80)
	company_description = models.TextField(default="", blank=True)

	def __str__(self):
		return f"{self.user}'s employer data"

class EmployeeUser(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
	phone = models.CharField(max_length=20)
	gender = models.PositiveSmallIntegerField(choices=((1, 'Male'),(2, 'Female')), default=1)
	birthday = models.DateTimeField(blank=True, null=True)
	country = models.CharField(max_length=45)
	state = models.CharField(max_length=45)
	city = models.CharField(max_length=45)

	description = models.TextField(default="", blank=True)
	experience = models.TextField(default="", blank=True)
	education = models.TextField(default="", blank=True)
	courses = models.TextField(default="", blank=True)
	languages = models.TextField(default="", blank=True)

	def __str__(self):
		return f"{self.user}'s employee data"

class Job(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
	title = models.CharField(max_length=80)
	description = models.TextField(default="", blank=True)
	country = models.CharField(max_length=45)
	state = models.CharField(max_length=45)
	city = models.CharField(max_length=45)
	requirements = models.TextField(default="", blank=True)
	salary = models.CharField(max_length=35)
	applicants = models.ManyToManyField(User, blank=True, related_name="job_applicants")

	def __str__(self):
		return f"{self.id} - {self.title}"

	def serialize(self):
		return {
			"id": self.id,
			"user": self.user.username,
			"title": self.title,
			"description": self.description
		}
