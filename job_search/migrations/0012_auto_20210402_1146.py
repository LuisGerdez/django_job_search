# Generated by Django 3.1.4 on 2021-04-02 11:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('job_search', '0011_job_applicants'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='job',
            options={'get_latest_by': 'id'},
        ),
    ]
