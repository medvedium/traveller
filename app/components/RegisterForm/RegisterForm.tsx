import { Button, Input } from 'antd';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '~/lib/user';

type Inputs = {
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerUser(data.email, data.password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Controller
          name='email'
          control={control}
          rules={{ required: 'Обязательное поле' }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Email'
              className='dark:text-white'
              autoComplete='false'
              status={errors.email && 'error'}
            />
          )}
        />
        {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        <Controller
          name='password'
          control={control}
          rules={{
            required: 'Пароль обязателен',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              className='dark:text-white'
              placeholder='Пароль'
              status={errors.password && 'error'}
            />
          )}
        />
        {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}

        <Button type='primary' htmlType='submit'>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
