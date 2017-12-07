from django.db import models

# Create your models here.

class Todo(models.Model):
    text = models.CharField('content', max_length=200)
    priority = models.IntegerField('priority')
    completed = models.BooleanField('completed', default=False)
    expiredate = models.CharField('expire date', max_length=50)

    def __unicode__(self):
        return self.text
