import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Tooltip,
  Space,
  Form,
  DatePicker,
  Modal,
  Input,
  Upload,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import { UploadOutlined } from '@ant-design/icons';
import pagination from '@/utils/pagination';
const goods_brand = ({
  brandList,
  brandTotal,
  brandPage,
  brandPageSize,
  getAllBrand,
  postAddBrand,
  putModifyBrand,
  deleteBrand,
  postUploadBrandImg,
  saveBrandPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const handledeleteBrand = async ({ id }) => {
    await deleteBrand({
      shopId: depart_id,
      id,
    });
    await getAllBrand({
      // shopId: depart_id,
      page: brandPage,
      pageSize: brandPageSize,
    });
  };
  const handleCreateBrand = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyBrand = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    const { name, ...params } = record;
    form.setFieldsValue({
      ...params,
      brandName: name,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      const { brandName, ...params } = value;
      await postAddBrand({
        shopId: depart_id,
        ...params,
        name: brandName,
      });
      await getAllBrand({
        // shopId: depart_id,
        page: brandPage,
        pageSize: brandPageSize,
      });
      setModalVisible(false);
    });
  };
  const beforeUpload = (file) => {
    console.log(file);
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 5;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 5MB!');
    // }
    setImageUrl(file);
    return false;
  };
  const handleUploadImg = async (id) => {
    const formData = new FormData();
    formData.append('file', imageUrl);
    await postUploadBrandImg({
      shopId: depart_id,
      id: id,
      formData,
    });
  };

  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      console.log(value);
      const { id, brandName, ...params } = value;
      await putModifyBrand({
        shopId: depart_id,
        id,
        ...params,
        name: brandName,
      });
      await handleUploadImg(id);
      await getAllBrand({
        // shopId: depart_id,
        page: brandPage,
        pageSize: brandPageSize,
      });
      setModalVisible(false);
    });
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, record) => {
          return <img src={text} style={{ width: 50, height: 50 }}></img>;
        },
      },
      {
        title: '细节',
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record;
          return (
            <Space>
              <Button type="default" onClick={() => handleModifyBrand(record)}>
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeleteBrand(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllBrand({
      // shopId: depart_id,
      page: brandPage,
      pageSize: brandPageSize,
    });
    console.log('fetch new');
  }, [brandPage, brandPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateBrand}>
          新增品牌
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(brandTotal, saveBrandPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={brandList}
      ></Table>
      <Modal
        visible={modalVisible}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        onOk={() =>
          Number(modalState) === 0 ? handleSubmitCreate() : handleSubmitModify()
        }
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="活动名"
            name="brandName"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="细节"
            name="detail"
            required
            rules={[{ required: true, message: '请输入细节' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) !== 0 ? (
            <Form.Item label="上传图片">
              <Upload
                name="file"
                id="file"
                beforeUpload={beforeUpload}
                multiple={false}
              >
                <Button icon={<UploadOutlined />}>选择图片</Button>
              </Upload>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(goods_brand);
