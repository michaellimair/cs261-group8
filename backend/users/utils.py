from .models import UserProfile

def get_higher_titles(title: UserProfile.Title):
    """Obtains the job titles that are higher than a specific title"""
    avail_titles = [
        UserProfile.Title.ANALYST,
        UserProfile.Title.ASSOCIATE,
        UserProfile.Title.ASSISTANT_VICE_PRESIDENT,
        UserProfile.Title.VICE_PRESIDENT,
        UserProfile.Title.DIRECTOR,
        UserProfile.Title.MANAGING_DIRECTOR
    ]
    title_index = avail_titles.index(title)
    return avail_titles[title_index:]
