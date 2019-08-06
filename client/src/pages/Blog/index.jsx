import React, { Component } from 'react';
import { Carousel, Icon, Button, Row, Col, Tag, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
/**
 * 首页展示，以内容为主
 */

@connect(({ home }) => ({
	carouselList: home.carouselList
}))
class Blog extends Component {

	state = {
		carouselIndex: 0
	}

	componentDidMount() {
		const { dispatch } = this.props;
		// dispatch({
		// 	type: 'home/getCarouselList',
		// 	payload: {},
		// });

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
        
        const hotTags=['css样式','HTMl','Node','React','js','Android','ios','css样式','HTMl','Node','React','js','Android','ios']
		return (
			<div className={styles.Home}>
				{/* <div className={styles.carousel}>
					<Carousel autoplay beforeChange={this.beforeCarouselChange} dotPosition='left'>
						{
							carouselList.map(item => {

								return (<div key={item.id}>
									<img width='100%' src={item.img} />
								</div>);
							})
						}
					</Carousel>
					<div className={styles.imgDes}>
						<a className={styles.desTab}>{currentCalousel.tags[0]}</a>
						<h2 className={styles.desTitle}><a>{currentCalousel.title}</a></h2>
						<div className={styles.acticleData}>
							<div><Icon type="user" />{currentCalousel.author}</div>
							<div><Icon type="calendar" />{currentCalousel.createTime}</div>
							<div><Icon type="eye" />{currentCalousel.eyes}</div>
						</div>
						<p className={styles.acticleDetail}>{currentCalousel.short}</p>
						<Button type="primary">阅读全文</Button>
					</div>
				</div> */}

				<Row className={styles.content}>
					<Col span={17} className={styles.left}>
						<div className={styles.leftContent}>
						{
							carouselList.map(item => {

								return (
									<div className={styles.artItem}>
										<div className={styles.artInfo}>
											<h6 className={styles.artTitle}><a>{item.title}</a></h6>
											<p className={styles.artShort}>{item.short}</p>
											<div className={styles.author}>作者：<a className={styles.name}>{item.author}</a></div>
											<div className={styles.tagTime}>
												<div>
													{
														item.tags.map(ite => (
															<Tag>{ite}</Tag>
														))
													}
												</div>
												<div>{item.createTime}</div>
											</div>
										</div>
										<div className={styles.imgBorder}>
											<img src={item.img} />
										</div>
									</div>
								);
							})
						}
						</div>
					</Col>
					<Col span={7} className={styles.right}>
						<div className={styles.rightContent}>
							<div className={styles.hotArt}>
								<h6 className={styles.title}><Icon style={{marginRight:6}} type="fire"/>热点</h6>
								<Radio.Group className={styles.dateRadio} defaultValue="a">
									<Radio.Button value="a">7天</Radio.Button>
									<Radio.Button value="b">1个月</Radio.Button>
									<Radio.Button value="c">6个月</Radio.Button>
								</Radio.Group>
                                {
                                    carouselList.map((item,index)=>{

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
                            <h6 className={styles.title}><Icon style={{marginRight:6}} type="tags"/>热门标签</h6>
                                {
                                    hotTags.map((item,index)=>(<Tag key={index} className={styles.itemTag} color={`#${index%10}c${index%10}e${index%10}b`}>{item}</Tag>))
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


export default Blog;