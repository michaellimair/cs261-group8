import json
import os
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

def get_skills():
    """Gets the list of all available skills"""
    with open(os.path.join(os.getcwd(), 'skills.json'), encoding='utf8') as file:
        all_skills = json.load(file)
        seen, result = set(), []
        for item in all_skills:
            if item.lower() not in seen:
                seen.add(item.lower())
                result.append(item)
        return result

skill = get_skills()
skill_set = set(skill)

def validate_skill(value: str):
    """Validates whether a skill name is valid or not."""
    if value not in skill_set:
        raise ValidationError(
            _('%(skill) is not a valid skill.'),
            params={'skill': skill},
        )
