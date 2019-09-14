/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Carousel, Icon, Button, Row, Col, Tag, Radio } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

/**
 * 首页展示，以内容为主
 */

@connect(({ home, blog }) => ({
  carouselList: home.carouselList,
  blogList: blog.blogList
}))
class Home extends Component {

  state = {
    carouselIndex: 0,
    page:1,
    pageSize:10
  };

  componentDidMount() {
    const {page,pageSize}=this.state;
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'home/getCarouselList',
    //   payload: {},
    // });
    dispatch({
      type: 'blog/doGetList',
      payload: {
        page,
        pageSize
      
      },
    });

  }

  beforeCarouselChange = (from, to) => {
    this.setState({ carouselIndex: to });

    const aa =`${aa }`;
  }


  render() {
    const { carouselList, blogList = [] } = this.props;
    const { carouselIndex } = this.state;
    const currentCalousel = blogList[carouselIndex];

    const hotTags = ['css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios', 'css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios']
    return (
      <div className={styles.Home}>
        <div className={styles.carousel}>
          <Carousel autoplay beforeChange={this.beforeCarouselChange} dotPosition='left'>
            {
              blogList.map(item => {
                return (
                  <div style={{textAlign:'center'}} key={item.id}>
                    <img style={{maxWidth:'100%',maxHeight:420,margin:'0 auto'}} src={item.face || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567965131177&di=828101e60d553f2bcfe4aae901cf3b32&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FSlLKQng7FwONu4Gc7840dw%3D%3D%2F6631757159491304852.jpg'} alt="img" />
                  </div>
                );
              })
            }
          </Carousel>
          {
            currentCalousel &&
            <div className={styles.imgDes}>
              <a className={styles.desTab}>{currentCalousel.categoryId.name}</a>
              <h2 className={styles.desTitle}>
                <a href={`/page/main/blog/detail/${currentCalousel._id}`}>
                  {currentCalousel.title}
                </a>
              </h2>
              <div className={styles.acticleData}>
                <div><Icon type="user" />{currentCalousel.userId.username}</div>
                <div><Icon type="calendar" />{moment(currentCalousel.createTime).fromNow()}</div>
                <div><Icon type="eye" />{currentCalousel.read}</div>
              </div>
              <p className={styles.acticleDetail}>{currentCalousel.short}</p>
              <Button type="primary">阅读全文</Button>
            </div>
          }
        </div>

        <Row className={styles.content}>
          <Col span={17} className={styles.left}>
            <div className={styles.leftContent}>
              {
                blogList.map(item => {

                  return (
                    <div className={styles.artItem}>
                      <div className={styles.artInfo}>
                        <h6 className={styles.artTitle}><a href={`/page/main/blog/detail/${item._id}`}>{item.title}</a></h6>
                        <p className={styles.artShort}>{item.short}</p>
                        <div className={styles.btmInfo}>
                          <div className={styles.author}>
                            {
                              item.categoryId && // item.tags.map(ite => (
                              <Tag style={{ marginRight: 12 }}>{item.categoryId.name}</Tag>
                              // ))
                            }
                            作者：
                            {
                              item.userId &&
                              <a className={styles.name}>{item.userId.username}</a>
                            }

                          </div>
                          <div>{moment(item.createTime).fromNow()}</div>
                        </div>
                      </div>
                      {
                        item.face &&
                        <div className={styles.imgBorder}>
                          <img src={item.face} alt="img" />
                        </div>
                      }
                    </div>
                  );
                })
              }
            </div>
          </Col>
          <Col span={7} className={styles.right}>
            <div className={styles.rightContent}>
              <div className={styles.hotArt}>
                <h6 className={styles.title}><Icon style={{ marginRight: 6 }} type="fire" />热点</h6>
                <Radio.Group className={styles.dateRadio} defaultValue="a">
                  <Radio.Button value="a">7天</Radio.Button>
                  <Radio.Button value="b">1个月</Radio.Button>
                  <Radio.Button value="c">6个月</Radio.Button>
                </Radio.Group>
                {
                  carouselList.map((item, index) => {

                    return (
                      <div className={styles.hotItem}>
                        <span className={styles.num}>{index}</span>
                        <a className={styles.hotTitle}>{item.title}</a>
                      </div>
                    );
                  })
                }
              </div>
              {/* <div>热门文章</div> */}

              <div className={styles.hotTags}>
                <h6 className={styles.title}><Icon style={{ marginRight: 6 }} type="tags" />热门标签</h6>
                {
                  hotTags.map((item, index) => (<Tag key={index} className={styles.itemTag} color={`#${index % 10}c${index % 10}e${index % 10}b`}>{item}</Tag>))
                }
              </div>
              <div className={styles.hotConnect}>
                <h6 className={styles.title}><Icon style={{ marginRight: 6 }} type="heart" />联系方式</h6>
                <div className={styles.ways}>
                  <Icon className={styles.way} type='github' />
                  <Icon className={styles.way} type='dingding' />
                  <Icon className={styles.way} type='wechat' />
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Home;
