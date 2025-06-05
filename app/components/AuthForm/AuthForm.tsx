import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/stores/auth';

type Inputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const {login, loading} = useAuthStore()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(null)
    try {
      await login(data.email, data.password); // Выполняем вход
      navigate('/'); // Перенаправляем на главную страницу
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={`border-1 ${errors.email && 'border-red-500'}`}
            {...register('email', {
              required: true,
              onChange: () => setError(null),
            })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <input
            type='password'
            className={`border-1 ${errors.password && 'border-red-500'}`}
            {...register('password', {
              required: true,
              onChange: () => setError(null),
            })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>{error && <span className='text-red-500'>{error}</span>}</div>
        <button className='border-1' type='submit'>
          Log In
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
