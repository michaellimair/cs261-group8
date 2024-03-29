# Generated by Django 4.0.3 on 2022-03-13 17:37

import django.contrib.postgres.fields
from django.db import migrations, models
import skill.utils


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_alter_userprofile_languages_alter_userprofile_skills'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='interests',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=512, validators=[skill.utils.validate_skill]), default=[], size=None),
        ),
    ]
