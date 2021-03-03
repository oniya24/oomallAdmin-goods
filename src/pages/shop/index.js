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
  Select,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Shop';
import pagination from '@/utils/pagination';
const { Option } = Select;
const shop = ({
  getAllShop,
  postApplyShop,
  putModifyShop,
  deleteShop,
  putAuditShop,
  putOnshelves,
  putOffshelves,
  saveShopPagination,
  shopList,
  shopTotal,
  shopPage,
  shopPageSize,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteShop = async ({ id }) => {
    await deleteShop({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateShop = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyShop = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    const { name } = record;
    form.setFieldsValue({
      ...record,
      shopName: name,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      const { shopName, ...params } = value;
      await postApplyShop({
        ...params,
        name: shopName,
      });
      await getAllShop({
        page: shopPage,
        pageSize: shopPageSize,
      });
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      const { shopName, ...params } = value;
      await putModifyShop({
        shopId: depart_id,
        ...params,
        name: shopName,
      });
      await getAllShop({
        cId: 0,
        page: shopPage,
        pageSize: shopPageSize,
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
              <Button type="default" onClick={() => handleModifyShop(record)}>
                修改店铺信息
              </Button>
              <Button type="danger" onClick={() => handledeleteShop(record)}>
                删除店铺
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllShop({
      page: shopPage,
      pageSize: shopPageSize,
    });
  }, [shopPage, shopPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateShop}>
          申请商铺
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(shopTotal, saveShopPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={shopList}
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
            label="商铺名"
            name="shopName"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item label="细节" name="detail" required
            rules={
              [
                { required: true, message: '请输入细节'}
              ]
            }
          >
            <Input/>
          </Form.Item> */}
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(shop);
