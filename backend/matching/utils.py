from typing import List
import numpy as np
import pandas as pd
from skill.utils import get_skills
from language.utils import ALL_LANGS

def count_ops(mentor_info: List[int]):
    """Count the number of occurences of non zeros in a list of numbers"""
    return np.count_nonzero(mentor_info)

def _skill_to_binary(skill_set: set[str]):
    """Convert skills to numpy array"""
    return np.array([1 if x in skill_set else 0 for x in get_skills()])

def _language_to_binary(language_set: set[str]):
    """Convert skills to numpy array"""
    return np.array([1 if x in language_set else 0 for x in ALL_LANGS])

def match_score_it(
        skills: List[str],
        languages: List[str],
        mentors: pd.DataFrame,
        skill_weight=1,
        language_weight=1) -> pd.DataFrame:
    """Gets the match score between a mentee and the set of mentors after filtering.

    Args:
        skills (List[str]): List of skills of the mentee.
        languages (List[str]): List of the mentee's languages.
        mentors (pd.DataFrame): DataFrame containing information of mentors.
        skill_weight (int, optional): Weight assigned to the skill variable. Defaults to 1.
        language_weight (int, optional): Weight assigned to the language variable. Defaults to 1.

    Returns:
        pd.DataFrame: Original DataFrame with the score variable added to it
    """
    skill_binary = _skill_to_binary(set(skills))
    language_binary = _language_to_binary(languages)

    mentee_skill_count = count_ops(skill_binary)
    mentee_language_count = count_ops(language_binary)

    # Error prevention when mentee or mentor selects no skills,
    # assign a minimum value of 1
    if mentee_skill_count == 0:
        mentee_skill_count += 1
    if mentee_language_count == 0:
        mentee_language_count += 1

    for (index, mentor) in mentors.iterrows():
        mentor_skill_binary = _skill_to_binary(mentor['profile__skills'])
        mentor_language_binary = _language_to_binary(mentor['profile__languages'])

        mentor_skill_score = (
            (np.dot(
                skill_binary.ravel(),
                mentor_skill_binary.ravel()) /
                (mentee_skill_count)))
        mentor_language_score = (
            (np.dot(
                language_binary.ravel(),
                mentor_language_binary.ravel()) /
                (mentee_language_count)))

        mentors.loc[index, 'score'] = (
            mentor_skill_score * skill_weight + mentor_language_score * language_weight)

    mentors['score'] = ((mentors['score'] - mentors['score'].min()) /
                        (mentors['score'].max() - mentors['score'].min()))

    return mentors
