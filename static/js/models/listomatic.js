Listomatic.item = DS.Model.extend({
    title: DS.attr('string'),
    due: DS.attr('date'),
    isCompleted: DS.attr('boolean')
});
