import { useMemo, useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Select,
  Tooltip,
  Space,
  Row,
  Col,
  Form,
  DatePicker,
  Modal,
  Input,
} from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Groupon';
import pagination from '@/utils/pagination';
import { dateFormat } from '@/consts/oomall';
import moment from 'moment';

const { Option } = Select;
const shopActivity_groupon = ({
  grouponList,
  grouponTotal,
  grouponPage,
  grouponPageSize,
  getAllGroupons,
  getAllSpu,
  spuList,
  postCreateGroupon,
  putModifyGroupon,
  deleteGroupon,
  putOnshelvesGroupon,
  putOffshelvesGroupon,
  saveAdverPagination,
}) => {
  console.log(spuList);
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [queryParams, setQueryParams] = useState({
    beginTime: moment(new Date()).subtract(1, 'M'),
    endTime: moment(new Date()).add(1, 'M'),
    state: 0,
  });
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
  const fetchNewGrouponList = async () => {
    let { beginTime, endTime, ...params } = queryParams;
    beginTime = beginTime.format(dateFormat);
    endTime = endTime.format(dateFormat);
    await getAllGroupons({
      shopId: depart_id,
      ...params,
      beginTime,
      endTime,
      page: grouponPage,
      pageSize: grouponPageSize,
    });
  };
  const handledeleteGroupon = async ({ id }) => {
    await deleteGroupon({
      shopId: depart_id,
      id,
    });
    await fetchNewGrouponList();
  };
  const handleCreateGroupon = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyGroupon = (record) => {
    setModalState(1);
    setModalVisible(true);
    let { beginTime, endTime } = record;
    beginTime = moment(beginTime, dateFormat);
    endTime = moment(endTime, dateFormat);
    // console.log(record)
    form.setFieldsValue({
      ...record,
      beginTime,
      endTime,
    });
  };
  const handleOnShelves = async ({ id }) => {
    await putOnshelvesGroupon({
      shopId: depart_id,
      id,
    });
    await fetchNewGrouponList();
  };
  const handleOffShelves = async ({ id }) => {
    await putOffshelvesGroupon({
      shopId: depart_id,
      id,
    });
    await fetchNewGrouponList();
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      let { beginTime, endTime, spuId } = value;
      beginTime = beginTime.format(dateFormat);
      endTime = endTime.format(dateFormat);
      // spuId在这里选择
      await postCreateGroupon({
        shopId: depart_id,
        spuId,
        ...value,
        beginTime,
        endTime,
      });
      await fetchNewGrouponList();
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      let { beginTime, endTime } = value;
      beginTime = beginTime.format(dateFormat);
      endTime = endTime.format(dateFormat);
      await putModifyGroupon({
        shopId: depart_id,
        spuId,
        ...value,
        beginTime,
        endTime,
      });
      await fetchNewGrouponList();
      setModalVisible(false);
    });
  };
  const handleQueryFormSubmit = async (value) => {
    let { beginTime, endTime, ...params } = value;
    beginTime = beginTime.format(dateFormat);
    endTime = endTime.format(dateFormat);
    await getAllGroupons({
      shopId: depart_id,
      ...params,
      beginTime,
      endTime,
      page: grouponPage,
      pageSize: grouponPageSize,
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
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
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
    let { beginTime, endTime, ...params } = queryParams;
    beginTime = beginTime.format(dateFormat);
    endTime = endTime.format(dateFormat);
    getAllGroupons({
      shopId: depart_id,
      ...params,
      beginTime,
      endTime,
      page: grouponPage,
      pageSize: grouponPageSize,
    });
    getAllSpu({
      shopId: depart_id,
      page: 1,
      pageSize: 1000,
    });
  }, [grouponPage, grouponPageSize]);
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Card>
        <Form form={queryForm} layout="inline" onFinish={handleQueryFormSubmit}>
          <Row>
            <Col span={5}>
              <Form.Item label="物品" name="spuId">
                <Select>
                  {spuList.map((item) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="状态"
                name="state"
                initialValue={queryParams.state}
              >
                <Select>
                  <Option value={0}>已创建</Option>
                  <Option value={1}>已上架</Option>
                  <Option value={2}>已下架</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="开始时间"
                name="beginTime"
                initialValue={queryParams.beginTime}
                // required
                // rules={[{ required: true, message: '请输入开始时间' }]}
              >
                <DatePicker showTime />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                label="结束时间"
                name="endTime"
                initialValue={queryParams.endTime}
                // required
                // rules={[{ required: true, message: '请输入结束时间' }]}
              >
                <DatePicker showTime />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询活动
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <div style={{ margin: 5 }}>
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
      </Card>
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
        <Form form={form} preserve={false} style={{ width: 350 }}>
          <Form.Item label="id" name="id" hidden></Form.Item>
          <Form.Item
            label="策略"
            name="strategy"
            required
            rules={[{ required: true, message: '请输入策略' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) === 0 ? (
            <Form.Item
              label="物品"
              name="spuId"
              required
              rules={[{ required: true, message: '请选择商品' }]}
            >
              <Select>
                {spuList.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : null}
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
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(shopActivity_groupon);
