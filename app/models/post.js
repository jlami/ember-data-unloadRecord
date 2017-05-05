import Ember from "ember";
import DS from "ember-data";
const {attr, belongsTo} = DS;
import Model from "ember-pouch/model";

export default Model.extend({
	author: belongsTo('author'),
	name: attr('string'),
});
