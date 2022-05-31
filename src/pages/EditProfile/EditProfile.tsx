import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Loading } from '../../components/Loading';
import { InputContainer, ErrorMessage, FormTitle } from '../../components/formComponents';

import { config } from '../../config';
import { errorMessages } from '../../config/form';
import { useAppDispatch, useAppSelector } from '../../store';
import { userSelector, getProfile, editProfile, deleteProfile } from './userSlice';
import { signOut, SignUpUser } from '../../store/authSlice';
import { useRequestSucceed } from '../../hooks/useRequestSucceed';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export function EditProfile() {
  const { t } = useTranslation(['common', 'pages_registration', 'form_message', 'edit_profile']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, editProfileSucceed } = useAppSelector(userSelector);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      login: currentUser?.login || '',
      password: '',
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        login: currentUser.login,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useRequestSucceed(editProfileSucceed, () => {
    navigate(config.urls.public.main);
    reset();
  });

  const handleEditProfile = (userData: SignUpUser) => {
    dispatch(editProfile(userData));
  };

  const handleDeleteProfile = async () => {
    await dispatch(deleteProfile());
    dispatch(signOut());
    navigate(config.urls.public.welcome);
  };

  const requiredErrorMessage = t(errorMessages.required);

  return (
    <>
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
      >
        <Grid>
          {isLoading && <Loading />}
          {!isLoading && (
            <Paper elevation={24} sx={{ padding: '20px', width: '350px', margin: '20px' }}>
              <form onSubmit={handleFormSubmit(handleEditProfile)}>
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

                <ButtonContainer>
                  <Button type="submit" variant="contained" fullWidth>
                    {t('edit_profile:submitBtn')}
                  </Button>

                  <Button color="error" variant="contained" onClick={handleDeleteProfile} fullWidth>
                    {t('edit_profile:deleteBtn')}
                  </Button>
                </ButtonContainer>
              </form>
            </Paper>
          )}
        </Grid>
      </Box>
    </>
  );
}
