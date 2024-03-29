# Generated by Django 4.0.2 on 2022-02-02 00:51

import annoying.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pronoun', models.CharField(max_length=50, null=True)),
                ('completed', models.BooleanField(default=False)),
                ('title', models.CharField(choices=[('ANLST', 'title.anlst'), ('ASSOC', 'title.assoc'), ('AVP', 'title.avp'), ('VP', 'title.vp'), ('DIR', 'title.dir'), ('MD', 'title.md')], max_length=5, null=True)),
                ('business_area', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='business_area.businessarea')),
                ('user', annoying.fields.AutoOneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
