/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

CLASS({
  package: 'com.google.ymp',
  name: 'Market',
  extends: 'com.google.ymp.GuidIDBase',
  traits: [ 'foam.core.dao.SyncTrait' ],

  properties: [
    {
      type: 'String',
      name: 'name',
    },
    {
      name: 'location',
    },
    {
      type: 'Reference',
      name: 'image',
      subType: 'com.google.ymp.DynamicImage',
      subKey: 'imageID',
    },
  ],
});
