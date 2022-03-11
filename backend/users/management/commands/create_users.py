# Derived from
# https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import random
import numpy as np
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User
import pytz
from language.utils import LANGS_WITH_CODE
from users.models import UserProfile
from users.permission_constants import MENTOR_GROUP, MENTEE_GROUP
from business_area.models import BusinessArea
from skill.utils import get_skills
from faker import Faker
import pycountry

fake = Faker()

random.seed(0)
Faker.seed(0)


class Command(BaseCommand):
    """
    Django command to create default mentor and mentee groups.
    """
    help = 'Creates users in the test database.'

    def handle(self, *args, **options):
        NUM_USERS = 1000
        business_areas = BusinessArea.objects.all()
        avail_languages = [x.alpha_2 for x in list(LANGS_WITH_CODE)]
        avail_titles = [
            UserProfile.Title.ANALYST,
            UserProfile.Title.ASSOCIATE,
            UserProfile.Title.DIRECTOR,
            UserProfile.Title.ASSISTANT_VICE_PRESIDENT,
            UserProfile.Title.DIRECTOR,
            UserProfile.Title.MANAGING_DIRECTOR
        ]
        user_skill_options = get_skills()[0:10]
        avail_pronouns = ["she/her", "he/him", "they/them", "ze/zie/hir", "ve/ver"]
        avail_timezones = pytz.all_timezones[0:10]
        avail_countries = [x.alpha_2 for x in list(pycountry.countries)[0:10]]
        mentor_group = Group.objects.filter(name=MENTOR_GROUP).first()
        mentee_group = Group.objects.filter(name=MENTEE_GROUP).first()

        user_model: User = get_user_model()

        for i in range(NUM_USERS):
            print("Creating user %d/%d" % (i+1, NUM_USERS))
            business_area = np.random.choice(business_areas)
            languages = random.sample(avail_languages, 5)
            title = np.random.choice(avail_titles)
            years_experience = np.random.randint(1, 20)
            skills = random.sample(user_skill_options, 5)
            pronoun = np.random.choice(avail_pronouns)
            timezone = np.random.choice(avail_timezones)
            country = np.random.choice(avail_countries)
            first_name = fake.first_name()
            last_name = fake.last_name()
            password = "test12345"
            username = "user%d" % (i+1)
            email = fake.email()

            user_model.objects.filter(username=username).delete()
            
            user: User = user_model.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                is_superuser=False,
            )
            user.set_password(password)
            user.groups.add(np.random.choice([mentor_group, mentee_group]))
            user.save()

            UserProfile.objects.create(
                user=user,
                country=country,
                timezone=timezone,
                skills=skills,
                years_experience=years_experience,
                title=title,
                languages=languages,
                business_area=business_area,
                pronoun=pronoun
            )

        print("Created default users.")
