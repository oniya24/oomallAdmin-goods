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
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import pagination from '@/utils/pagination';
const goods_category = ({
  categoryList,
  categoryTotal,
  categoryPage,
  categoryPageSize,
  getAllCategory,
  postAddCategory,
  putModifyCategory,
  deleteCategory,
  saveCategoryPagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [modalState, setModalState] = useState(0); // 0是创建
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handledeleteCategory = async ({ id }) => {
    await deleteCategory({
      shopId: depart_id,
      id,
    });
  };
  const handleCreateCategory = () => {
    setModalState(0);
    setModalVisible(true);
  };
  const handleModifyCategory = (record) => {
    setModalState(1);
    setModalVisible(true);
    // 这里对time进行处理
    // form.setFieldsValue(record)
  };
  const handleSubmitCreate = () => {
    form.validateFields().then((value) => {
      // await postAddCategory(value)
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then((value) => {
      // await putModifyCategory(value)
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
              <Button
                type="default"
                onClick={() => handleModifyCategory(record)}
              >
                修改活动信息
              </Button>
              <Button
                type="danger"
                onClick={() => handledeleteCategory(record)}
              >
                删除活动
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    // getAllCategory({
    //   shopId: depart_id,
    //   page: categoryPage,
    //   pageSize: categoryPageSize
    // });
    console.log('fetch new');
  }, [categoryPage, categoryPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Button type="primary" onClick={handleCreateCategory}>
          新增分类
        </Button>
      </div>
      <Table
        scroll={{ x: true }}
        pagination={pagination(categoryTotal, saveCategoryPagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={categoryList}
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

export default connect(mapStateToProps, mapDispatchToProps)(goods_category);
