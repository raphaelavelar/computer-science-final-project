# Generated by Django 5.1 on 2024-08-28 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="applicationuser",
            name="profile_picture",
            field=models.FileField(blank=True, null=True, upload_to=""),
        ),
    ]
