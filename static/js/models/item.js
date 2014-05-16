App.Item = DS.Model.extend({
    title: DS.attr('string'),
    due: DS.attr('date'),
    isCompleted: DS.attr('boolean')
});

// sample data
App.Item.FIXTURES = [
 {
     id: 1,
     title: 'Learn Ember.js',
     due: '2013-02-07T16:44:57.000Z',
     isCompleted: true
 },
 {
     id: 2,
     title: 'Write an application',
     due: '2013-02-07T16:44:57.000Z',
     isCompleted: false
 },
 {
     id: 3,
     title: 'Profit!',
     due: '2013-02-07T16:44:57.000Z',
     isCompleted: false
 }
];