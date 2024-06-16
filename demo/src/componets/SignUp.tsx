import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";


import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../uitility/api";

type FieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: FieldType) => {
    try {
      const response = await api.post("local/signup", values);
      if (response.status === 201) {
        navigate("/login");
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  //yup

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "password must be 6 ")
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        " at least one uppercase letter, one lowercase letter and one number:"
      ),
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center  ">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-12">
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-3 mb-1">
              <div className="mx-auto max-w-xs mt-2 font-serif">
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
                    label="firstName"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your  firstName!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="lastName"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your  lastname !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your  email !" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,

                        validator: (_, value) =>
                          validationSchema.validate({ password: value }),
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{}}>
                    <Button
                      type="primary"
                      className="mt-5   tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
