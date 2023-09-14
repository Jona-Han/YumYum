import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Form() {
  type FormData = {
    fullName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };

  const schema: ZodType<FormData> = z
    .object({
      fullName: z.string(),
      email: z.string().email(),
      age: z.number().positive().min(18).max(110),
      password: z.string().min(4).max(20),
      confirmPassword: z.string().min(4).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Full name" {...register('fullName')} />
        <p>{errors.fullName?.message}</p>
        <input type="text" placeholder="Email" {...register('email')} />
        <input type="number" placeholder="Age" {...register('age', { valueAsNumber: true })} />
        <input type="password" placeholder="Password" {...register('password')} />
        <input type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
