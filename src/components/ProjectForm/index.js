import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Divider,
  Button,
} from 'antd';
import { PROJECT_TYPE } from 'constants';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const ProjectForm = ({
  loading,
  saveSuccess,
  initialValues,
  onSubmit = () => {},
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const onFinish = (values) => {
    const { rangeTime, ...rest } = values;
    onSubmit({
      ...rest,
      startDate: rangeTime[0],
      endDate: rangeTime[1],
    });
  };

  return (
    <div>
      <Form
        layout={'vertical'}
        colon={false}
        form={form}
        initialValues={initialValues}
        onFinishFailed={(e) => console.log(e)}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col xs={24} lg={12}>
            <Form.Item
              label={'Name'}
              name="name"
              rules={[{ required: true, message: 'Name is required' }]}
            >
              <Input placeholder={'Please input name'} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label={'Type'}
              name="type"
              rules={[{ required: true, message: 'Type is required' }]}
            >
              <Select
                options={PROJECT_TYPE.map((i) => ({ label: i, value: i }))}
                placeholder={'Please input type'}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label={'Location'}
              name="location"
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input placeholder={'Please input location'} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label={'Area'}
              name="area"
              rules={[{ required: true, message: 'Area is required' }]}
            >
              <Input placeholder={'Please input area'} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="rangeTime" label="Time" {...rangeConfig}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row style={{ alignItems: 'center' }}>
          <Button loading={loading} type={'primary'} htmlType={'submit'}>
            Submit
          </Button>
          <Button
            disabled={loading}
            type={'outline'}
            style={{ marginLeft: 16 }}
          >
            Back
          </Button>
          {saveSuccess !== null && (
            <span
              style={{
                marginLeft: 16,
                color: `var(${
                  saveSuccess === true ? '--success-color' : '--error-color'
                })`,
              }}
            >
              {saveSuccess === true
                ? 'Create project success !'
                : 'Create project failed'}
            </span>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default ProjectForm;
