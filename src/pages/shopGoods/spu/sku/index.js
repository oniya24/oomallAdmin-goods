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
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import pagination from '@/utils/pagination';
const goods_sku = ({
  spuDetail,
  id,
  getSpuById,
  postAddSku2Spu,
  deleteSku,
  putModifySku,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const { skuList } = spuDetail;
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteSku = async ({ id }) => {
    await deleteSku({
      shopId: depart_id,
      id,
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
    // form.setFieldsValue(record)
  };
  const handleSubmitCreate = () => {
    form.validateFields().then((value) => {
      // await postAddSku2Spu(value)
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then((value) => {
      // await putModifySku(value)
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
        title: 'skuSn',
        dataIndex: 'skuSn',
        key: 'skuSn',
      },
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
      },
      {
        title: '图片',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
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
          return (
            <Space>
              <Button type="default" onClick={() => handleModifySku(record)}>
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeleteSku(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  // useEffect(() => {
  //   // getSpuById({
  //   //   shopId: depart_id,
  //   //   page: spuPage,
  //   //   pageSize: spuPageSize
  //   // });
  //   console.log("fetch new")
  // }, [ ]);
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
        <Form form={form}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="活动名"
            name="name"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="decription"
            required
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="规格"
            name="specs"
            required
            rules={[{ required: true, message: '请输入规格' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(goods_sku);
