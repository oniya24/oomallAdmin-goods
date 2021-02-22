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
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Groupon';
import pagination from '@/utils/pagination';
const shopActivity_groupon = ({
  grouponList,
  grouponTotal,
  grouponPage,
  grouponPageSize,
  getAllGroupons,
  postCreateGroupon,
  putModifyGroupon,
  deleteGroupon,
  putOnshelvesGroupon,
  putOffshelvesGroupon,
  saveAdverPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteGroupon = async ({ id }) => {
    await deleteGroupon({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateGroupon = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyGroupon = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    // form.setFieldsValue(record)
  };
  const handleOnShelves = async ({ id }) => {
    await putOnshelvesGroupon({
      shopId: depart_id,
      id,
    });
  };
  const handleOffShelves = async ({ id }) => {
    await putOffshelvesGroupon({
      shopId: depart_id,
      id,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then((value) => {
      // await postCreateGroupon(value)
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then((value) => {
      // await putModifyGroupon(value)
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
        title: '姓名',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { state } = record;
          return (
            <Space>
              {Number(state) === 0 ? (
                <Button type="primary" onClick={() => handleOnShelves(record)}>
                  上架活动
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleOffShelves(record)}>
                  下架活动
                </Button>
              )}
              <Button
                type="default"
                onClick={() => handleModifyGroupon(record)}
              >
                修改活动信息
              </Button>
              <Button type="danger" onClick={() => handledeleteGroupon(record)}>
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getAllGroupons({
      shopId: depart_id,
      page: grouponPage,
      pageSize: grouponPageSize,
    });
  }, [grouponPage, grouponPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateGroupon}>
          创建团购活动
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(grouponTotal, saveAdverPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={grouponList}
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
            label="策略"
            name="strategy"
            required
            rules={[{ required: true, message: '请输入策略' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="beginTime"
            required
            rules={[{ required: true, message: '请输入开始时间' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            required
            rules={[{ required: true, message: '请输入结束时间' }]}
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(shopActivity_groupon);
