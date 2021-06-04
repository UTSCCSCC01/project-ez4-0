# EntreE: A Community and E-Learning Virtual Platform
You can explore the following topics in this file:
- Introduction
- Motivation
- Demo
- Installation
- Getting Started
- Contribution
- Project Members

## Introduction
This is a course project of group **EZ4.0** for CSCC01 at UTSC in the 2021 Summer.

The goal of this platform will be to provide the end to end experience for our target users (aspiring, first time
African entrepreneurs) - where they can come in with their problem/need identified, learn how to build
their solution, get involved in bigger communities and build their companies.

## Motivation
As mentioned by the African Impact Initiative:
> From our 2020 pilot in Ghana, we’ve identified the need for a more user-focused and user-friendly
platform that integrates the various jobs to be done which the challenge provides to those aspiring entrepreneurs who we
support.

We realized that it is a great chance for us to utilize our enhanced technical skills, and this project indeed meets our desires of helping people in developing areas.

As such, we decided to build a virtual platform that mainly focuses on the community and E-Learning features for our potential users, since efficient learning experiences and effective communications play a crucial role for first-time entrepreneurs, registered companies and partners.

That is how EntreE comes into our minds.

## Demo
Here is a quick demo video for the project.

## Installation
The stack for this project is:
- Backend: flask
- Frontend: react
- Database: MongoDB, PostgreSQL
- VM: docker

### Docker Setup
We use docker to manage databases instead of directly downloading them. Checkout [Here](https://docs.docker.com/get-started/) for docker setup. After you successfully setting it up, run the command to spin up the database images:
```
$ docker-compose up -d
```

### Backend Setup
Require `Python 3.8+` (Suggest using [pyenv](https://github.com/pyenv/pyenv))

1. First create a virtualenv named `venv` under the `backend` folder, see [here](https://virtualenv.pypa.io/en/latest/installation.html) for more information about `virtualenv` and how to install it
```
$ cd backend    # The following commands assumed you are in backend/
$ python -m venv venv
# or, if the above command does not work
python -m virtualenv venv
```

3. Activate the virtualenv by
```
$ source venv/bin/activate
```

4. Install the necessary packages specified in `requirements.txt`
```
(venv) $ pip install -r requirements.txt
```

5. Setup `config.py` for server configurations and modify them as needed. The reason why we want to do this is to allow each developer to have a customizable running at their local and wouldn't affect other environments
```
(venv) $ cp config.py.bak config.py
```

6. Finally, start the server. The `FLASK_ENV=development` flag here specifies that you are running at a development mode at local so that whenever you saved a file the server will be automatically reloaded
```
(venv) $ FLASK_ENV=development flask run
```

7. Test if your server is successfully running by checking out [http://localhost:5000/](http://localhost:5000/). You should see:
```
{
  "success": true
}
```

### Frontend Setup
Require `yarn 1.22+` (Installation guide [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable))

1. Install the packages using yarn
```
cd frontend    # The following commands assumed you are in frontend/
$ yarn
```

2. Start the frontend
```
$ yarn start
```

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository or other teammates before making a change.

*Note*: Please make pull request instead of directly merging into the master branch.

#### Responsibility
Core contributors should attend daily standup, actively communicate with other project members, and push meaningful commit messages that well describe the code changes.

#### Our Standards
Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members


## Project Members
- JunXing Xu
- Xianghu Dai
- Jiale Yu
- Houde Liu
- Zhenye Zhu
