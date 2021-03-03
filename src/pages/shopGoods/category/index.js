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
import { mapStateToProps, mapDispatchToProps } from '@/models/Goods';
import pagination from '@/utils/pagination';
const { Option } = Select;
const goods_category = ({
  mainCategory,
  categoryList,
  categoryTotal,
  categoryPage,
  categoryPageSize,
  getAllMainCategory,
  getAllCategory,
  postAddCategory,
  putModifyCategory,
  deleteCategory,
  saveCategoryPagination,
}) => {
  console.log(mainCategory);
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [mainCate, setMainCate] = useState(0);
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
    const { name } = record;
    form.setFieldsValue({
      ...record,
      categoryName: name,
    });
  };
  const handleSubmitCreate = () => {
    form.validateFields().then(async (value) => {
      const { categoryName, cId, ...params } = value;
      console.log(value);
      await postAddCategory({
        shopId: depart_id,
        ...params,
        id: cId,
        name: categoryName,
      });
      await getAllCategory({
        cId: mainCate,
        page: categoryPage,
        pageSize: categoryPageSize,
      });
      setModalVisible(false);
    });
  };
  const handleSubmitModify = () => {
    form.validateFields().then(async (value) => {
      console.log('modify', value);
      const { categoryName, cId, ...params } = value;
      await putModifyCategory({
        shopId: depart_id,
        id: cId,
        ...params,
        name: categoryName,
      });
      await getAllCategory({
        cId: mainCate,
        page: categoryPage,
        pageSize: categoryPageSize,
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
    getAllMainCategory();
  }, []);
  useEffect(() => {
    getAllCategory({
      cId: mainCate,
      page: categoryPage,
      pageSize: categoryPageSize,
    });
  }, [mainCate, categoryPage, categoryPageSize]);
  return (
    <Card>
      <div style={{ margin: 10 }}>
        <Form layout="inline">
          <Form.Item label="选择主门类">
            <Select
              style={{ width: 200 }}
              onChange={(val) => setMainCate(val)}
              defaultValue={mainCate}
            >
              <Option value={0}>主分类</Option>
              {mainCategory.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleCreateCategory}>
              新增分类
            </Button>
          </Form.Item>
        </Form>
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
            label="品牌名"
            name="categoryName"
            required
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          {Number(modalState) === 0 ? (
            <Form.Item
              label="主门类"
              name="cId"
              required
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select>
                <Option value={0}>主分类</Option>
                {mainCategory.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(goods_category);
