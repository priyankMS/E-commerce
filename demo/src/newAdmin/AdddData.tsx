import { Button, Form, Input, Modal, Select, Space } from "antd";
import { useState } from "react";
import { Data } from "../redux/query/apiSlice";
import { nanoid } from "nanoid";



export const AddData: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const { Option } = Select;

  const handleCancel = () => {
    setOpen(false);
  };
  const handleFinish = async(values: Data) => {
    setConfirmLoading(true);
    const id = nanoid();  // Generate a unique ID using nanoid
    const numericId = id.replace(/\D/g, '');  // Remove non-numeric characters from the ID string
    const parsedId = parseInt(numericId, 10);  // Parse the numeric ID as an integer
    values.id = parsedId;
    try {
     const response  =  await fetch(`http://localhost:4040/api/products/additem/${parsedId}`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
     body:JSON.stringify(values)
    })
     if(!response.ok){
      throw new Error('Failed to add the product')
     }
     console.log("suceess");
     setOpen(false)
     form.resetFields();
    } catch (error) {
      console.log(error);
      
    }
  
    console.log("Clicked ok", values);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create
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
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-1`}>
            <Form.Item label="Title" name="title" rules={[{ required: false }]}>
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Add description" }]}
            >
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="Discount Percentage"
              name="discountPercentage"
              rules={[
                { required: true, message: "Please input discountPercentage!" },
              ]}
            >
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item label="Rating" name="rating">
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.Item
              label="categoty"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a categoty preference!",
                },
              ]}
            >
              <Select className="flex-1">
                <Option value="smartphones">Smartphone</Option>
                <Option value="laptops">laptops</Option>
                <Option value="fragrances">Fragrances</Option>
                <Option value="skincare">skincare</Option>
                <Option value="groceries">Groceries</Option>
                <Option value="home-decoration">Home-Decoration</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Thumbnail Image"
              name="thumbnail"
              rules={[{ required: true, message: "Please input the image!" }]}
            >
              <Input className="flex-1 border rounded-md" />
            </Form.Item>

            <Form.List name="images">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name]}
                        rules={[
                          { required: true, message: "Missing image URL" },
                        ]}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                      <Button type="link" onClick={() => remove(name)}>
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Image
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </Form>
      </Modal>
    </>
  );
};
