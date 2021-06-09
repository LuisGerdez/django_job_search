document.addEventListener('DOMContentLoaded', function() {
	if(window.location.pathname.split('/')[1] === 'register') {
		const form_employer = document.querySelector('#form-employer');
		const form_employee = document.querySelector('#form-employee');
		const button_form_employer = document.querySelector('#button-form-employer')
		const button_form_employee = document.querySelector('#button-form-employee')

		button_form_employer.addEventListener('click', function() {
			form_employee.style.display = 'none';
			this.className = 'btn btn-secondary';
			button_form_employee.className = 'btn btn-outline-secondary';

			setTimeout(function() {
				form_employer.style.display = 'block';
			}, 500);
		});

		button_form_employee.addEventListener('click', function() {
			form_employer.style.display = 'none';
			this.className = 'btn btn-secondary';
			button_form_employer.className = 'btn btn-outline-secondary';

			setTimeout(function() {
				form_employee.style.display = 'block';
			}, 500);
		});
	}

	if(window.location.pathname.split('/')[1] === 'profile') {
		if(document.querySelector('#employee-btn-edit-description')) {
			document.querySelector('#employee-btn-edit-description').addEventListener('click', function() {
				const content = document.querySelector('#employee-description-content').innerText;
				document.querySelector('#employee-description-container').innerHTML = `<form id="employee-form-edit-description"><textarea id="employee-edit-content" class="form-control" name="edit_content" rows="2" required>${content}</textarea><input class="btn btn-primary btn-sm" type="submit" value="Edit"><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel"></form>`;

				if(document.querySelector('#employee-form-edit-description')) {
					document.querySelector('#employee-form-edit-description').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const description = document.querySelector('#employee-edit-content').value;

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employee',
    							edit: 'description',
            					content: description
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}
			});
		}

		if(document.querySelector('#employee-btn-edit-experience')) {
			document.querySelector('#employee-btn-edit-experience').addEventListener('click', function() {
				const container = document.querySelector('#employee-experience-container')
				const experience = document.querySelectorAll('#employee-experience-content');

				container.innerHTML = ``;

				form = document.createElement('form');
				form.id = 'employee-form-edit-experience'

				buttons = document.createElement('div');
				buttons.innerHTML = `<input class="btn btn-primary btn-sm" type="submit" value="Edit"><button type="button" class="btn btn-success btn-sm" onclick="addfield(this.parentElement.parentElement, 'employee-textbox-edit-experience');">Add new</button><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel">`
				form.append(buttons);

				experience.forEach(xp => {
					textbox = document.createElement('div');
					textbox.innerHTML = `<input id="employee-textbox-edit-experience" type="text" value="${xp.innerText}"><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove();">x</button>`
					form.append(textbox);
				});

				container.append(form);

				if(document.querySelector('#employee-form-edit-experience')) {
					document.querySelector('#employee-form-edit-experience').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const edit_experience = document.querySelectorAll('#employee-textbox-edit-experience');
						let new_experience = '';

						edit_experience.forEach(xp => {
							new_experience += (xp.value.trim() + ';;');
						});

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employee',
    							edit: 'experience',
            					content: new_experience
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}

			});
		}

		if(document.querySelector('#employee-btn-edit-education')) {
			document.querySelector('#employee-btn-edit-education').addEventListener('click', function() {
				const container = document.querySelector('#employee-education-container')
				const education = document.querySelectorAll('#employee-education-content');

				container.innerHTML = ``;

				form = document.createElement('form');
				form.id = 'employee-form-edit-education'

				buttons = document.createElement('div');
				buttons.innerHTML = `<input class="btn btn-primary btn-sm" type="submit" value="Edit"><button type="button" class="btn btn-success btn-sm" onclick="addfield(this.parentElement.parentElement, 'employee-textbox-edit-education');">Add new</button><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel">`
				form.append(buttons);

				education.forEach(educ => {
					textbox = document.createElement('div');
					textbox.innerHTML = `<input id="employee-textbox-edit-education" type="text" value="${educ.innerText}"><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove();">x</button>`
					form.append(textbox);
				});

				container.append(form);

				if(document.querySelector('#employee-form-edit-education')) {
					document.querySelector('#employee-form-edit-education').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const edit_education = document.querySelectorAll('#employee-textbox-edit-education');
						let new_education = '';

						edit_education.forEach(educ => {
							new_education += (educ.value.trim() + ';;');
						});

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employee',
    							edit: 'education',
            					content: new_education
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}

			});
		}

		if(document.querySelector('#employee-btn-edit-courses')) {
			document.querySelector('#employee-btn-edit-courses').addEventListener('click', function() {
				const container = document.querySelector('#employee-courses-container')
				const courses = document.querySelectorAll('#employee-courses-content');

				container.innerHTML = ``;

				form = document.createElement('form');
				form.id = 'employee-form-edit-courses'

				buttons = document.createElement('div');
				buttons.innerHTML = `<input class="btn btn-primary btn-sm" type="submit" value="Edit"><button type="button" class="btn btn-success btn-sm" onclick="addfield(this.parentElement.parentElement, 'employee-textbox-edit-courses');">Add new</button><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel">`
				form.append(buttons);

				courses.forEach(course => {
					textbox = document.createElement('div');
					textbox.innerHTML = `<input id="employee-textbox-edit-courses" type="text" value="${course.innerText}"><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove();">x</button>`
					form.append(textbox);
				});

				container.append(form);

				if(document.querySelector('#employee-form-edit-courses')) {
					document.querySelector('#employee-form-edit-courses').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const edit_courses = document.querySelectorAll('#employee-textbox-edit-courses');
						let new_courses = '';

						edit_courses.forEach(course => {
							new_courses += (course.value.trim() + ';;');
						});

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employee',
    							edit: 'course',
            					content: new_courses
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}

			});
		}

		if(document.querySelector('#employee-btn-edit-lang')) {
			document.querySelector('#employee-btn-edit-lang').addEventListener('click', function() {
				const container = document.querySelector('#employee-lang-container')
				const languages = document.querySelectorAll('#employee-lang-content');

				container.innerHTML = ``;

				form = document.createElement('form');
				form.id = 'employee-form-edit-lang'

				buttons = document.createElement('div');
				buttons.innerHTML = `<input class="btn btn-primary btn-sm" type="submit" value="Edit"><button type="button" class="btn btn-success btn-sm" onclick="addfield(this.parentElement.parentElement, 'employee-textbox-edit-lang');">Add new</button><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel">`
				form.append(buttons);

				languages.forEach(lang => {
					textbox = document.createElement('div');
					textbox.innerHTML = `<input id="employee-textbox-edit-lang" type="text" value="${lang.innerText}"><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove();">x</button>`
					form.append(textbox);
				});

				container.append(form);

				if(document.querySelector('#employee-form-edit-lang')) {
					document.querySelector('#employee-form-edit-lang').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const edit_langs = document.querySelectorAll('#employee-textbox-edit-lang');
						let new_languages = '';

						edit_langs.forEach(lang => {
							new_languages += (lang.value.trim() + ';;');
						});

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employee',
    							edit: 'lang',
            					content: new_languages
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}

			});
		}

		if(document.querySelector('#employer-btn-edit-description')) {
			document.querySelector('#employer-btn-edit-description').addEventListener('click', function() {
				const content = document.querySelector('#employer-description-content').innerText;
				document.querySelector('#employer-description-container').innerHTML = `<form id="employer-form-edit-description"><textarea id="employer-edit-content" class="form-control" name="edit_content" rows="2" required>${content}</textarea><input class="btn btn-primary btn-sm" type="submit" value="Edit"><input onclick="location.reload();" class="btn btn-danger btn-sm" type="button" value="Cancel"></form>`;

				if(document.querySelector('#employer-form-edit-description')) {
					document.querySelector('#employer-form-edit-description').onsubmit = () => {
						const username = document.querySelector('#username').innerText;
						const description = document.querySelector('#employer-edit-content').value;

						fetch('/api/edit', {
                			method: 'PUT',
    						body: JSON.stringify({
    							user: username,
    							type: 'employer',
    							edit: 'description',
            					content: description
            				})
              			})
              			.then(response => response.json())
    					.then(result => {
    						location.reload();
    						if(result.error === "Security.") {
    							alert("You can't edit other users information!");
    							location.reload();
    						}
    					});

						return false;
					}
				}
			});
		}
	}

	if(window.location.pathname.split('/')[1] == '') {
		if(document.querySelector('#all-jobs-view')) {
			show_jobs(null, 1);
		}
	}

	if(window.location.pathname.split('/')[1] === 'profile') {
		if(document.querySelector('#user-jobs-view')) {
			const pathname = window.location.pathname.split('/');
			show_jobs(pathname[2], 1);
		}
	}
});

