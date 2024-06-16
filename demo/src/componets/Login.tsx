import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelectore } from "../redux/hook";
import { userLogin } from "../redux/slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const auth = useAppSelectore((state) => state.auth.isAuthentication);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (auth) {
    navigate("/");
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(userLogin(values));

    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-600">
    <div className="bg-white shadow-md rounded-md p-8 max-w-sm w-full">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
        Login
      </h1>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
       <p
      onClick={() => navigate("/forgetPass")}
       className=" cursor-pointer hover:text-blue-700 transition duration-150 text-blue-500 mb-4 xl:ml-20">forgot password</p>    
 
      <p>
        Dont Have an accoungit t please{" "}
        <Link className="text-red text-red-900  font-bold" to="/signup">
          {" "}
          sign up{" "}
        </Link>{" "}
      </p>
    </div>
    
    </div>
  );
};

export default Login;
