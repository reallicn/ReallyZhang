import React, { Component } from 'react';
import { Icon, Row, Col, Tag, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
/**
 * 首页展示，以内容为主
 */

@connect(({ blog }) => ({
  blogDetail: blog.blogDetail
}))
class Detail extends Component {

  state = {
    carouselIndex: 0
  }

  componentDidMount() {
    const { dispatch,params } = this.props;
    dispatch({
    	type: 'blog/getBlogById',
    	payload: {
        id:params.id
      },
    });

  }

  beforeCarouselChange = (from, to) => {
    console.log('tt', to);
    this.setState({ carouselIndex: to });
  }


  render() {
    const { carouselList } = this.props;
    const { carouselIndex } = this.state;
    const currentCalousel = carouselList[carouselIndex] || { tags: [''] };
    console.log('00', carouselList);

    const hotTags = ['css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios', 'css样式', 'HTMl', 'Node', 'React', 'js', 'Android', 'ios']
    return (
      <div className={styles.Home}>
        <Row className={styles.content}>
          <Col span={17} className={styles.left}>
            <div style={{ padding: '32px', minHeight: 700 }} className={styles.leftContent}>
              <h1>一份来自阿里巴巴和蚂蚁金服的前端学习资料包</h1>
              <p>今天，我想送你一份资料包。</p>
              <p><br /></p>
              <p>这份资料包，每个字都是来自<strong>阿里巴巴和蚂蚁金服的技术专家</strong>，大部分内容也有专业编辑进行校对和润色，<strong>在保障技术内核的同时保证可读性。</strong></p>
              <p><br /></p>
              <p>不论是来自<strong>蚂蚁金服的 Ant Design 实战教程</strong>，还是<strong>阿里巴巴闲鱼技术的 Flutter实战指南</strong>，还有<strong> Egg.js 团队的 Node.js 技术分享</strong>……从入门到精深，你都能找到想要的内容。</p>
              <p><br /></p>
              <p>话不多说，心动的朋友可以通过以下链接直接领取和查看资料：</p>
              <p><br /></p>
              <ul className="lake-list">
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" /><a href="https://www.yuque.com/ant-design/course" target="_blank">Ant Design 实战教程（beta 版） · 语雀</a></li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/xytech/flutter" target="_blank">Flutter · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/mo-college/beginner-tutorial" target="_blank">数据可视化入门教程（beta） · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/fe9/basic" target="_blank">前端九部 - 入门者手册2019 · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/egg/nodejs" target="_blank">Node.js 专栏 · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/huarou/gd4szw" target="_blank">SOFA 公开文章 · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/afx/blog" target="_blank">团队博客 · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/atian25/plantuml" target="_blank">PlantUML · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/itchina110/goodfe" target="_blank">前端精选 · 语雀</a>
                </li>
                <li className="lake-list-node lake-list-task"><input type="checkbox" checked="checked" />
                  <a href="https://www.yuque.com/awesome/fe_weekly" target="_blank">前端技术周刊 · 语雀</a>
                </li>
              </ul>
              <p><br /></p>
              <p>如果你还没心动，那……</p>
              <p><br /></p>
              <p>就先看一下这份资料包具体介绍吧！</p>
              <p><br /></p>
              <h1 id="c2a2322d">Ant Design 实战教程</h1>
              <p><br /></p>
              <p><strong>作者：Ant Design<span className="lake-card-label" style2="background-color: #DEE8FC; color: #061178;">蚂蚁金服</span></strong></p>
              <p><strong><br /></strong></p>
              <p>大概不需要向任何一个开发者介绍 Ant Design 了吧？毕竟这个项目在 GitHub 上的 star 数已经 40000+ 了。</p>
              <p><br /></p>
              <p><strong>《Ant Design 实战教程》</strong><strong>来自 Ant Design 开发团队，是 Ant Design 组件库的官方教程。</strong></p>
              <p><br /></p>
              <p>不管你是刚刚接触前端开发的新手，还是已经从事实际开发、希望尝试 React 技术栈的工程师，都是这份教程的目标读者。它从最简单的教起，让大家学会如何使用 Ant Design 组件库，然后逐渐深入，讲解如何开发一个包含多个复杂网页、用于实际生产的大型应用。</p>
              <p><br /></p>
              <p><strong>目录：</strong></p>
              <p><br /></p>
              <blockquote style2="padding-left: 1em;">
                <ul>
                  <li>前言</li>
                  <li><span style2="color: #666666;"><span style2="color: #595959;">第一章: 基础知识</span></span></li>
                  <li><span style2="color: #666666;">前端开发的演变</span></li>
                  <li><span style2="color: #666666;">初始化项目</span></li>
                  <li><span style2="color: #666666;">第一个组件</span></li>
                  <li><span style2="color: #666666;">使用 Ant Design 组件</span></li>
                  <li>……</li>
                </ul>
              </blockquote>
              <p><br /></p>
              <p><img width="784" alt="image.png" title="image.png" src="https://cdn.nlark.com/yuque/0/2019/png/215718/1559550099518-8f070fd4-0efc-43a6-a6d8-1a5bd3f7c342.png#align=left&amp;display=inline&amp;height=731&amp;name=image.png&amp;originHeight=1462&amp;originWidth=2216&amp;size=359311&amp;status=done&amp;width=1108" style2="max-width: 600px; width: 1108px;" /></p>
              <p><br /></p>
              <h1 id="Futter">Flutter</h1>
              <p><br /></p>
              <p><strong>作者：闲鱼技术</strong><span className="lake-card-label" style2="background-color: #FFF8BD; color: #614700;">阿里巴巴</span></p>
              <p><br /></p>
              <p>Flutter是 Google 下一代操作系统 Fuchsia 的 UI 框架，在保持原生性能的条件下实现了跨端编程，为未来的移动开发格局变革提供了巨大的机会和想象力。</p>
              <p><br /></p>
              <p><strong>阿里巴巴闲鱼技术部是国内首个将 Flutter 用于大型实践，并用在重要场景的应用。</strong></p>
              <p><br /></p>
              <p>另外，在今年三月，闲鱼宣布在GitHub上开源Fish Redux，Fish Redux是一个基于 Redux 数据管理的组装式 flutter 应用框架， 特别适用于构建中大型的复杂应用。</p>
              <p><br /></p>
              <p>这个来自闲鱼技术的知识库《Flutter》正是闲鱼技术在实际应用场景中对Flutter的实操建议和深入思考！</p>
              <p><br /></p>
              <p><strong>目录</strong></p>
              <p><strong><br /></strong></p>
              <blockquote style2="padding-left: 1em;">
                <ul>
                  <li><span style2="color: #000000;">一个优秀的可定制化Flutter相册组件，看这一篇就够了</span></li>
                  <li><span style2="color: #000000;">Flutter高内聚组件怎么做？阿里闲鱼打造开源高效方案！</span></li>
                  <li><span style2="color: #000000;">大侦探福老师——幽灵Crash谜踪案</span></li>
                  <li><span style2="color: #000000;">走近科学，探究阿里闲鱼团队通过数据提升Flutter体验的真相</span></li>
                  <li><span style2="color: #000000;">开发跨平台app推荐React Native还是flutter？</span></li>
                  <li><span style2="color: #000000;">……</span></li>
                </ul>
              </blockquote>
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