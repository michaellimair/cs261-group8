# Generated by Django 4.0.2 on 2022-02-04 08:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='business_area',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='business_area.businessarea'),
        ),
    ]