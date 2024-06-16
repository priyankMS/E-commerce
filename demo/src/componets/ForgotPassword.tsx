// import { Button, Form, FormProps, Input } from "antd";
// import React from "react";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import { FieldType, forgotPassword } from "../redux/slice/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import { useAppSelectore } from "../redux/hook";

// const ForgotPassword: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const [form] = Form.useForm();
//   const  notSign = useAppSelectore(state=>state.auth.notSign)

//   const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
//     try {
//       await validationSchema.validate(values, { abortEarly: false });
    
//       dispatch(forgotPassword(values));
//       if(notSign){
//         navigate("/login")
//      }
//       form.resetFields();
//     } catch (error) {
//       console.log("Validation or Dispatch error:", error);
//     }
//   };

   
//   const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email").required("Please input your email"),
//     password: Yup.string()
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
//         "Password must contain at least one uppercase letter, one lowercase letter, and one number"
//       )
//       .required("Please input your password"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Please confirm your password"),
//   });

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-200">
//       <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

//         <Form
//           form={form}
//           name="basic"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           style={{ maxWidth: 600 }}
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="email"
//             name="email"
//             rules={[{ required: true, message: "Please input your email!" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 validator: async (_, value) => {
//                   try {
//                     await validationSchema.validateAt("password", { password: value });
//                   } catch (err) {
//                     return Promise.reject(err);
//                   }
//                 },
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             label="Confirm Password"
//             name="confirmPassword"
//             dependencies={["password"]}
//             rules={[
//               {
//                 validator: async (_, value) => {
//                   try {
//                     await validationSchema.validateAt("confirmPassword", {
//                       confirmPassword: value,
//                       password: form.getFieldValue("password"),
//                     });
//                   } catch (err) {
//                     return Promise.reject(err);
//                   }
//                 },
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
