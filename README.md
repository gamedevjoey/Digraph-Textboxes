This is a fork of React-Digraph by uber: https://github.com/uber/react-digraph

DESCRIPTION:

This app builds on the React-Digraph framework by adding a new type of node called a "textbox". A textbox can tontain complex text data including bold text, italics, custom font sizes, colors, emojis and even images. A textbox contains text information stored in its title as html code which is run with the node. To create a textbox the user uses a user friendly text editer for creating complex text data. The text editer can be toggled on and off from top of the screen for better visibility. Forthermore, the textbox node is a custom type node which is fully intrigated into the Digraph framework. All textbox nodes can be moved, and delated as part of the graph, and all textbox nodes and their html data is stored in the graph. A textbox can be stored in a node array with no additinal props as all the text data is stored inside "title".

FEATURES:

Textbox's can be constructed out of the following:

Text:
bold
italics
underline
strikethough
monospace
Superscript
subscript

Text types:
normal
headings
blockqoute
code
bullet points
ordered

Options:

fontsize
font
color
allignment
highlight color
hyperlink
emojis
image links

DEPENDENCIES:

React-Digraph:

react
react-digraph
react-dom
react-model
react-scripts

Textbox:

draft-js
draft-js-to-html
html-to-draft-js
react-draft-wysiwyg (this has the text editer)

Migration Instructions:

There isent alot of code as most of the code is in the dependencies but I have made a list of the code changes that need to be made to migrate textboxes into the react-degraph example project.

1.make sure you have all the proper dependancys and their correct versians. (If your not sure check "package.json" for version deteils)

2.  create a new script in /scr name it too "ConvertToRawDraftContent.js" and paste the contents in from this project.

3.create a new node type inside "config.js":

-----CODE (NOT IN ORDER PLACE AS SEEN IN THE PROJECT):

export const TEXTBOX_TYPE = "textbox";

const TextboxShape = (
<symbol viewBox="0 0 88 72" id="poly" width="88" height="88">
<path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
</symbol>
);

    textbox: {
      shape: TextboxShape,
      //set shape to empty edge so that there is no backround for the textbox node
      shapeId: "#emptyEdge",
      // set title to black only the node's contents will hond anything
      typeText: ""
    }

---

make sure to add "TEXTBOX_TYPE" to the nodetypes array as well.

3. setup index.js:

------in the import section paste in the following

import ConvertToRawDraftContent from "./ConvertToRawDraftContent";

var textboxEditerVisible = true;

//htmlcode from textedier
window.\$htmlcode = "<p>textbox</p>";

---

also make sure to add "TEXTBOX_TYPE" to the list of nodes at teh beginning.

4. modify render function:

You can render the text editer and other buttons however you like but this is how I have it setup: textbox button renders at the top of the screen and text editer and create textbox button renders directly below it toggled by the "textboxEditerVisible" variable.

----CODE (For render function)

        <button onClick={this.toggleTextEditer}>textbox</button>
        {textboxEditerVisible && <ConvertToRawDraftContent />}
        {textboxEditerVisible && (
          <button onClick={this.onCreateTextbox}>Create Textbox</button>
        )}

---

also add set rendernodetext in graph view to "this.renderNodeText"

5. Adding custom functions:

add the following functions into the graph class in index.js:

-----code

onCreateTextbox = (x, y) => {
const graph = this.state.graph;
console.log("ADD TEXTBOX");
//make sure to add textbox_type to config.js
const type = TEXTBOX_TYPE;
//sets the node title to html export from text editer
var titletext = window.\$htmlcode;
//if nothing has been put into the text editer set it to say "textbox"
if (titletext === "<p></p>") {
titletext = "<p>textbox</p>";
console.log("set to default");
}
console.log(titletext);
//title: this.\_name.value is text from input bar at the top
const viewNode = {
id: Date.now(),
title: titletext,
type: TEXTBOX_TYPE,
x,
y
};

    graph.nodes = [...graph.nodes, viewNode];
    this.setState({ graph });

};

renderNodeText(data, nodeTypes, isSelected, maxTitleChars) {
//if rendering a textbox run custom code
if (data.type === "textbox") {
//run the nodes title as html code
return (
<foreignObject
          x="-30"
          y="-30"
          width="500"
          height="1"
          overflow="visible"
        >

<div className="node">
<div dangerouslySetInnerHTML={{ __html: data.title }} />
</div>
</foreignObject>
);
} else {
//if not run the default render node text
var typeText = "null";
//set type text if it has one
if (data.type !== null) {
var typeText = nodeConfig.NodeTypes[data.type].typeText;
}
return (
<text className={data.className} textAnchor="middle">
{<tspan opacity="0.5">{typeText}</tspan>}
{data.title && (
<tspan x={0} dy={18} fontSize="10px">
{data.title.length > maxTitleChars
? data.title.substr(0, maxTitleChars)
: data.title}
</tspan>
)}
{data.title && <title>{data.title}</title>}
</text>
);
}
}

toggleTextEditer = () => {
if (textboxEditerVisible) {
textboxEditerVisible = false;
this.forceUpdate();
} else {
textboxEditerVisible = true;
this.forceUpdate();
}
};

---

INPORTANT NOTE ABOUT RENDERNODETEXT(): using this rendernodetextfunction will override react-digraph's original text rendering function. This function will use custom rendering on the textbox node's and render other nodes as the defualt. If you have your own rendernodetext function paste the return into the else statement.

SAVING GRAPHS: textbox nodes are stored in the same format as other node types in the nodes array. The html code for the text is stored in its title. So a textbox node would look like this:

    {
      id: "a8",
      title: "<p>This is a custom textbox with html code inside it</p>",
      type: TEXTBOX_TYPE,
      x: 0,
      y: 300
    }
