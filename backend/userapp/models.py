from django.db import models
from django.db.models import Sum
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager


class SpaUserManager(BaseUserManager):

    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        from monedaapp.models import Exchange, ExchangeRow
        e = Exchange()
        e.description = "Credito de invitacion"
        e.save()
        er = ExchangeRow()
        er.user = user
        er.money_in = 100
        er.money_out = 0
        er.save()
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and
        password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class SpaUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = SpaUserManager()
    USERNAME_FIELD = 'email'

    @property
    def money_balance(self):
        balance = self.transfers.aggregate(balance=(Sum('money_in') - Sum('money_out')))
        return balance['balance']

    def __str__(self):
        return self.email
