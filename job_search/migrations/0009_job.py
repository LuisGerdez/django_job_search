# Generated by Django 3.1.4 on 2021-03-20 20:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('job_search', '0008_auto_20210320_0308'),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('description', models.TextField(blank=True, default='')),
                ('country', models.CharField(max_length=30)),
                ('state', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('requirements', models.TextField(blank=True, default='')),
                ('salary', models.CharField(max_length=35)),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
