# Generated by Django 4.0.3 on 2022-03-12 22:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='event',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='event.event'),
        ),
    ]