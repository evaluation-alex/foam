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
  name: 'WhenIdleDAO',
  package: 'foam.core.dao',
  extendsModel: 'ProxyDAO',
  help: 'Defers operations using Movement.whenIdle',

  methods: {
    select: function(sink, options) {
      var future = afuture();
      this.delay(0, function() {
        Movement.whenIdle(function() {
          this.delegate.select(sink, options)(future.set);
        }.bind(this))();
      }.bind(this))();
      return future.get;
    }
  }
});