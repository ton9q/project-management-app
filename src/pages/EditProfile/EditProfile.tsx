import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import jwt_decode from 'jwt-decode';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { config } from '../../config';

import { Loading } from '../../components/Loading';
import { InputContainer, ErrorMessage, FormTitle } from '../../components/formComponents';

import { useAppDispatch, useAppSelector } from '../../store';
import { errorMessages } from '../../config/form';
import {
  accessTokenStorageVariable,
  authSelector,
  editProfile as editProfileAction,
  SignUpUser,
} from '../../store/authSlice';

import { LocalStorage } from '../../utils/localStorage';

export function EditProfile() {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  const { t } = useTranslation(['common', 'pages_registration', 'form_message', 'edit_profile']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, editProfileSucceed } = useAppSelector(authSelector);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    setToken(LocalStorage.getItem(accessTokenStorageVariable).token);
  }, []);

  useEffect(() => {
    if (token) {
      setId((jwt_decode(token) as { userId: string; login: string; iat: number }).userId);
    }
  }, [token]);

  useEffect(() => {
    if (editProfileSucceed) {
      reset();
      navigate(config.urls.public.main);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProfileSucceed]);

  const handleSubmit = (user: SignUpUser) => {
    dispatch(editProfileAction(id, user, token));
  };

  const requiredErrorMessage = t(errorMessages.required);

  return (
    <>
      {isLoading && <Loading />}

      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
      >
        <Grid>
          <Paper elevation={24} sx={{ padding: '20px', width: '350px', margin: '20px' }}>
            <form onSubmit={handleFormSubmit(handleSubmit)}>
              <FormTitle>{t('edit_profile:title')}</FormTitle>

              <InputContainer>
                <TextField
                  {...register('name', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: t('form_message:message.only_letters'),
                    },
                    minLength: {
                      value: 2,
                      message: t('form_message:message.min_length', { num: 2 }),
                    },
                  })}
                  name="name"
                  label={t('pages_registration:user.name')}
                  placeholder={t('pages_registration:placeholder.name')}
                  fullWidth
                />
                <ErrorMessage $show={!!errors.name}>
                  {errors.name?.message || requiredErrorMessage}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <TextField
                  {...register('login', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: t('form_message:message.only_letters'),
                    },
                    minLength: {
                      value: 3,
                      message: t('form_message:message.min_length', { num: 3 }),
                    },
                  })}
                  name="login"
                  label={t('pages_registration:user.login')}
                  placeholder={t('pages_registration:placeholder.login')}
                  fullWidth
                />
                <ErrorMessage $show={!!errors.login}>
                  {errors.login?.message || requiredErrorMessage}
                </ErrorMessage>
              </InputContainer>

              <InputContainer>
                <TextField
                  {...register('password', {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/g,
                      message: t('form_message:message.only_numbers'),
                    },
                    minLength: {
                      value: 3,
                      message: t('form_message:message.min_length', { num: 3 }),
                    },
                  })}
                  name="password"
                  label={t('pages_registration:user.password')}
                  placeholder={t('pages_registration:placeholder.password')}
                  type="password"
                  fullWidth
                />
                <ErrorMessage $show={!!errors.password}>
                  {errors.password?.message || requiredErrorMessage}
                </ErrorMessage>
              </InputContainer>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginBottom: '12px', height: '40px' }}
                fullWidth
              >
                {t('edit_profile:submitBtn')}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
