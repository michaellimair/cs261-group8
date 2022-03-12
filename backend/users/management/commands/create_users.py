# Derived from
# https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import random
import pytz
import pycountry
import numpy as np
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
# pylint: disable=imported-auth-user
from django.contrib.auth.models import Group, User
from language.utils import LANGS_WITH_CODE
from users.models import UserProfile
from users.permission_constants import MENTOR_GROUP, MENTEE_GROUP
from business_area.models import BusinessArea
from skill.utils import get_skills

fake = Faker()

random.seed(0)
Faker.seed(0)

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
avail_timezones = pytz.all_timezones[0:10]
avail_countries = [x.alpha_2 for x in list(pycountry.countries)[0:10]]
avail_pronouns = [
    "she/her",
    "he/him",
    "they/them",
    "ze/zie/hir",
    "ve/ver"]
num_users = 1000

class Command(BaseCommand):
    """
    Django command to create default mentor and mentee groups.
    """
    help = 'Creates users in the test database.'

    def handle(self, *args, **options):
        business_areas = BusinessArea.objects.all()
        mentor_group = Group.objects.filter(name=MENTOR_GROUP).first()
        mentee_group = Group.objects.filter(name=MENTEE_GROUP).first()

        user_model: User = get_user_model()

        for i in range(num_users):
            print(f"Creating user {i + 1}/{num_users}")
            username = f"user{i + 1}"

            user_model.objects.filter(username=username).delete()

            user: User = user_model.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=username,
                email=fake.email(),
                is_superuser=False,
            )
            user.set_password("test12345")
            user.groups.add(np.random.choice([mentor_group, mentee_group]))
            user.save()

            UserProfile.objects.create(
                user=user,
                country=np.random.choice(avail_countries),
                timezone=np.random.choice(avail_timezones),
                skills=random.sample(user_skill_options, 5),
                years_experience=np.random.randint(1, 20),
                title=np.random.choice(avail_titles),
                languages=random.sample(avail_languages, 5),
                business_area=np.random.choice(business_areas),
                pronoun=np.random.choice(avail_pronouns)
            )

        print("Created default users.")
