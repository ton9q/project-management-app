import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { config } from '../../config';

import { Loading } from '../../components/Loading';
import { InputContainer, ErrorMessage, FormTitle } from '../../components/formComponents';

import { useAppDispatch, useAppSelector } from '../../store';
import { logInSelector, signIn as signInAction, SignInUser } from '../../store/loginSlice';

const errorMessages = {
  required: 'this field is required',
};

export function SignIn() {
  const { t } = useTranslation(['common', 'pages_registration', 'form_message']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, signInSucceed } = useAppSelector(logInSelector);

  useEffect(() => {
    if (signInSucceed) {
      reset();
      navigate('/main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInSucceed]);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = (user: SignInUser) => {
    dispatch(signInAction(user));
  };

  return (
    <>
      {isLoading && <Loading />}

      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 2 }}
      >
        <Grid className="login-modal">
          <Paper elevation={24} sx={{ padding: '20px', width: '350px', margin: '20px' }}>
            <form onSubmit={handleFormSubmit(handleSubmit)}>
              <FormTitle>{t('common:navbar.sign_in')}</FormTitle>

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
                  {errors.login?.message || errorMessages.required}
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
                  {errors.password?.message || errorMessages.required}
                </ErrorMessage>
              </InputContainer>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginBottom: '12px', height: '40px' }}
                fullWidth
              >
                {t('common:navbar.sign_in')}
              </Button>
            </form>
          </Paper>

          <Typography sx={{ textAlign: 'center' }}>
            {t('pages_registration:account')}
            <Link to={config.urls.public.signUp}>{t('common:navbar.sign_up')}</Link>
          </Typography>
        </Grid>
      </Box>
    </>
  );
}
