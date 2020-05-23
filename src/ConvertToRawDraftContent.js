//this script renders the text editer component as well as exporting the editer's html for use in endex.js

import React, { Component } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class ConvertToRawDraftContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentDidMount() {
    const html = this.getHardcodedHtml();
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  getHardcodedHtml() {
    const html = `<p></p>`;
    return html;
  }

  onEditorStateChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    //get output from the textediter as html code
    const htmldata = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //set the public variable
    window.$htmlcode = htmldata;
    return (
      <div className="rdw-storybook-root">
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
        />

        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          style={{ width: "99%" }}
        /> */}
      </div>
    );
  }
}

export default ConvertToRawDraftContent;
