import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from '~/lib/user'

type Inputs = {
	email: string;
	password: string;
}

const RegisterForm = () => {
	const { register, formState: { errors }, handleSubmit } = useForm<Inputs>()
	const [error, setError] = useState<string | null>(null);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		registerUser(data.email, data.password).then((data) => {
			console.log(data);
		})
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						className={`border-1 ${errors.email && 'border-red-500'}`}
						{...register("email", { required: true })}
					/>
					{errors.email && <span>This field is required</span>}
				</div>
				<div>
					<input
						type='password'
						className={`border-1 ${errors.password && 'border-red-500'}`}
						{...register("password", { required: true })}
					/>
					{errors.password && <span>This field is required</span>}
				</div>
				<button className="border-1" type="submit">
					Register
				</button>
			</form>
		</div>
	)
}

export default RegisterForm