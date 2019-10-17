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
        face:'https://static001.infoq.cn/resource/image/7b/ef/7b369061e70df3e377203ef7ebd535ef.jpg?x-oss-process=image/crop,x_30,w_1187,h_880/resize,w_420,h_312',
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