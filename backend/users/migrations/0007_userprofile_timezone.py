# Generated by Django 4.0.3 on 2022-03-08 06:29

from django.db import migrations, models
import timezone.utils


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_userprofile_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='timezone',
            field=models.CharField(max_length=256, null=True, validators=[timezone.utils.is_valid_timezone]),
        ),
    ]
