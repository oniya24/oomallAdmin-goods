import { useMemo, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Table, Button, Tooltip, Space } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '@/models/Comment';
import pagination from '@/utils/pagination';

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
  useEffect(() => {
    getAllComments({
      id: depart_id,
      state: commentState,
      page: commentPage,
      pageSize: commentPageSize,
    });
  }, [commentState, commentPage, commentPageSize]);
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
          return (
            <Space>
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
            </Space>
          );
        },
      },
    ];
  }, []);
  return (
    <Card>
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
