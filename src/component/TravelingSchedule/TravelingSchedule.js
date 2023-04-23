import classNames from 'classnames/bind';
import style from '~/component/TravelingSchedule/TravelingSchedule.module.scss';
import { Row, Col, Timeline, Typography } from 'antd';
import {
   TimelineConnector,
   TimelineContent,
   TimelineDot,
   TimelineItem,
   TimelineOppositeContent,
   TimelineSeparator,
} from '@mui/lab';
import ShowMoreText from 'react-show-more-text';
import { format } from 'date-fns';
import { useState } from 'react';
const cx = classNames.bind(style);
function TravelingSchedule({ data, startDay }) {
   const [expand, setExpand] = useState(false);
   const onClick = () => {
      setExpand(!expand);
   };
   const startDay_date = new Date(startDay);

   return (
      <div className={cx('wrapper')}>
         <h2>Lịch Trình</h2>
         <Row>
            <Col md={{ span: 8 }} xs={{ span: 0 }} className={cx('go-tour')}>
               <div>
                  <Timeline position="alternate">
                     {data.map((item, index) => {
                        return (
                           <TimelineItem key={index}>
                              <TimelineOppositeContent
                                 sx={{ m: 'auto 0', flex: 1 }}
                                 align="right"
                                 variant="body2"
                                 fontSize={'1.9rem'}
                              >
                                 Ngày
                              </TimelineOppositeContent>
                              <TimelineSeparator>
                                 <TimelineConnector />
                                 <TimelineDot
                                    style={{
                                       padding: '0 7px',
                                       background: '#fd5056',
                                       border: '1px solid #fd5056',
                                       color: '#fff',
                                    }}
                                 >
                                    {index + 1}
                                 </TimelineDot>
                                 <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent style={{ flex: 6 }}>
                                 <Typography
                                    variant="h6"
                                    component="span"
                                    style={{ fontWeight: '600', fontSize: '1.3rem' }}
                                 >
                                    {format(new Date().setDate(startDay_date.getDate() + 1 + index), 'dd/MM/yyyy')}
                                 </Typography>

                                 <Typography style={{ fontWeight: '700', fontSize: '1.6rem', color: '#2d4271' }}>
                                    {item.title}
                                 </Typography>
                              </TimelineContent>
                           </TimelineItem>
                        );
                     })}
                  </Timeline>
               </div>
            </Col>
            <Col md={{ span: 16 }} xs={{ span: 24 }}>
               {data.map((item, index) => {
                  return (
                     <div className={cx('time-line')} key={index}>
                        <h3>{item.title}</h3>
                        <div className={cx('time-line-item')}>
                           <div className={cx('excerpt')}>
                              <span className={cx('line')}></span>

                              <ShowMoreText
                                 lines={4}
                                 more={'xem thêm'}
                                 less={'ẩn bớt'}
                                 onClick={onClick}
                                 expanded={expand}
                                 height={200}
                              >
                                 {item.description}
                              </ShowMoreText>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </Col>
         </Row>
      </div>
   );
}

export default TravelingSchedule;
