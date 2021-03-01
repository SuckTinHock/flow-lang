/// <reference path="../Scripts/jspack-vsdoc.js" />

var AbstractionLayer = MindFusion.AbstractionLayer;
var AnchorPattern = MindFusion.Diagramming.AnchorPattern;
var AnchorPoint = MindFusion.Diagramming.AnchorPoint;
var DiagramNode = MindFusion.Diagramming.DiagramNode;
var DiagramLink = MindFusion.Diagramming.DiagramLink;
var ContainerNode = MindFusion.Diagramming.ContainerNode;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var MarkStyle = MindFusion.Diagramming.MarkStyle;
var Style = MindFusion.Diagramming.Style;
var Theme = MindFusion.Diagramming.Theme;
var FontStyle = MindFusion.Drawing.FontStyle;
var Font = MindFusion.Drawing.Font;
var Alignment = MindFusion.Diagramming.Alignment;
var Behavior = MindFusion.Diagramming.Behavior;
var HandlesStyle = MindFusion.Diagramming.HandlesStyle;
var ChangeItemCommand = MindFusion.Diagramming.ChangeItemCommand;
var Events = MindFusion.Diagramming.Events;
var Diagram = MindFusion.Diagramming.Diagram;
var Overview = MindFusion.Diagramming.Overview;
var NodeListView = MindFusion.Diagramming.NodeListView;
var Rect = MindFusion.Drawing.Rect;
var Shape = MindFusion.Diagramming.Shape;
var DashStyle = MindFusion.Drawing.DashStyle;
var Point = MindFusion.Drawing.Point;


var diagram, nodeList;
var backgroundColor, linkDashStyle, baseShape, headShape, headBrush;

$(document).ready(function ()
{	
     backgroundColor = "#f2ebcf";
	 linkDashStyle = DashStyle.Solid; 
	 baseShape = null;
	 headShape = "Triangle";
	 headBrush = "#7F7F7F";

	// create a Diagram component that wraps the "diagram" canvas
	diagram = AbstractionLayer.createControl(Diagram, null, null, null, $("#diagram")[0]);
	diagram.setAllowInplaceEdit(true);
	diagram.setRouteLinks(true);
	diagram.setShowGrid(true);
	diagram.setUndoEnabled(true);
	diagram.setRoundedLinks(true);
	diagram.setBounds(new Rect(0, 0, 2000,2000));
	
	var theme = new Theme();
	var shapeNodeStyle = new Style();
	shapeNodeStyle.setBrush({ type: 'SolidBrush', color: '#f2ebcf' });
	shapeNodeStyle.setStroke("#7F7F7F");
	shapeNodeStyle.setTextColor("#585A5C");
	shapeNodeStyle.setFontName("Verdana");
	shapeNodeStyle.setFontSize(3);
	theme.styles["std:ShapeNode"] = shapeNodeStyle;
	var linkStyle = new Style();
	linkStyle.setStroke("#7F7F7F");
	linkStyle.setStrokeThickness(1.0);
	linkStyle.setTextColor("#585A5C");
	linkStyle.setFontName("Verdana");
	linkStyle.setFontSize(3);
	theme.styles["std:DiagramLink"] = linkStyle;
	diagram.setTheme(theme);	

	diagram.addEventListener(Events.nodeCreated, onNodeCreated);
	diagram.addEventListener(Events.linkCreated, onLinkCreated);

	
	// create an NodeListView component that wraps the "nodeList" canvas
	nodeList = AbstractionLayer.createControl(NodeListView, null, null, null, $('#nodeList')[0]);	
    
	 var node = new ShapeNode();	
	 node.setTransparent(true);
	 node.setText("Text");
	 node.setFont(new Font("Verdana", 12));
	 nodeList.addNode(node, "Text");
	 
	 node = new ShapeNode();
	 node.setShape('Decision');
	 node.setBrush({ type: 'SolidBrush', color: '#f2ebcf' });
	 nodeList.addNode(node, "Decision");
	 
	 node = new ShapeNode();
	 node.setShape('RoundRect');
	 node.setBrush({ type: 'SolidBrush', color: '#f2ebcf' });
	 nodeList.addNode(node, "Rounded Rect");
	 
	 node = new ShapeNode();
	 node.setShape('Circle');
	 node.setBrush({ type: 'SolidBrush', color: '#f2ebcf' });
	 nodeList.addNode(node, "Circle");
  	 
	 
	 node = new ContainerNode();
	 node.setCaptionBackBrush({ type: 'SolidBrush', color: '#f2ebcf' });
	 node.setBrush({ type: 'SolidBrush', color: '#ffffff' });
	 node.setRotationAngle (-90);
	 nodeList.addNode(node, "Container");	
		
	nodeList.addEventListener(Events.nodeSelected, onShapeSelected);

	onLoaded();
});

//sets the default node shape of the diagram to the selected one
function onShapeSelected(sender, e)
{
	var selectedNode = e.getNode();
	if (selectedNode)
		diagram.setDefaultShape(selectedNode.getShape());
}

//assign the selected color to the newly created node
function onNodeCreated(sender, args)
{
	var node = args.getNode();
	node.setBrush({ type: 'SolidBrush', color: backgroundColor });
	
	
	if( node instanceof ContainerNode )
	{
		node.setCaptionBackBrush({ type: 'SolidBrush', color: backgroundColor });
	    node.setBrush({ type: 'SolidBrush', color: '#ffffff' });
	}		
	
	
}

//create links with the selected style values
function onLinkCreated(sender, args)
{
	var link = args.getLink();
	link.setStrokeDashStyle (linkDashStyle);
	link.setHeadShape(headShape);
	link.setBaseShape(baseShape);
	link.setHeadShapeSize(3.0);
	link.setBaseShapeSize(3.0);
	link.setHeadBrush({ type: 'SolidBrush', color: headBrush });
	link.setBaseBrush({ type: 'SolidBrush', color: '#FFFFFF' });
	link.setTextAlignment(MindFusion.Diagramming.Alignment.Near);
}



function onSequence()
{
	var btnSrc = document.getElementById("sequence").src; 	
	linkDashStyle = DashStyle.Solid;
	headShape = "Triangle";
	baseShape = null;
	headBrush = "#7F7F7F";
	document.getElementById("sequence").src = "sequenceOn.png";
	document.getElementById("message").src = "messageOff.png";
	document.getElementById("association").src = "associationOff.png";
}

function onMessage()
{
	var btnSrc = document.getElementById("message").src; 
	linkDashStyle = DashStyle.Dash;
	headShape = "Triangle";
	baseShape = "Circle";
	headBrush = "white";
	document.getElementById("message").src = "messageOn.png";
	document.getElementById("sequence").src = "sequenceOff.png";
	document.getElementById("association").src = "associationOff.png";
		
}

function onAssociation()
{
	var btnSrc = document.getElementById("association").src; 
	linkDashStyle = DashStyle.Dash;
	headShape = null;
	baseShape = null;
	document.getElementById("association").src = "associationOn.png";
	document.getElementById("sequence").src = "sequenceOff.png";
	document.getElementById("message").src = "messageOff.png";
		
}

function updateBackground(event) {
   backgroundColor = event.target.value;
   var selectedItem = diagram.selection.items[0];
		if(selectedItem)
			selectedItem.setBrush({ type: 'SolidBrush', color: backgroundColor });  
}

function clearItems()
{
	diagram.clearAll();
}

function save()
{
	localStorage.setItem('bpmn', diagram.toJson());
}

function load()
{
	var bpmn = localStorage.getItem('bpmn');
	if(bpmn)
		diagram.fromJson(bpmn);
}





