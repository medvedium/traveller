import { Button, Input } from 'antd';
import { useState } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { isLoading, login } from '~/stores/auth';

type Inputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null);
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  if (isLoading()) {
    return <div className='loader'>Loading...</div>;
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div>
          <Controller
            name='email'
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Email'
                status={errors.email && 'error'}
                className='dark:text-white'
                onChange={(e) => {
                  field.onChange(e);
                  setError(null);
                }}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder='Password'
                status={errors.password && 'error'}
                onChange={(e) => {
                  field.onChange(e);
                  setError(null);
                }}
              />
            )}
          />
        </div>

        {error && <span className='text-red-500'>{error}</span>}

        <Button type='primary' htmlType='submit'>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
