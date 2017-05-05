import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import Ember from 'ember';
//const { getOwner } = Ember;

const { assert, isEmpty, inject: { service } } = Ember;

export default Adapter.extend({
  init() {
    this._super(...arguments);
    
    let localDb = 'hasmany-flush';

	assert('emberPouch.localDb must be set', !isEmpty(localDb));
	
	let db = new PouchDB(localDb);

    this.set('db', db);
  },
  unloadedDocumentChanged: function(obj) {
    //var appController = getOwner(this).lookup("controller:application");
    //appController.send('kickSpin');
      
    let store = this.get('store');
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
    this.get('db').rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  },
});
