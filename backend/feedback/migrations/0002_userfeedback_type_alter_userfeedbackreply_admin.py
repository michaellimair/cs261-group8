# Generated by Django 4.0.2 on 2022-02-12 01:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('feedback', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userfeedback',
            name='type',
            field=models.CharField(choices=[('bug', 'bug_fixes'), ('improvement', 'improvements'), ('question', 'question')], default='bug', max_length=20),
        ),
        migrations.AlterField(
            model_name='userfeedbackreply',
            name='admin',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
