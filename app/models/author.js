import Ember from "ember";
import DS from "ember-data";
const {attr, hasMany} = DS;
import Model from "ember-pouch/model";

export default Model.extend({
	posts: hasMany('post'),
	name: attr('string'),
	
	test: Ember.computed('posts.@each.name', function() {
		console.group();
		Ember.RSVP.resolve(this.get('posts')).then(posts => {
			posts.forEach(p => {
				console.log(p);
			});
		});
		console.groupEnd();
		return 'doingit';
	}),
});
