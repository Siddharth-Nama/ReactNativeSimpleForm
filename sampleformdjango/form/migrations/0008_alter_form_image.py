# Generated by Django 4.2.13 on 2024-07-24 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0007_rename_phone_form_phoneno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='image',
            field=models.ImageField(null=True, upload_to='profile'),
        ),
    ]
