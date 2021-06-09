
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("profile/<str:username>", views.profile, name="profile"),

    path("job/<int:job_id>", views.job_view, name="job_view"),
    path("employer/post", views.job_post, name="job_post"),

    # API Routes
    path("api/edit", views.edit, name="edit"),
    path("api/jobs/<int:page>", views.jobs, name="jobs"),
    path("api/jobs/user/<str:username>/<int:page>", views.jobs, name="job_user"),
]
