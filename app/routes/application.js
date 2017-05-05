import Ember from "ember";

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({posts: this.store.findAll('post'), authors: this.store.findAll('author')});
	},
	
	actions: {
		fill() {
			let author = null;
			if (this.currentModel.authors.get('length') == 0) {
				author = this.store.createRecord('author', {name: 'test author'});
				author = author.save();
			} else {
				author = Ember.RSVP.resolve(this.currentModel.authors.get('firstObject'));
			}
			
			author.then((a) => {
				console.log(a.get('id'));
				//TODO: maybe only one?
				this.store.createRecord('post', {name: 'test post1', author: a}).save();
				this.store.createRecord('post', {name: 'test post2', author: a}).save();
			});
		},
		dotest() {
			if (this.currentModel.posts.get('length') > 0)
				this.currentModel.posts.get('firstObject').destroyRecord();
		},
	},
});
