# Derived from
# https://stackoverflow.com/questions/22250352/programmatically-create-a-django-group-with-permissions
import random
import os
from tqdm import tqdm
import pycountry
import requests
import tempfile
import numpy as np
from typing import List
from faker import Faker
from urllib.parse import urlparse
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
# pylint: disable=imported-auth-user
from django.contrib.auth.models import Group, User
from django.contrib.auth.hashers import make_password
from django.core.files import File
from group_session.models import GroupSessionRequest, GroupSessionRequestedSkill
from matching.models import MentoringPair
from rating.models import MentorRating, MentorRatingEntry
from language.utils import LANGS_WITH_CODE
from users.models import UserProfile
from users.permission_constants import MENTOR_GROUP, MENTEE_GROUP
from business_area.models import BusinessArea
from skill.utils import get_skills
from numpy.random import MT19937
from numpy.random import RandomState, SeedSequence

fake = Faker()

random.seed(0)
Faker.seed(0)
rs = RandomState(MT19937(SeedSequence(123456789)))

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
avail_timezones = sorted(["Europe/Berlin", "Asia/Hong_Kong", "Europe/London", "Asia/Jakarta"])
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
        user_response = requests.get(f"https://randomuser.me/api/?results={num_users}")
        random_users = user_response.json()['results']

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
            user_group = np.random.choice([mentor_group, mentee_group], p=[1/5, 4/5])
            user.groups.add(user_group)

            # Append entry for creating rating
            if user_group.name == MENTOR_GROUP:
                all_ratings.append(MentorRating(mentor=user, rating=None, rating_count=0))

        print("Initializing mentor ratings...")
        MentorRating.objects.bulk_create(all_ratings)

        file_ref = []

        print("Creating user profiles...")
        # Attach a user profile to the users
        for index in tqdm(range(num_users)):
            user = created_users[index]
            image_url = random_users[index]['picture']['large']
            response = requests.get(image_url)
            file_name = os.path.basename(urlparse(image_url).path)
            image = tempfile.TemporaryFile()
            image.write(response.content)
            file_ref.append(image)
            all_profiles.append(UserProfile(
                user=user,
                avatar=File(image, name=file_name),
                country=np.random.choice(avail_countries),
                timezone=np.random.choice(avail_timezones),
                skills=random.sample(user_skill_options, 5),
                interests=random.sample(user_skill_options, 5),
                years_experience=np.random.randint(1, 20),
                title=np.random.choice(avail_titles),
                languages=random.sample(avail_languages, k=5),
                business_area=np.random.choice(business_areas),
                pronoun=np.random.choice(avail_pronouns),
                completed=True
            ))

        UserProfile.objects.bulk_create(all_profiles)
        
        for file in file_ref:
            file.close()

        all_mentees = list(filter(lambda u : u.groups.filter(name=MENTEE_GROUP).exists(), created_users))
        all_mentors = list(filter(lambda u : u.groups.filter(name=MENTOR_GROUP).exists(), created_users))

        print(f"Total number of mentees: {len(all_mentees)}")
        print(f"Total number of mentors: {len(all_mentors)}")

        mentoring_pairs: List[MentoringPair] = []

        for (index, mentee) in tqdm(enumerate(all_mentees)):
            mentor_idx = index % len(all_mentors)
            mentor = all_mentors[mentor_idx]
            mentoring_pairs.append(
                MentoringPair(
                    mentor=mentor,
                    mentee=mentee,
                    status=MentoringPair.PairStatus.ACCEPTED)
            )

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
        
        session_requests = []
        print("Adding dummy data for requests to create a group session...")
        for mentee in tqdm(all_mentees):
            session_requests.append(
                GroupSessionRequest(
                    user=mentee,
                )
            )

        session_requests = GroupSessionRequest.objects.bulk_create(session_requests)

        requested_skills_objs = []

        for request in session_requests:
            requested_skills = np.random.choice(user_skill_options, 2)
            for skill in requested_skills:
                requested_skills_objs.append(
                    GroupSessionRequestedSkill(
                        skill=skill,
                        request=request
                    )
                )

        GroupSessionRequestedSkill.objects.bulk_create(requested_skills_objs)

        print("Created default users.")
