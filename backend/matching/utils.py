from typing import List
from users.models import UserProfile
import numpy as np
import pandas as pd
from skill.utils import get_skills
from language.utils import ALL_LANGS

def map_title(title: UserProfile.Title):
    if title == UserProfile.Title.MANAGING_DIRECTOR: return 6
    elif title == UserProfile.Title.DIRECTOR: return 5
    elif title == UserProfile.Title.VICE_PRESIDENT: return 4
    elif title == UserProfile.Title.ASSISTANT_VICE_PRESIDENT: return 3
    elif title == UserProfile.Title.ASSOCIATE: return 2
    else: return 1

def match_score_it(skills: List[str], languages: List[str], mentors: pd.DataFrame, w1 = 1, w2 = 1) -> pd.DataFrame:
    skill_set = set(skills)
    skill_binary = [1 if x in skill_set else 0 for x in get_skills()]
    language_set = set(languages)
    language_binary = [1 if x in language_set else 0 for x in ALL_LANGS]

    def count_ops(me_i):
        return np.count_nonzero(me_i)
    
    me_n1 = count_ops(skill_binary)
    me_n2 = count_ops(language_binary)

    # Error prevention when mentee or mentor selects no skills, assign a min value of 1
    if me_n1 == 0:
        me_n1 +=1
    if me_n2 == 0:
        me_n2 +=1
   
    for (index, mentor) in mentors.iterrows():
        mentor_skill_set = mentor['profile__skills']
        mentor_language_set = mentor['profile__languages']
        mr1 = np.array([1 if x in mentor_skill_set else 0 for x in get_skills()])
        mr2 = np.array([1 if x in mentor_language_set else 0 for x in ALL_LANGS])
        
        s1 = ((np.dot(np.array(skill_binary).ravel(), mr1.ravel())/(me_n1)))  
        s2 = ((np.dot(np.array(language_binary).ravel(), mr2.ravel())/(me_n2))) 
                
        mentors.loc[index, 'score'] = (s1*w1 + s2*w2)

    mentors['score'] = ((mentors['score'] - mentors['score'].min())/(mentors['score'].max() - mentors['score'].min()))

    return mentors
