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
  package: 'foam.graphics.webgl',
  name: 'Rectangle',
  requires: [ 'foam.graphics.webgl.Shader' ],

  extendsModel: 'foam.graphics.webgl.GLView',

  properties: [
    {
      name: 'solidFillShader',
      lazyFactory: function() {
        return this.Shader.create({
            type:'fragment',
            source: "void main() {\n gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n }\n";
      }
    }
  ],

  methods: [

    function paintSelf() {
      var gl = this.gl;
      if ( ! gl ) return;



    }
  ]

});