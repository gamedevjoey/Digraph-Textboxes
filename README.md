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
