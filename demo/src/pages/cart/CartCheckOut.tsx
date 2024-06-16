import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Form, Input, Select } from "antd";
import {
  addAdressData,
  AddressData,
  deleteAddressData,
} from "../../redux/slice/AddressSlice";
import { useAppDispatch, useAppSelectore } from "../../redux/hook";
import EditAddress from "./EditAddress";
import { nanoid } from "nanoid";
import { Data, useGetProductByIdQuery } from "../../redux/query/apiSlice";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContex";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner";

const CartCheckOut: React.FC = () => {
  const { id: Pid } = useParams<{ id: string }>();

  const [idCheck, setIdCheck] = useState<boolean>(false);

  const { cartProduct } = useContext(CartContext);

  const { data } = useGetProductByIdQuery(Pid ?? "");
  const id = nanoid();
  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const addressData = useAppSelectore((state) => state.address.addressData);
  const [form] = Form.useForm();

  const [toggle, setToggle] = useState<boolean>(false);

  //total item
  const [totalItem, setTotalItem] = useState<Data[] | Data>([]);
  const [loadin, setLoading] = useState<boolean>(false);

 
 
  useEffect(() => {
    if (Pid === "cart") {
      setIdCheck(true);
      setTotalItem(cartProduct);
    } else {
      setIdCheck(false);
      if (data) {
        setTotalItem([data]);
      }
    }
  }, [Pid, data, cartProduct]);

  const handleFinish = useCallback(
    (values: AddressData) => {
      const FielData = {
        ...values,
        id: id,
      };
      dispatch(addAdressData(FielData));
      setToggle(false);
      form.resetFields(); // Reset the form after submission
    },
    [dispatch, form, id]
  );

  const toggleHandle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  //price set to All cart product
  const totalPrice = useMemo(() => {
    return cartProduct.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }, [cartProduct]);

  const findTotalItem = useMemo(() => {
    return cartProduct.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartProduct]);

  const totalDiscount = Math.floor(
    cartProduct.reduce(
      (acc, item) => acc + item.discountPercentage * (item.quantity || 0),
      0
    )
  );

  const actualPrice = useMemo(() => {
    return Math.floor((totalPrice * 100) / (100 - totalDiscount));
  }, [totalPrice, totalDiscount]);

  //payment handler
  const paymentHandler = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thank you for Order");
      const string = await loadStripe(
        "pk_test_51PIqWXSCDfT8KBBOp1HucciErz7zllecPYqFxppee1bAaKDSyIVVnDhMqExH5b7Xk3e3PibepW4E7VvyxzOGwGkj00wPL5o60U"
      );
      const body = {
        products: [totalItem],
      };
      const header = {
        "content-Type": "application/json",
      };
      const response = await fetch("http://localhost:4000/payment", {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      });

      const session = await response.json();
      const result = string?.redirectToCheckout({
        sessionId: session.id,
      });
      if (result?.catch) {
        console.log("Payment Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment Error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex-col md:flex-row  flex  w-full min-h-screen">
      <div className="md:w-[50%] w-full p-5">
        <div>
          <button
            onClick={toggleHandle}
            className="mb-2 p-2 bg-blue-500 text-white rounded"
          >
            {toggle ? "Cancel" : "Add Address"}
          </button>
        </div>
        <div className="w-full mt-2 max-w-2xl bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-1 text-center">
            Shopping Address
          </h2>
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            autoComplete="off"
          >
            <div
              className={`${
                toggle ? "flex flex-col sm:grid  " : "hidden"
              } gap-1`}
            >
              <Form.Item label="Name" name="name" rules={[{ required: false }]}>
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="Pincode"
                name="pincode"
                rules={[
                  { required: true, message: "Please input the pincode!" },
                ]}
              >
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="addressAreaAndStreet"
                rules={[
                  { required: true, message: "Please input the address!" },
                ]}
              >
                <TextArea rows={2} className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="City/District/Town"
                className="w-full"
                name="cityDistrictTown"
                rules={[{ required: true, message: "Please input the city!" }]}
              >
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item label="Landmark (Optional)" name="landmark">
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item label="Address Type" name="addressType">
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="10-digit mobile number"
                name="mobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input the mobile number!",
                  },
                  { len: 10, message: " number must be 10 digits!" },
                ]}
              >
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item label="Locality" name="locality">
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please input the state!" }]}
              >
                <Input className="flex-1 border rounded-md" />
              </Form.Item>

              <Form.Item
                label="Delivery Preference"
                name="deliveryPreference"
                rules={[
                  {
                    required: true,
                    message: "Please select a delivery preference!",
                  },
                ]}
              >
                <Select className="flex-1">
                  <Option value="Home (All day delivery)">
                    Home (All day delivery)
                  </Option>
                  <Option value="Work (Delivery between 10 AM - 5 PM)">
                    (Delivery time 10 AM-5 PM)
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Submit
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div
          className={`mt-2  ${
            toggle ? "    border  border-slate-500  " : ""
          }  w-full shadow-2xl p-2 `}
        >
          {Array.isArray(addressData) ? (
            addressData.map((item, index) => (
              <div key={index} className="  relative font-sans mb-3">
                <h1 className=" ">Name: {item.name}</h1>
                <p className=" ">Pincode: {item.pincode}</p>
                <p>Adress: {item.addressAreaAndStreet}</p>
                <p>City: {item.cityDistrictTown}</p>
                <p>Landmark: {item.landmark}</p>
                <p>Mobile: {item.mobileNumber}</p>
                <div className=" absolute top-1 right-0  flex  flex-col gap-2">
                  <button className="bg-blue-500 text-white rounded p-1">
                    {<EditAddress item={item} />}
                  </button>
                  <button
                    onClick={() => dispatch(deleteAddressData(item?.id ?? ""))}
                    className="bg-red-500 text-white rounded p-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses available</p>
          )}
        </div>
      </div>

      {/* price details */}
      <div className="md:w-[40%] w-full">
        <h2 className="text-2xl font-bold mb-1 text-center">Product Summary</h2>
        {idCheck ? (
          <div className="border ml-3 p-4 h-[18rem]">
            <h2 className="text-lg font-semibold">PRICE DETAILS</h2>

            <hr className="my-2 border-t" />

            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600">
                Total Price (items{findTotalItem})
              </label>
              <span className="font-semibold text-green-500">
                ${actualPrice}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600">Total discount</label>
              <span className="font-semibold  text-red-500">
                {totalDiscount}%
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600">Delivery Charges</label>
              <label className="font-semibold">
                <span className="line-through">$200</span> Free
              </label>
            </div>

            <hr />

            <div className="md:mt-5 flex justify-between items-center">
              <label className="text-gray-600">Discount Price</label>
              <span className="font-semibold text-green-600">
                {" "}
                {totalPrice}
              </span>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="border ml-3 p-4 w-full h-[20rem]">
              <h2 className="text-lg font-semibold">PRICE DETAILS</h2>

              <hr className="my-2 border-t" />

              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600">Total Price (1 items)</label>
                <span className="font-semibold text-green-500">
                  ${data?.price}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600">Total discount</label>
                <span className="font-semibold  text-green-500">
                  {data?.discountPercentage}%
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600">Delivery Charges</label>
                <label className="font-semibold">
                  <span className="line-through">$200</span> Free
                </label>
              </div>

              <hr />

              <div className="md:mt-10 flex justify-between items-center">
                <label className="text-gray-600">Total Price</label>
                <span className="font-semibold">${data?.price}</span>
              </div>
            </div>
          </div>
        )}
        <div className=" mt-2  ml-3">
          <button
            onClick={paymentHandler}
            className=" font-medium  rounded-md hover:font-semibold  w-[250px] h-[40px] mx-auto  bg-gradient-to-r from-green-800  to-green-700  "
          >
            {loadin ? <Spinner /> : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckOut;
