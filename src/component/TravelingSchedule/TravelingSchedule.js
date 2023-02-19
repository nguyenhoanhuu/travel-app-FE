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
const cx = classNames.bind(style);
function TravelingSchedule() {
   return (
      <div className={cx('wrapper')}>
         <h2>Lịch Trình</h2>
         <Row>
            <Col span={8} className={cx('go-tour')}>
               <div>
                  <Timeline position="alternate">
                     <TimelineItem>
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
                              1
                           </TimelineDot>
                           <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent style={{ flex: 6 }}>
                           <Typography variant="h6" component="span" style={{ fontWeight: '600', fontSize: '1.3rem' }}>
                              18/04/2023
                           </Typography>

                           <Typography style={{ fontWeight: '700', fontSize: '1.6rem', color: '#2d4271' }}>
                              TP. HỒ CHÍ MINH – PARIS
                           </Typography>
                        </TimelineContent>
                     </TimelineItem>
                     <TimelineItem>
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
                              2
                           </TimelineDot>
                           <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent style={{ flex: 6 }}>
                           <Typography variant="h6" component="span" style={{ fontWeight: '600', fontSize: '1.3rem' }}>
                              18/04/2023
                           </Typography>
                           <Typography style={{ fontWeight: '700', fontSize: '1.6rem', color: '#2d4271' }}>
                              TP. HỒ CHÍ MINH – PARIS
                           </Typography>
                        </TimelineContent>
                     </TimelineItem>
                     <TimelineItem>
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
                              3
                           </TimelineDot>
                           <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent style={{ flex: 6 }}>
                           <Typography variant="h6" component="span" style={{ fontWeight: '600', fontSize: '1.3rem' }}>
                              18/04/2023
                           </Typography>
                           <Typography style={{ fontWeight: '700', fontSize: '1.6rem', color: '#2d4271' }}>
                              TP. HỒ CHÍ MINH – PARIS
                           </Typography>
                        </TimelineContent>
                     </TimelineItem>
                  </Timeline>
               </div>
            </Col>
            <Col span={16}>
               <div className={cx('time-line')}>
                  <h3>Ngày 1 - TP.HỒ CHÍ MINH - SINGAPORE (Ăn tối)</h3>
                  <div className={cx('time-line-item')}>
                     <div className={cx('excerpt')}>
                        <span className={cx('line')}></span>
                        <div>
                           Trưởng đoàn Vietravel đón Quý khách tại cổng hẹn ở sân bay Tân Sơn Nhất làm thủ tục đáp
                           chuyến bay đi Singapore. Đến sân bay Changgi, Quý khách được tận mắt chiêm ngưỡng sự hiện đại
                           của một sân bay được mệnh danh là sân bay bật nhất thế giới, tham quan khu phức hợp Jewel
                           Changi - một công trình kiến trúc được khánh thành từ năm 2019. Đây là khu phức hợp được
                           thiết kế hiện đại, cùng sự kết hợp giữa thiên nhiên với sức sáng tạo của con người, đặc sắc
                           nhất Quý khách sẽ được chiêm ngưỡng Rain Vortex – thác nước xoáy trong nhà cao nhất thế giới.
                           <br />
                           <br />
                           Xe và hướng dẫn viên địa phương đón đoàn, khởi hành khám phá đảo quốc sư tử biển Singapore,
                           đoàn dừng chân tham quan và chụp ảnh bên ngoài Tòa nhà quốc hội, Công viên Sư Tử Biển, Nhà
                           hát Victoria, Nhà hát Esplanade. Sau đó, đoàn tiếp tục tham quan bên ngoài khu vườn Garden By
                           The Bay với hệ thống “siêu cây” năng lượng mặt trời, dự án công viên sinh thái lớn nhất và
                           độc nhất ở khu vực Đông Nam Á. Quý khách sẽ có cơ hội trải nghiệm khí hậu mát mẻ của những
                           vùng Địa Trung Hải cận nhiệt đới tại Khu vườn thực vật (Flower Dome) là nơi sinh sống của
                           30.000 thực vật từ trên 150 loài, trải khắp 9 khu vườn. Khu vườn luôn có sự thay đổi về hình
                           thức trình bày hoa ấn tượng, để thể hiện những mùa, lễ hội cũng như chủ để văn hóa khác nhau.
                           Tham quan khu vườn trên mây (Cloud Forest) kết hợp Avatar dựa trên chủ đề về các bộ phim bom
                           tấn, sẽ cho quý khách có thêm trải nghiệm về một phiên bản đời thực của hành tinh Pandora bối
                           cảnh chính của phim Avatar. Ngoài ra, Qúy khách có thể trải nghiệm cảm giác hồi hộp, thích
                           thú khi bước chân trên OCBC Skyway con đường đi bộ trên không dài 128m nối giữa hai siêu cây.
                           Ngắm cảnh thành phố vịnh khu Marina Bay từ Đài quan sát Siêu cây (Supertree Observatory) –
                           nằm trên đỉnh cao nhất trong 18 Siêu cây. (Chi phí tự túc)
                           <br />
                           <br />
                           Đến giờ hẹn, đoàn dùng bữa tối tại nhà hang địa phương và về khách sạn nhận phòng nghỉ ngơi.
                        </div>
                     </div>
                  </div>
                  <h3>Ngày 2 - SINGAPORE – CITY TOUR (Ăn Sáng, trưa, tối)</h3>
                  <div className={cx('time-line-item')}>
                     <div className={cx('excerpt')}>
                        <span className={cx('line')}></span>
                        <div>
                           Đoàn khởi hành khám phá khu phố nhỏ quyến rũ Kampong Glam và con đường bích họa Haji land sôi
                           động nhiều màu sắc. Nơi đây pha trộn độc đáo giữa lịch sử, văn hóa với phong cách sống thời
                           thượng giúp quý khách có thêm trải nghiệm về một thế giới nghệ thuật đường phố đa sắc màu, tự
                           do mua sắm tại các cửa hàng thời trang độc đáo của Singapore, tham quan các du tích lịch sử
                           như cung điện Istana Kampung Gelam - Trung tâm di sản Mã Lai và nhà thờ Hồi giáo Hajah
                           Fatimah. Tiếp tục hành trình, xe đưa đoàn dừng chân tham quan mua sắm tại trung tâm vàng bạc
                           đá quý (Diamond Factory), cửa hàng dầu xanh Harbour Mart.
                           <br />
                           <br />
                           Đoàn dùng bữa trưa tại nhà hàng địa phương. Sau đó, đoàn khởi hành đến Đảo Sentosa - một
                           trong những khu vui chơi giải trí nổi tiếng nhất tại Singapore. Đoàn tự do khám phá, vui
                           chơi, mua sắm tại các khu trò chơi, cửa hàng miễn thuế, Casino, Thủy Cung… (Chi phí tự túc)
                           hoặc chụp ảnh bên ngoài Công viên Universal.
                           <br />
                           <br />
                           Đến giờ hẹn, Đoàn dùng bữa tối tại nhà hàng địa phương. Sau đó, về lại khách sạn nhận phòng
                           nghỉ ngơi. Tự do khám phá Singapore về đêm. Quý khách tự do vui chơi về đêm, khu SkyPark của
                           Marina Bay Sands là gợi ý cho du khách có thể ngắm toàn cảnh 360 độ của khu vực Vịnh Marina
                           và đường chân trời đẹp mê hồn của thành phố, kết hợp thưởng thức một ly cocktail sẽ làm tăng
                           thêm sự lãng mạn, ngọt ngào. Hay thỏa thích mua sắm tại khu Trung Tâm Orchard - “thiên đường
                           mua sắm” với những trung tâm thương mại sang trọng.
                        </div>
                     </div>
                  </div>
                  <h3>Ngày 3 - SINGAPORE – MỘT NGÀY TỰ DO (Ăn sáng)</h3>
                  <div className={cx('time-line-item')}>
                     <div className={cx('excerpt')}>
                        <span className={cx('line')}></span>
                        <div>
                           Ăn sáng tại khách sạn. Qúy khách tự do khám phá Đảo Quốc Sư Tử Biển (Không bao gồm chi phí
                           hướng dẫn viên, xe, ăn trưa, ăn tối, vé vào cổng các điểm tham quan). Một vài gợi ý cho hành
                           trình tư túc, tự do tìm hiểu nét đặc trưng của đất nước Sinagpore cho quý khách có thêm lựa
                           chọn, quý khách có thể tham khảo thêm và liên hệ với Vietravel để đặt dịch vụ (nếu cần)
                           <br />
                           <br />
                           <strong> Option 01: </strong>Một ngày khám phá văn hóa ẩm thực đường phố Singapore được
                           UNESSCO công nhận. Phương tiện: công cộng, đi bộ, xe đạp. (tự túc) Gợi ý này sẽ đưa quý khách
                           đến với hành trình khám phá về 3 khu phố dân tộc: Khu phố Tàu - Tiểu Ấn và Kampong Glam. Qúy
                           khách sẽ được trải nghiệm cuộc sống địa phương, thông qua việc đi bộ trong khu vực cũng như
                           nếm thử các món ăn đường phố địa phương tại các trung tâm bán hàng rong được UNESCO công nhận
                           ở Khu Phố Tàu và Tiểu Ấn, và món tráng miệng ở Khu phố Mã Lai của Kampong Glam. Tại Khu phố
                           Tàu, quý khách sẽ tìm hiểu thêm về cuộc sống của những người nhập cư Trung Quốc đầu tiên đổ
                           xô đến đây với số lượng lớn do cộng đồng sôi động và cơ hội làm việc. Các doanh nhân, thương
                           nhân, thợ thủ công, người bán hàng rong đã tìm cách kiếm sống ở đây. Trong khi một số tìm
                           thấy thành công, nhiều người khác thấy mình không chống chọi được với những tệ nạn như thuốc
                           phiện, cờ bạc và mại dâm. Tàn dư của những ký ức này vẫn có thể được tìm thấy dọc theo các
                           con phố của Khu Phố Tàu và bạn sẽ có cơ hội sống lại cuộc sống của quá khứ trong thời đại
                           ngày nay.
                           <br />
                           <br />
                           <strong> Option 02:</strong> Một ngày tự do tham quan River Safari Singapore. Cách trung tâm
                           Singapore khoảng 20km, quý khách có thể bắt taxi để đi thẳng tới River Safari. Thời gian mở
                           cửa: từ 10.00am-7.00pm River Safari Singapore vừa là vườn thú, vừa là thủy cung có chủ đề
                           sông nước. Công viên tự nhiên mới nhất của Singapore với hơn 6,000 động vật, bao gồm hơn 40
                           loài động vật bị đe dọa. Với những khu tái lập môi trường sống của những con sông trên khắp
                           thế giới sẽ là trải nghiệm thú vị đối với gia đình có trẻ em.
                           <br />
                           <br />
                           <strong> Option 03:</strong> Một ngày tự do “Phá đảo” Sentosa. Cách trung tâm thành phố
                           Singapore khoảng 15 phút di chuyển. Qúy khách có thể di chuyển sang đảo Sentosa bằng tàu
                           điện, xe bus, cáp treo hoặc đi bộ. Sentosa là khu du lịch phức hơp đầy ấn tượng bởi sự kết
                           hợp giữa khu vui chơi giải trí như: Universals, Thủy cung S.E.A Aquarium, Mega Advanture Park
                           với trải nghiệp ziplines cực kì thú vị. Universal Studio Singapore: công viên giải trí mô
                           phỏng theo trường quay lớn của Hollywood. Với diện tích khoảng 20 hecta, khu giải trí bao gồm
                           các khu vui chơi hiện đại và các cảnh quay, tạo hình nhân vật nổi tiếng trong các bộ phim:
                           Công viên kỷ Jura, Thế giới phim hoạt hình Shrek, Madagascar, Ai cập huyền bí… (Hiện khu vui
                           chơi đóng cửa từ thứ 2 đến thứ 4 hàng tuần) Thời gian mở cửa: 10 giờ sáng đến 7 giờ tối
                           (trong các mùa không cao điểm) 10 giờ sáng đến 9 giờ tối (trong các mùa cao điểm) Thủy cung
                           SEA (S.E.A Aquarium) rất gần với Universal Studios Singapore, S.E.A là một trong những bể cá
                           lớn nhất thế giới với bộ sưu tập hơn 800 loại động vật biển. (Hiện khu vui chơi đóng cửa từ
                           thứ 4 đến thứ 6 hàng tuần)
                        </div>
                     </div>
                  </div>
                  <div className={cx('time-line-item')}>
                     <h3 style={{ color: 'red' }}>Lưu ý:</h3>
                     <div className={cx('excerpt')}>
                        <span className={cx('line')}></span>
                        <ul>
                           <li>
                              Việc điều chỉnh yêu cầu xét nghiệm covid và mũi tiêm có thể sẽ thay đổi theo quy định hiện
                              hành của Cơ quan Quản lý Nhà nước có thẩm quyền. Vui lòng liên hệ nhân viên tư vấn để biết
                              thêm chi tiết.
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   );
}

export default TravelingSchedule;
