# Generated by Django 3.1.4 on 2021-03-20 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_search', '0005_auto_20210319_0201'),
    ]

    operations = [
        migrations.AddField(
            model_name='employeeuser',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='employeeuser',
            name='gender',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Male'), (2, 'Female')], default=1),
        ),
        migrations.AlterField(
            model_name='employeruser',
            name='company_description',
            field=models.TextField(default=''),
        ),
    ]