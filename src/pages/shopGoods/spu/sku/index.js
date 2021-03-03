import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, useParams } from 'umi';
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
import pagination from '@/utils/pagination';
import { UploadOutlined } from '@ant-design/icons';

const goods_sku = ({
  spuDetail,
  id,
  getSpuById,
  postAddSku2Spu,
  deleteSku,
  postUploadSkuImg,
  putOnshelves,
  putOffshelves,
  putModifySku,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { skuList } = spuDetail;
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const handledeleteSku = async ({ id }) => {
    await deleteSku({
      shopId: depart_id,
      id,
    });
    await getSpuById({
      id: id,
    });
  };
  const handleCreateSku = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifySku = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    const { name, ...value } = record;
    form.setFieldsValue({
      ...value,
      skuName: name,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      const { skuName, ...data } = value;
      await postAddSku2Spu({
        shopId: depart_id,
        spuId: id,
        name: skuName,
        ...data,
      });
      await getSpuById({
        id: id,
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
    await postUploadSkuImg({
      shopId: depart_id,
      id: id,
      formData,
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      const { skuName, id: skuId, ...data } = value;
      await putModifySku({
        name: skuName,
        shopId: depart_id,
        id: skuId,
        ...data,
      });
      await handleUploadImg(skuId);
      await getSpuById({
        id: id,
      });
      setModalVisible(false);
    });
  };
  const handlePutOnshelves = async ({ id: skuId }) => {
    await putOnshelves({
      shopId: depart_id,
      id: skuId,
    });
    await getSpuById({
      id: id,
    });
  };
  const handlePutOffshelves = async ({ id: skuId }) => {
    await putOffshelves({
      shopId: depart_id,
      id: skuId,
    });
    await getSpuById({
      id: id,
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
        title: 'skuSn',
        dataIndex: 'skuSn',
        key: 'skuSn',
      },
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (src) => (
          <img src={src} style={{ width: 100, height: 100 }}></img>
        ),
      },
      {
        title: 'inventory',
        dataIndex: 'inventory',
        key: 'inventory',
      },
      {
        title: '原价',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
      },
      {
        title: '现价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'disable',
        dataIndex: 'disable',
        key: 'disable',
        render: (text, record) => {
          return <>{text ? '是' : '否'}</>;
        },
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record;
          console.log(state);
          return (
            <Space>
              {Number(state) === 0 ? (
                <Button
                  type="primary"
                  onClick={() => handlePutOffshelves(record)}
                >
                  下架sku
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handlePutOnshelves(record)}
                >
                  上架sku
                </Button>
              )}
              <Button type="default" onClick={() => handleModifySku(record)}>
                修改sku
              </Button>
              <Button type="danger" onClick={() => handledeleteSku(record)}>
                删除sku
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateSku}>
          添加sku
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        // pagination={pagination(spuTotal, saveSkuPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={skuList || []}
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
        <Form form={form} preserve={false} style={{ width: 400 }}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          {modalState == 0 ? (
            <>
              <Form.Item
                label="编号"
                name="sn"
                required
                rules={[{ required: true, message: '此项非空' }]}
              >
                <Input />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              label="sku名"
              name="skuName"
              required
              rules={[{ required: true, message: '此项非空' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="原价"
            name="originalPrice"
            required
            rules={[{ required: true, message: '此项非空' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="配置"
            name="configuration"
            required
            rules={[{ required: true, message: '此项非空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="重量"
            name="weight"
            required
            rules={[{ required: true, message: '此项非空' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="库存"
            name="inventory"
            required
            rules={[{ required: true, message: '此项非空' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="细节"
            name="detail"
            required
            rules={[{ required: true, message: '此项非空' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) !== 0 ? (
            <Form.Item label="上传图片">
              <Upload
                name="file"
                id="file2"
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

export default connect(mapStateToProps, mapDispatchToProps)(goods_sku);