function addfield(element, id) {
	textbox = document.createElement('div');
	textbox.innerHTML = `<input id="${id}" type="text" value=""><button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove();">x</button>`
	element.append(textbox);
}

function show_jobs(user, page=1) {
	if(user != null) {
		container = document.querySelector('#user-jobs-view');
		url = '/api/jobs/user/' + user + '/' + page;
		func_format = "show_jobs('user', page);";
	} else {
		container = document.querySelector('#all-jobs-view');
		url = '/api/jobs/' + page;
		func_format = 'show_jobs(null, page);';
	}

	container.innerHTML = '';

	fetch(url)
    .then(response => response.json())
    .then(data => {
    	if(Object.keys(data.pagination.jobs).length > 0) {
    		data.pagination.jobs.forEach(job => {
        		const element = document.createElement('div');
				element.className = 'container p-4 my-3 border';

				element_job_title = document.createElement('h2');
				element_job_title.innerHTML = `${job.title}`;

				element_job_description = document.createElement('p');
				element_job_description.style.color = 'gray';
				element_job_description.innerHTML = `${job.description}`;

				element_view_button = document.createElement('a');
				element_view_button.className = 'btn btn-dark';
				element_view_button.href = window.location.origin + '/job/' + job.id;
				element_view_button.innerText = 'View job details';

				element.append(element_job_title);
				element.append(element_job_description);
				element.append(element_view_button);

				container.append(element);
        	});	
    	
        	const pagination_container = document.createElement('div');
        	pagination_container.innerHTML = `<nav><ul id="pagination" class="pagination justify-content-center"></ul></nav>`;
			container.append(pagination_container);

			const pagination = document.querySelector('#pagination');

        	const previous_button = document.createElement('li');
        	if(data.pagination.has_previous === true) {
        		previous_button.innerHTML = `<li class="page-item"><a onclick="${func_format.replace('user', user).replace('page', data.pagination.page - 1)}" class="page-link" href="javascript:void(0);">Previous</a></li>`;
        	} else {
        		previous_button.innerHTML = `<li class="page-item disabled"><a class="page-link" href="javascript:void(0);" aria-disabled="true">Previous</a></li>`;
        	}
        	pagination.append(previous_button);

        	for(var i = 1; i <= data.pagination.total_pages; i++) {
        		if(i === data.pagination.page) {
        			num_button = document.createElement('li');
        			num_button.innerHTML = `<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0);">${i} <span class="sr-only">(current)</span></a></li>`;
        		} else {
        			num_button = document.createElement('li');
        			num_button.innerHTML = `<li onclick="${func_format.replace('user', user).replace('page', i)}" class="page-item"><a class="page-link" href="javascript:void(0);">${i}</a></li>`;
        		}
        		pagination.append(num_button);
        	}
        
        	const next_button = document.createElement('li');
        	if(data.pagination.has_next === true) {
        		next_button.innerHTML = `<li class="page-item"><a onclick="${func_format.replace('user', user).replace('page', data.pagination.page + 1)}" class="page-link" href="javascript:void(0);">Next</a></li>`;
        	} else {
        		next_button.innerHTML = `<li class="page-item disabled"><a class="page-link" href="javascript:void(0);" aria-disabled="true">Next</a></li>`;
        	}
        	pagination.append(next_button);
        } else {
			const element = document.createElement('div');
			element.className = 'container p-4 my-3 border';
			element.innerHTML = `<p style="text-align: center; font-size: 24px;">There are no jobs posted yet<p>`;
			container.append(element);
		}
    });
}
