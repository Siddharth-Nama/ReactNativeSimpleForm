# Generated by Django 4.2.13 on 2024-07-09 08:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0002_form_age'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='form',
            name='dob',
        ),
    ]
