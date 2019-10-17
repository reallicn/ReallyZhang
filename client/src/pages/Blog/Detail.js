import React, { Component } from 'react';
import { Icon, Row, Col, Tag, Radio } from 'antd';
import { connect } from 'dva';
import { Button } from 'antd/lib/radio';
import moment from 'moment';
import Markdown from 'react-markdown';
import styles from './Detail.less';
/**
 * 首页展示，以内容为主
 */

@connect(({ blog }) => ({
  blogDetail: blog.blogDetail,
  carouselList: blog.carouselList
}))
class Detail extends Component {


  componentDidMount() {
    const { dispatch, match: { params } } = this.props;
    dispatch({
      type: 'blog/doGetBlogById',
      payload: {
        id: params.id
      },
    });
  }


  render() {
    const { blogDetail = { userId: {}, catgoryId: {} }, carouselList } = this.props;

    const hotTags = ['css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios', 'css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios']
    return (
      <div className={styles.Detail}>
        <Row className={styles.content}>
          <Col span={17} className={styles.left}>
            <div style={{ padding: '32px', minHeight: 700 }} className={styles.leftContent}>
              <div className={styles.userInfo}>
                {
                  blogDetail.userId &&
                  <div className={styles.left}>
                    <img alt="" src={blogDetail.userId.avatar} />
                    <div className={styles.nickTime}>
                      <div className={styles.nick}>{blogDetail.userId.username}</div>
                      <div className={styles.time}>
                        {moment(blogDetail.createTime).format('YYYY-MM-DD HH:mm')}
                        <span className={styles.read}>已读 {blogDetail.read}</span>
                      </div>
                    </div>
                  </div>
                }
                <Button>关注</Button>
              </div>
              <h1 className={styles.title}>{blogDetail.title}</h1>
              <div className={styles.blogContent}>
                <Markdown source={blogDetail.content} />
              </div>

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
                  carouselList && carouselList.map((item, index) => {

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
              {/* <div className={styles.hotConnect}>
                                <h6 className={styles.title}><Icon style={{marginRight:6}} type="heart"/>联系方式</h6>
                                <div className={styles.ways}>
                                    <Icon className={styles.way} type='github'/>
                                    <Icon className={styles.way} type='dingding'/>
                                    <Icon className={styles.way} type='wechat'/>
                                </div>
                            </div> */}

            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Detail;