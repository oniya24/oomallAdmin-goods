import { Card, Tabs } from 'antd';
import ValidCoupon from './valid';
import InvalidCoupon from './invalid';
const { TabPane } = Tabs;
const adminManage = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="validCoupon" tab="有效活动">
          <ValidCoupon></ValidCoupon>
        </TabPane>
        <TabPane key="invalidCoupon" tab="已下架活动">
          <InvalidCoupon></InvalidCoupon>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default adminManage;
