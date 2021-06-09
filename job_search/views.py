import json
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import User, EmployerUser, EmployeeUser, Job


def index(request):
    return render(request, "job_search/index.html", {
        "jobs": Job.objects.all().order_by('-id')
    })


def jobs(request, username=None, page=1):
    if username == None:
        jobs = Job.objects.all().order_by('-id')
    else:
        try:
            user = User.objects.get(username=username)
            if user.user_type == 1:
                jobs = Job.objects.filter(user=user).order_by('-id')
            else:
                return JsonResponse({"error": "This user is an employee."}, status=404)
        except User.DoesNotExist:
            return JsonResponse({"error": "User doesn't exist."}, status=404)
    try:
        p = Paginator(jobs, 3)

        pagination = {
            'page': page,
            'total_pages': p.num_pages,
            'jobs': [job.serialize() for job in p.page(page)],
            'has_next': p.page(page).has_next(),
            'has_previous': p.page(page).has_previous(),
        }

        return JsonResponse({'pagination': pagination})
    except:
        return JsonResponse({"error": "Empty Page"}, status=400)


@login_required
def job_post(request):
    if request.method == "POST":
        job = Job.objects.create(user=request.user)
        job.title = request.POST["job_title"]
        job.description = request.POST["job_description"]
        job.country = request.POST["country"]
        job.state = request.POST["state"]
        job.city = request.POST["city"]
        job.requirements = request.POST["job_requirements"]
        job.salary = request.POST["job_salary"]
        job.save()
        return redirect(f"/job/{job.id}")
    return render(request, "job_search/job_post.html")


def job_view(request, job_id):
    try:
        job = Job.objects.get(id=int(job_id))
        employer = EmployerUser.objects.get(user=job.user)

        applicants = []
        for a in job.applicants.all():
            employee = EmployeeUser.objects.get(user=a)
            a.phone = employee.phone
            if employee.gender == 1:
                a.gender = "Male"
            else:
                a.gender = "Female"
            a.birthday = employee.birthday.strftime("%b %d %Y")
            a.country = employee.country
            a.state = employee.state
            a.city = employee.city
            applicants.append(a)

        if request.method == "POST":
            if 'delete-job' in request.POST:
                job_id = request.POST["job_id"]
                job = Job.objects.get(id=int(job_id))
                job.delete()

                return HttpResponseRedirect(reverse("index"))
        if(request.GET.get('apply-job')):
            job.applicants.add(request.user)

        return render(request, "job_search/job_view.html", {
            "exists": True, "job": job, "employer": employer,
            "applying": job.applicants.filter(username=request.user.username).exists(),
            "applicants": applicants
        })
    except Job.DoesNotExist:
        return render(request, "job_search/job_view.html", {
            "exists": False
        })


def profile(request, username):
    try:
        user = User.objects.get(username=username)
        if user.user_type == 2:
            employee = EmployeeUser.objects.get(user=user)
            return render(request, "job_search/profile.html", {
                "exists": True, "username": username, "user_type": user.user_type,
                "description": employee.description, "experience": employee.experience.split(";;"),
                "education": employee.education.split(";;"), "courses": employee.courses.split(";;"),
                "languages": employee.languages.split(";;"), "complete_profile": employee.description == "" or employee.experience == "" or employee.education == "" or employee.courses == "" or employee.languages == ""
            })
        elif user.user_type == 1:
            employer = EmployerUser.objects.get(user=user)
            return render(request, "job_search/profile.html", {
                "exists": True, "username": username, "user_type": user.user_type,
                "name": employer.company_name, "description": employer.company_description,
                "jobs": Job.objects.filter(user=user).order_by('-id')
            })
    except User.DoesNotExist:
        return render(request, "job_search/profile.html", {
            "exists": False, "username": username
        })


@csrf_exempt
@login_required
def edit(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("type") == "employee":
            try:
                user = User.objects.get(username=data.get("user"))
                employee = EmployeeUser.objects.get(user=user)

                if data.get("edit") == "description":
                    if user == request.user:
                        employee.description = data.get("content")
                        employee.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
                elif data.get("edit") == "experience":
                    if user == request.user:
                        employee.experience = data.get("content")
                        employee.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
                elif data.get("edit") == "education":
                    if user == request.user:
                        employee.education = data.get("content")
                        employee.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
                elif data.get("edit") == "course":
                    if user == request.user:
                        employee.courses = data.get("content")
                        employee.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
                elif data.get("edit") == "lang":
                    if user == request.user:
                        employee.languages = data.get("content")
                        employee.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)
        elif data.get("type") == "employer":
            try:
                user = User.objects.get(username=data.get("user"))
                employer = EmployerUser.objects.get(user=user)

                if data.get("edit") == "description":
                    if user == request.user:
                        employer.company_description = data.get("content")
                        employer.save()
                        return JsonResponse({"message": "Edited successfully."}, status=201)
                    else:
                        return JsonResponse({"error": "Security."}, status=400)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)
    else:
        return JsonResponse({"error": "POST or PUT request required."}, status=400)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "job_search/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "job_search/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))
    
def create_employer(username, email, password, company_name, company_description):
    user = User.objects.create_user(username, email, password, user_type = 1)
    employer = EmployerUser.objects.create(user=user)
    employer.company_name = company_name
    employer.company_description = company_description
    user.save()
    employer.save()
    return user
def create_employee(username, email, password, firstname, lastname, phone, gender, birthday, country, state, city):
    user = User.objects.create_user(username, email, password, user_type = 2)
    user.first_name = firstname
    user.last_name = lastname
    employee = EmployeeUser.objects.create(user=user)
    employee.phone = phone
    employee.gender = gender
    employee.birthday = birthday
    employee.country = country
    employee.state = state
    employee.city = city
    user.save()
    employee.save()
    return user
def register(request):
    if request.method == "POST":
        if 'register-employee' in request.POST:
            username = request.POST["username-employee"]
            email = request.POST["email-employee"]
            password = request.POST["password-employee"]
            confirmation = request.POST["confirmation-employee"]
            if password != confirmation:
                return render(request, "job_search/register.html", {
                    "message": "Passwords must match."
                })

            firstname = request.POST["firstname"]
            lastname = request.POST["lastname"]
            phone = request.POST["phone"]
            gender = int(request.POST["gender"])
            birthday = request.POST["birthday"]
            country = request.POST["country"]
            state = request.POST["state"]
            city = request.POST["city"]

            # Attempt to create new user
            try:
                user = create_employee(username, email, password, firstname, lastname, phone, gender, birthday, country, state, city)
            except IntegrityError:
                return render(request, "job_search/register.html", {
                    "message": "Username already taken."
                })
            login(request, user)
            return redirect(f"/profile/{user.username}")

        if 'register-employer' in request.POST:

            username = request.POST["username-employer"]
            email = request.POST["email-employer"]
            password = request.POST["password-employer"]
            confirmation = request.POST["confirmation-employer"]
            if password != confirmation:
                return render(request, "job_search/register.html", {
                    "message": "Passwords must match."
                })

            company_name = request.POST["company-name"]
            company_description = request.POST["company-description"]

            # Attempt to create new user
            try:
                user = create_employer(username, email, password, company_name, company_description)
            except IntegrityError:
                return render(request, "job_search/register.html", {
                    "message": "Username already taken."
                })
            login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "job_search/register.html")
