# Derived from
# https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import random
import pytz
from tqdm import tqdm
import pycountry
import numpy as np
from typing import List
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
# pylint: disable=imported-auth-user
from django.contrib.auth.models import Group, User
from matching.models import MentoringPair
from rating.models import MentorRating, MentorRatingEntry
from language.utils import LANGS_WITH_CODE
from users.models import UserProfile
from users.permission_constants import MENTOR_GROUP, MENTEE_GROUP
from business_area.models import BusinessArea
from skill.utils import get_skills
from django.contrib.auth.hashers import make_password

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
user_skill_options = [
    "Python",
    "Adobe Photoshop",
    "Haskell",
    "Java",
    "JavaScript",
    "Angular",
    "React",
    "AngularJS",
    "Swift (Programming Language)",
    "C",
    "C++",
    "VBA",
    "Flutter",
    "Kotlin",
    "DJ"
] + get_skills()[0:100]
avail_timezones = pytz.all_timezones[0:10]
avail_countries = [x.alpha_2 for x in list(pycountry.countries)[0:10]]
avail_pronouns = [
    "she/her",
    "he/him",
    "they/them",
    "ze/zie/hir",
    "ve/ver"]
num_users = 300

class Command(BaseCommand):
    """
    Django command to create default mentor and mentee groups.
    """
    help = 'Creates users in the test database.'

    def handle(self, *args, **options):
        user_model: User = get_user_model()

        print("Deleting existing users...")
        # Clearing existing users
        for i in tqdm(range(num_users)):
            username = f"user{i + 1}"

            user_model.objects.filter(username=username).delete()

        business_areas = BusinessArea.objects.all()
        mentor_group = Group.objects.filter(name=MENTOR_GROUP).first()
        mentee_group = Group.objects.filter(name=MENTEE_GROUP).first()

        print("Creating new user objects...")
        all_users = []
        for i in tqdm(range(num_users)):
            username = f"user{i + 1}"

            user_model.objects.filter(username=username).delete()

            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=username,
                email=fake.email(),
                is_superuser=False,
                password=make_password("test12345", None, 'md5')
            )
            all_users.append(user)

        print("Creating new users...")
        created_users: List[User] = User.objects.bulk_create(all_users)
        all_profiles = []
        all_ratings = []

        # Adding user to groups
        for i in range(num_users):
            user = created_users[i]
            # Create more mentors than mentees
            user_group = np.random.choice([mentor_group, mentee_group], p=[4/7, 3/7])
            user.groups.add(user_group)

            # Append entry for creating rating
            if user_group.name == MENTOR_GROUP:
                all_ratings.append(MentorRating(mentor=user, rating=None, rating_count=0))

        print("Initializing mentor ratings...")
        MentorRating.objects.bulk_create(all_ratings)

        # Attach a user profile to the users
        for user in tqdm(created_users):
            all_profiles.append(UserProfile(
                user=user,
                country=np.random.choice(avail_countries),
                timezone=np.random.choice(avail_timezones),
                skills=random.sample(user_skill_options, 5),
                interests=random.sample(user_skill_options, 5),
                years_experience=np.random.randint(1, 20),
                title=np.random.choice(avail_titles),
                languages=random.sample(avail_languages, 5),
                business_area=np.random.choice(business_areas),
                pronoun=np.random.choice(avail_pronouns)
            ))

        print("Creating user profiles...")
        UserProfile.objects.bulk_create(all_profiles)
        
        all_mentees = list(filter(lambda u : u.groups.filter(name=MENTEE_GROUP).exists(), created_users))
        all_mentors = list(filter(lambda u : u.groups.filter(name=MENTOR_GROUP).exists(), created_users))

        print(f"Total number of mentees: {len(all_mentees)}")
        print(f"Total number of mentors: {len(all_mentors)}")

        mentoring_pairs: List[MentoringPair] = []

        for mentee, mentor in tqdm(zip(all_mentees, all_mentors)):
            mentoring_pairs.append(MentoringPair(mentor=mentor, mentee=mentee, status=MentoringPair.PairStatus.ACCEPTED))
        
        print("Pairing mentors with mentees...")
        created_mentoring_pairs = MentoringPair.objects.bulk_create(mentoring_pairs)

        print("Adding rating to mentors...")
        for mentoring_pair in tqdm(created_mentoring_pairs):
            mentee = mentoring_pair.mentee
            mentor_rating = MentorRating.objects.filter(mentor=mentoring_pair.mentor).first()
            rating_value = np.random.randint(3, 5)
            description = fake.sentence()
            rating_entry = MentorRatingEntry(
                mentor_rating=mentor_rating,
                mentee=mentee,
                rating_value=rating_value,
                description=description)
            rating_entry.save()

        print("Created default users.")
