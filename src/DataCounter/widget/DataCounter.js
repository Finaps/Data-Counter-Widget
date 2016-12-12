/*global logger*/
/*
    DataCounter
    ========================
    @file      : DataCounter.js
    @version   : 1.0.0
    @author    : Tom Vranken
    @date      : 12/6/2016
    @copyright : Finaps 2016
    @license   : Apache 2
    Documentation
    ========================
    Describe your widget here.
*/
// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/text!DataCounter/widget/template/DataCounter.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, widgetTemplate) {
    "use strict";
    // Declare widget's prototype.
    return declare("DataCounter.widget.DataCounter", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,
        // DOM elements
        CountResult: null,
        // Parameters configured in the Modeler.
        RetrieveObject: "",
        Constraint: "",
        RefreshRate: "",
        mfToExecute: "",
       // backgroundColor: "",
        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _loop: null, 
        _refreshRate: null,
        
        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            logger.debug(this.id + ".constructor");
            this._handles = [];
        },
        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._setupEvents();
        },
        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
          clearInterval(this._loop);
        },
        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function (e) {
            logger.debug(this.id + "._stopBubblingEventOnMobile");
            if (typeof document.ontouchstart !== "undefined") {
                dojoEvent.stop(e);
            }
        },
        // Attach events to HTML dom elements
        _setupEvents: function (e) {
            logger.debug(this.id + "._setupEvents");
            this.connect(this.CountResult, "click", function (e) {
                // Only on mobile stop event bubbling!
                this._stopBubblingEventOnMobile(e);
						
                // If a microflow has been set execute the microflow on a click.
                if (this.mfToExecute !== "") {
                    mx.data.action({
                        params: {
                            applyto: "none",
                            actionname: this.mfToExecute
                        },
                        callback: function (obj) {
                            //TODO what to do when all is ok!
                        },
                        error: dojoLang.hitch(this, function (error) {
                            logger.error(this.id + ": An error occurred while executing microflow: " + error.description);
                        })
                    }, this);
                }
            });
                       // Count objects and return      
            this._ExecuteCount();
            this._refreshRate = this.RefreshRate>200 ? this.RefreshRate : 200;
            this._loop = setInterval(dojoLang.hitch(this,this._ExecuteCount),this._refreshRate);
        }, 
        
        _ExecuteCount: function () {
       		mx.data.get({ 
 			    xpath: "//"+this.RetrieveObject+this.Constraint,
 			    count: true,
                callback: dojoLang.hitch(this,function(ObjectList) {
                    dojoHtml.set(this.CountResult,ObjectList.length.toString());
    			})
            });
       	}
    });
});
require(["DataCounter/widget/DataCounter"]);