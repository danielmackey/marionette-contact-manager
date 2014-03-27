ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

  Entities.Contact = Backbone.Model.extend({
    urlRoot: 'contacts'
  });

  Entities.configureStorage(Entities.Contact);

  Entities.ContactCollection = Backbone.Collection.extend({
    url: 'contacts',
    model: Entities.Contact,
    comparator: function(model) {
      return model.get('firstName') + model.get('lastName')
    }
  });


  Entities.configureStorage(Entities.ContactCollection);

  var initializeContacts = function(){
    console.log("seed the db");
    var contacts = new Entities.ContactCollection([
      { id: 4, firstName: 'Alice', lastName: 'Tandem', phoneNumber: '555-2222' },
      { id: 1, firstName: 'Alice', lastName: 'Arten', phoneNumber: '555-0184' },
      { id: 2, firstName: 'Bob', lastName: 'Brigham', phoneNumber: '555-0163' },
      { id: 3, firstName: 'Charlie', lastName: 'Campbell', phoneNumber: '555-0129' }
    ])

    contacts.forEach(function(contact){
      contact.save();
    });

    return contacts;
  };

  var API = {
    getContactEntities: function(){
      var contacts = new Entities.ContactCollection()
      contacts.fetch()
      if(contacts.length === 0){
        return initializeContacts();
      }
      return contacts;
    },

    getContactEntity: function(contactId) {
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
      setTimeout(function(){
        contact.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      }, 2000)
      return defer.promise();
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });

  ContactManager.reqres.setHandler("contact:entity", function(id){
    return API.getContactEntity(id);
  })
});