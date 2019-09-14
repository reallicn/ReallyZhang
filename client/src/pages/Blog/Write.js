import React, { Component } from 'react';
import { Input, message } from 'antd';
import { connect } from 'dva';
import Editor from 'for-editor'
import styles from './Write.less';

/**
 * 写文章页
 */

@connect(({ blog }) => ({
  blog
}))
class Write extends Component {

  state = {
    content: ''
  }

  handleChange=(e)=>{
    this.setState({
      content:e
    });
  }

  handlePublish=(title)=>{
    const {content=''}=this.state;
    if(title.length<1){
      message.error('请输入文章标题');
    }
    if(content.length<1){
      message.error('请输入文章内容');
    }
    
    const {dispatch}=this.props;
    dispatch({
      type:'blog/doPublish',
      payload:{
        title,
        content,
        short:content.substr(0,100),
        face:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567965131177&di=828101e60d553f2bcfe4aae901cf3b32&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FSlLKQng7FwONu4Gc7840dw%3D%3D%2F6631757159491304852.jpg',
        categoryId:'5d748159ddd1fa142cb524c6' // 技术 , 生活 5d74816dddd1fa142cb524c7
      }
    });

  }

  render() {
   
    const { content } = this.state;

    return (
      <div className={styles.Write}>
        <Input.Search
            placeholder="输入文章标题"
            onSearch={this.handlePublish}
            enterButton="发表"
            style={{ width: "100%",height:56 }}
        />
        <Editor style={{border:'none',borderRadius:0,height:'calc(100% - 56px)'}} placeholder="开始愉快地创作吧..." value={content} onChange={this.handleChange} />
      </div>
    );
  }
}


export default Write;