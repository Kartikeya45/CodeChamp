from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import UserProfile, Submission, Problem
from .serializers import UserProfileSerializer, SubmissionSerializer, ProblemSerializer
import io
import sys
import traceback



@api_view(['POST'])
def postRegister(req):
    name = req.data.get('name', "")
    email = req.data.get('email', "")
    password = req.data.get('password', "")
    if UserProfile.objects.filter(email=email).exists():
        return Response({"status": "failed", "message": "Email already exists"})
    else:
        # create a new user
        user = UserProfile(name=name, email=email, password=password)
        user.save()
        # serialize the user data and return it in the response
        serializer = UserProfileSerializer(user)
        return Response(status=200)

@api_view(['POST'])
def postLogin(req):
    email = req.data.get('email', "")
    password = req.data.get('password', "")
    
    user = UserProfile.objects.filter(email=email).first()
    if not user:
        return Response({"status": "failed", "message": "Email does not exist"}, status=402)
    if user.password == password:
        return Response(status=200)
    return Response({"status": "failed", "message": "Invalid Credentials"}, status=403)

@api_view(['POST', 'GET'])
def problemView(request):
    # add new problem
    if request.method == 'POST':
        serializer = ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=405)
    # get list of all problems
    if request.method == 'GET':
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def postSubmission(request):
    # Extract data from request
    code = request.data.get('code', "")
    qid = request.data.get('qid', '')
    user_email = request.data.get('user_email', '')
    
    # Get the user and problem objects from the database
    try:
        user = UserProfile.objects.get(email=user_email)
        problem = Problem.objects.get(Qid=qid)
    except UserProfile.DoesNotExist:
        return Response({'message': 'User not found'})
    except Problem.DoesNotExist:
        return Response({'message': 'Problem not found'})
    
    # Create a new submission object
    submission = Submission.objects.create(
        code=code,
        status='Accepted', # Set the default status to Accepted
        problem=problem,
        user=user
    )
    
    # Serialize the submission object and return it in the response
    serializer = SubmissionSerializer(submission)
    return Response(serializer.data)

@api_view(['GET'])
def getProblem(request, qid):
    try:
        problem = Problem.objects.get(id=qid)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)

    serializer = ProblemSerializer(problem)
    # print(serializer.data)
    return Response(serializer.data)
    
@api_view(['POST'])
def submit(req, qid):
    def runcode(code, inputs):
        # Redirect the standard input to a file-like object that reads from the inputs string
        sys.stdin = io.StringIO(inputs)

        # Redirect the standard output to a new StringIO object
        sys.stdout = io.StringIO()

        # Execute the code
        try: 
            exec(code)
            status = 1
        except Exception as e:
            status = 0
            traceback_str = traceback.format_exc()
            return traceback_str, 0
        
        output = sys.stdout.getvalue()
        output = '\n'.join([line.strip() for line in output.splitlines()])

        # Reset the standard input and output
        sys.stdin = sys.__stdin__
        sys.stdout = sys.__stdout__

        # Return the output
        return output, status
    def check_output(user_output, actual_output):
        print(repr(user_output ))
        print(repr(actual_output))
        user_output = user_output.replace('\r', '')
        actual_output = actual_output.replace('\r', '')
        print(repr(user_output ))
        print(repr(actual_output))
        if actual_output == user_output:
            return True
        else:
            return False

    try:
        problem = Problem.objects.get(id=qid)
    except Problem.DoesNotExist:
        return Response({'error': 'Problem not found'}, status=404)
    
    s = Submission()
    s.code=req.data['code']
    s.problem=problem
    s.user = UserProfile(email=req.data['user'])


    user_output, status = runcode(req.data['code'], problem.test_input)
    if status == 0:
        s.status="Runtime Error"
        s.save()
        return Response({"status": s.status,"user_output": user_output}, status=200)
    correct = check_output(user_output, problem.test_output)
    if not correct:
        
        s.status = "Wrong Answer"
    else:
        s.status = "Accepted"
    s.save()
    return Response({"status": s.status, "user_output": user_output}, status=200)

@api_view(['GET'])
def getSubmissions(req):
    submissions = Submission.objects.filter(problem_id=req.GET['qid'], user=req.GET['user'])
    serializer = SubmissionSerializer(submissions, many=True)
    return Response(serializer.data, status=200)