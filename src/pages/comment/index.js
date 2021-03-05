import { useMemo, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space, Select, Form } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Comment';
import pagination from '@/utils/pagination';
const { Option } = Select;
const commentFilters = [
  {
    text: '已通过',
    value: 0,
  },
  {
    text: '未通过',
    value: 1,
  },
  {
    text: '未处理',
    value: 2,
  },
];
const userManage_comment = ({
  commentList,
  commentTotal,
  commentPage,
  commentPageSize,
  getAllComments,
  putComfirmComment,
  savePagination,
}) => {
  const { depart_id, userName, mobile } = JSON.parse(
    sessionStorage.getItem('adminInfo'),
  );
  const [commentState, setCommnetState] = useState(0);
  const handleConfirmComment = ({ id }, conclusion) => {
    putComfirmComment({
      did: depart_id,
      id,
      conclusion: conclusion,
    });
  };
  const handleSelectChange = (val) => {
    setCommnetState(val);
  };
  const handleQueryComments = () => {
    getAllComments({
      id: depart_id,
      state: commentState,
      page: commentPage,
      pageSize: commentPageSize,
    });
  };
  useEffect(() => {
    getAllComments({
      id: depart_id,
      page: commentPage,
      pageSize: commentPageSize,
      state: 0,
    });
  }, [commentPage, commentPageSize]);
  const columns = useMemo(() => {
    return [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: ['customer', 'userName'],
        key: 'customer_userName',
      },
      {
        title: '商品id',
        dataIndex: 'goodsSkuId',
        key: 'goodsSkuId',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '评论内容',
        dataIndex: 'content',
        key: 'content',
        render: (text, record) => {
          const shortStr = text.substr(0, 15);
          return <Tooltip title={text}>{shortStr}</Tooltip>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          const result = text;
          return <>{result}</>;
        },
        filterMultiple: false,
        filters: commentFilters,
        onFilter: (value, record) => console.log('fetch new '),
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
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          const { state } = record;
          return (
            <Space>
              {Number(state) === 2 ? (
                <>
                  <Button
                    type="danger"
                    onClick={() => handleConfirmComment(record, true)}
                  >
                    审核通过
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleConfirmComment(record, false)}
                  >
                    审核不通过
                  </Button>
                </>
              ) : (
                '无操作'
              )}
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
      <Form style={{ marginBottom: 10 }} layout="inline">
        <Form.Item label="评论状态">
          <Select
            style={{ width: 200 }}
            onChange={handleSelectChange}
            defaultValue={commentState}
          >
            {commentFilters.map((item) => {
              return <Option value={item.value}>{item.text}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleQueryComments}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        scroll={{ x: true }}
        pagination={pagination(commentTotal, savePagination)}
        rowKey={(record) => record.dataIndex}
        columns={columns}
        dataSource={commentList}
      ></Table>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(userManage_comment);
