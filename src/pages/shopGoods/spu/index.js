import { useMemo, useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
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
const goods_spu = ({
  spuList,
  spuTotal,
  spuPage,
  spuPageSize,
  getAllSpu,
  postAddSpu,
  putModifySpu,
  deleteSpu,
  saveSpuPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteSpu = async ({ id }) => {
    await deleteSpu({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateSpu = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifySpu = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    form.setFieldsValue(record);
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      await postAddSpu({
        shopId: depart_id,
        ...value,
      });
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    console.log('????');
    form.validateFields().then(async (value) => {
      await putModifySpu({
        shopId: depart_id,
        ...value,
      });
      await getAllSpu({
        shopId: depart_id,
        page: spuPage,
        pageSize: spuPageSize,
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
        title: '产品编号',
        dataIndex: 'goodsSn',
        key: 'goodsSn',
      },
      {
        title: '缩略图',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, record) => {
          return <img src={text} style={{ width: 50, height: 50 }}></img>;
        },
      },
      {
        title: '分类',
        dataIndex: ['category', 'name'],
        key: 'category.name',
      },
      {
        title: '品牌',
        dataIndex: ['brand', 'name'],
        key: 'brand.name',
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
          const { state, id } = record;
          return (
            <Space>
              <Button type="primary" onClick={() => handleModifySpu(record)}>
                修改商品信息
              </Button>
              <Button
                type="default"
                onClick={() => history.push(`/shopGoods/spu/${id}`)}
              >
                查看详情
              </Button>
              <Button type="danger" onClick={() => handledeleteSpu(record)}>
                删除商品
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllSpu({
      shopId: depart_id,
      page: spuPage,
      pageSize: spuPageSize,
    });
  }, [spuPage, spuPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateSpu}>
          新增商品
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(spuTotal, saveSpuPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={spuList}
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
        <Form form={form} preserve={false}>
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

export default connect(mapStateToProps, mapDispatchToProps)(goods_spu);
