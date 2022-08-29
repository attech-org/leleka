// import { yupResolver } from "@hookform/resolvers/yup";
// import React from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";

// interface MyForm {
//   userName: string;
//   dateOfBirth: Date;
// }

// const sampleSchema = yup.object().shape({
//   userName: yup.string().required("Name is required!"),
//   dateOfBirth: yup.date().required("Birth date is required!"),
// });

// const FormValidationSample = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<MyForm>({
//     resolver: yupResolver(sampleSchema),
//   });

//   const submitForm = (data: MyForm) => {
//     console.log(data);
//   };

//   return (
//     <div>
//       <div>Sample of react-hook-form and Yap</div>
//       <form onSubmit={handleSubmit(submitForm)}>
//         <input {...register("userName")} type="text" name="userName" placeholder="Name" />
//         <p>{errors.userName && errors?.userName?.message}</p>
//         <input {...register("email")} type="text" name="email" placeholder="Email" />
//         <p>{errors.email && errors?.email?.message}</p>
//         <input {...register("dateOfBirth")} type="date" name="dateOfBirth" />
//         <p>{errors.dateOfBirth && errors?.dateOfBirth?.message}</p>
//         <input {...register("password")} type="password" name="password" placeholder="Password" />
//         <p>{errors.password && errors?.password?.message}</p>
//         <input {...register("confirmPassword")} type="password" name="confirmPassword" placeholder="Confirm password" />
//         <p>{errors.confirmPassword && errors?.confirmPassword?.message}</p>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default FormValidationSample;
