import React, { Component } from 'react';
import './App.css';
import TOC from './components/toc.js'
import ReadContent from './components/ReadContent.js'
import CreateContent from './components/CreateContent.js'
import UpdateContent from './components/UpdateContent.js'
import Subject from './components/subject.js'
import Control from './components/control.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'Word Wide Web!!!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for Information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  } 

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    console.log('App render');
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article =  <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article =  <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
        _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id++;
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var newContents = Array.from(this.state.contents);
        newContents.push({id: this.max_content_id, title: _title, desc: _desc});
        this.setState( {
          contents: newContents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
        _content = this.getReadContent();
        _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
          
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
          var newContents = Array.from(this.state.contents);
          var i = 0;
          while (i < newContents.length) {
            if (newContents[i].id === _id) {
              newContents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i++;
          }
          this.setState( {
            contents: newContents,
            mode: 'read'
          });
      }.bind(this)}></UpdateContent>
    } 

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}            
          onChangePage={function() {
            this.setState({
              mode:'welcome'
          });
          }.bind(this)}
          >
        </Subject>
        <TOC 
          onChangePage={ function(id) {
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode) {
          if (_mode === 'delete') {
            if(window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < this.state.contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);                  
                  break;
                }
                i++;                
              }
              this.setState({
                mode: 'welcome',
                contents:_contents
              });
              alert('deleted');
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
          this.setState({
            mode: _mode
          });
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
