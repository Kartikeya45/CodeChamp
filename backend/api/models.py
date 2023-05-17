from django.db import models

# Create your models here.


class UserProfile(models.Model): 
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Problem(models.Model):
    Qid = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()
    solution = models.TextField()
    test_input = models.TextField()
    test_output = models.TextField()
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]
    difficulty = models.CharField(max_length=6, choices=DIFFICULTY_CHOICES)

    def __str__(self):
        return str(self.Qid) + '. ' + self.title


class Submission(models.Model):
    STATUS_CHOICES = [
        ("Accepted", "Accepted"),
        ("Wrong Answer", "Wrong Answer"),
        ("Time Limit Exceeded", "Time Limit Exceeded"),
        ("Runtime Error", "Runtime Error"),
    ]

    code = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)
    submitted_at = models.DateTimeField(auto_now_add=True)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.problem) + ' - ' + str(self.status) + ' - ' + str(self.user) 
