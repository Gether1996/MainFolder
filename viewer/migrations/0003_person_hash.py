# Generated by Django 4.2.6 on 2024-05-08 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('viewer', '0002_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='hash',
            field=models.CharField(default=0, max_length=150),
            preserve_default=False,
        ),
    ]
