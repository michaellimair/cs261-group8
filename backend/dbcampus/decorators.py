from django.http import JsonResponse

def allowed_users(allowed_roles=[]):
  def decorator(view_func):
    def wrapper_func(request, *args, **kwargs):
      if (request.user.groups.exists()):
        for user_group in request.user.groups.all():
          if user_group in allowed_roles:
            return view_func(request, *args, **kwargs)
        return JsonResponse({'message': 'Unauthorized'}, status=401)
      return view_func(request, *args, **kwargs)
    return wrapper_func
  return decorator