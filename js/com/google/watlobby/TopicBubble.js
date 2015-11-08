/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

CLASS({
  package: 'com.google.watlobby',
  name: 'TopicBubble',

  extends: 'com.google.watlobby.Bubble',

  requires: [
    'foam.graphics.Circle',
    'foam.graphics.ImageCView',
    'foam.graphics.ViewCView',
    'foam.ui.TextFieldView'
  ],

  imports: [ 'lobby' ],

  properties: [
    { name: 'topic' },
    { name: 'image' },
    { name: 'roundImage' },
    { name: 'zoom', defaultValue: 0 },
    {
      name: 'textArea',
      factory: function() {
        return this.ViewCView.create({innerView: this.TextFieldView.create({
          className: 'topic-bubble-text',
          mode: 'read-only',
          escapeHTML: false
//          data: 'foobar\nblah\nblah\nblah'
        })});
      }
    }
  ],

  methods: [
    function initCView() {
      this.SUPER();

      this.addChild(this.img = this.ImageCView.create({src: this.image}));
      this.addChild(this.textArea);
      this.textArea.innerView.data = '<font style="color:' + this.topic.color + ';"><b>' + ( this.topic.text || 'INSERT TEXT HERE' ) + '</b></font>';
      this.textArea.alpha = 0;
    },
    function setSelected(selected) {
      var self = this;
      if ( selected ) {
        this.oldMass_ = this.oldMass_ || this.mass;

        this.mass = this.INFINITE_MASS;
        this.vx = this.vy = 0;
        this.cancel_ = Movement.compile([
          [ 400, function() {
            var w = self.lobby.width;
            var h = self.lobby.height;
            self.x = w/2;
            self.y = h/2;
            self.zoom = 1;
            self.img.alpha = 0.15;
          }, Movement.easey ],
          [ 400, function() { self.textArea.alpha = 1; }]
        ])();
      } else {
        this.mass = this.oldMass_;
        Movement.compile([
          [
            [ 10, function() { self.textArea.alpha = 0; } ],
            [ 800, function() { self.img.alpha = 1; self.zoom = 0; } ]
          ],
          // This is needed for the rare case that the tab was hidden until
          // after the timeout and then CView aborts in paint() because width
          // and height are zero so layout doesn't get called and the textArea
          // isn't resized.
          function() { self.layout(); self.textArea.paintSelf(); },
        ])();
      }
    },
    function layout() {
      if ( ! this.img ) return;

      var c = this.canvas;
      var z = this.zoom;

      this.r = this.topic.r;

      if ( z ) {
        var w = this.lobby.width;
        var h = this.lobby.height;
        var r = Math.min(w, h)/3;

        this.r += (r - this.topic.r) * z;

        this.textArea.width = this.textArea.height = this.r*1.3;
        this.textArea.y = - this.textArea.height / 2;
        this.textArea.x = - this.textArea.width / 2;
      } else {
        this.textArea.alpha = 0;
        this.textArea.width = this.textArea.height = 0;
      }

      var r2 = this.roundImage ?
        this.r + 2 :
        Math.SQRT1_2 * this.r ;

      this.img.x      = -r2;
      this.img.y      = -r2;
      this.img.width  = 2 * r2;
      this.img.height = 2 * r2;
    },
    function paint() {
      this.layout();
      this.SUPER();
    },
    function paintBorder() { },
    function paintChildren() {
      var c = this.canvas;
      if ( this.roundImage ) {
        c.save();
        c.beginPath();
        c.arc(0, 0, this.r, 0, 2 * Math.PI, false);
        c.clip();
      }
      this.SUPER();
      if ( this.roundImage ) c.restore();
      foam.graphics.Circle.getPrototype().paintBorder.call(this);
    }
  ]
});
