# Generated by Django 4.2 on 2023-05-01 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
