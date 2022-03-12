import pandas as pd
from pandas.testing import assert_frame_equal
from django.test import TestCase
from unittest.mock import patch
from .utils import count_ops, match_score_it

class TestMatchingUtils(TestCase):
    def test_count_ops(self):
        self.assertEqual(count_ops([0, 1, 1, 0, 0]), 2)

    @patch('skill.utils.get_skills')
    @patch('language.utils.ALL_LANGS', ["en", "id", "zh", "cu"])
    def test_match_score_it(self, mock_get_skills):
        mock_get_skills.return_value = ["skill1", "skill2", "skill3", "skill4"]
        test_data = {
            "id": [1, 2, 3],
            "profile__skills": [["skill1", "skill2"], ["skill2", "skill4"], ["skill1", "skill3"]],
            "profile__languages": [["en", "id"], ["en", "zh"], ["id", "cu"]]
        }
        mentee_skills = ["skill1", "skill2", "skill3"]
        mentee_languages = ["en", "id", "zh"]
        test_df = pd.DataFrame(test_data)
        test_data_with_score = test_data.copy()
        test_data_with_score['score'] = [1.0, 1.0, 0.0]
        assert_frame_equal(pd.DataFrame(test_data_with_score), match_score_it(mentee_skills, mentee_languages, test_df))
