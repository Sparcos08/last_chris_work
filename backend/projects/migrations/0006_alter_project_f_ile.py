# Generated by Django 4.1.5 on 2023-03-03 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_project_f_ile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='f_ile',
            field=models.FileField(null=True, upload_to='projects/files/'),
        ),
    ]
