import classNames from 'classnames/bind';
import style from '~/layout/Detail/Detail.module.scss';
import { Row, Collapse, Col } from 'antd';
const { Panel } = Collapse;

const cx = classNames.bind(style);
function Policy({ data }) {
   return (
      <Row gutter={24}>
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel header="Giá tour bao gồm" className={cx('policy-header-title')} key="1">
                  <p>{data.priceincludes}</p>
               </Panel>
            </Collapse>
         </Col>
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel header="Lưu ý khi chuyển/hủy tour" className={cx('policy-header-title')} key="1">
                  <p>{data.conditionregistering}</p>
               </Panel>
            </Collapse>
         </Col>
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel header="Giá tour không bao gồm" className={cx('policy-header-title')} key="1">
                  <p>{data.pricenotincluded}</p>
               </Panel>
            </Collapse>
         </Col>
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel header="Các điều kiện hủy tour đối với ngày thường" className={cx('policy-header-title')} key="1">
                  <p>{data.notecancel}</p>
               </Panel>
            </Collapse>
         </Col>{' '}
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel header="Giá vé trẻ em" className={cx('policy-header-title')} key="1">
                  <p>{data.childfare}</p>
               </Panel>
            </Collapse>
         </Col>{' '}
         <Col md={{ span: 11 }} sm={{ span: 23 }} xs={{ span: 24 }}>
            <Collapse className={cx('policy-content')} bordered={false}>
               <Panel
                  header="Các điều kiện hủy tour đối với ngày lễ, Tết"
                  className={cx('policy-header-title')}
                  key="1"
               >
                  <p>{data.contact}</p>
               </Panel>
            </Collapse>
         </Col>
      </Row>
   );
}

export default Policy;
