import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input, Select } from "antd";
import { AddressData, editAddressData } from "../../redux/slice/AddressSlice";
import { useAppDispatch } from "../../redux/hook";

type EditAddressProps = {

  item?: AddressData;
};

const EditAddress: React.FC<EditAddressProps> = ({item}) => {

  
  
  
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
 
   const dispatch = useAppDispatch() 
  const { TextArea } = Input; 
  const { Option } = Select;
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
     form.submit()
  };
  
 
  useEffect(() => {
    if (open && item) {
      form.setFieldsValue(item);
    }
  }, [open, item, form]);
 

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleFinish = (values: AddressData) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      console.log(values);
      const id=item?.id
      values.id = id
      dispatch(editAddressData(values))
      console.log("Clicked ok",values);
      
      setConfirmLoading(false);
    }, 1000);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit 
      </Button>
      <Modal
        title="Edit Address"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          autoComplete="off"
         

        >
          <div className={`  grid  grid-cols-1 md:grid-cols-2 gap-1`}>
            <Form.Item label="Name" name="name" rules={[{ required: false }]}>
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[{ required: true, message: "Please input the pincode!" }]}
            >
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="Address (Area and Street)"
              name="addressAreaAndStreet"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <TextArea rows={2} className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="City/District/Town"
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
                { required: true, message: "Please input the mobile number!" },
                { len: 10, message: "Mobile number must be 10 digits!" },
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
                  Work (Delivery between 10 AM - 5 PM)
                </Option>
              </Select>
            </Form.Item>

           
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditAddress;
