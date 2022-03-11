# Generated by Django 4.0.3 on 2022-03-08 06:02

from django.db import migrations, models
import country.utils


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_userprofile_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='country',
            field=models.CharField(max_length=3, null=True, validators=[country.utils.is_valid_country]),
        ),
    ]