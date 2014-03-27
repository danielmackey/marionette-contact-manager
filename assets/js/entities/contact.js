ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Contact = Backbone.Model.extend({});

  Entities.ContactCollection = Backbone.Collection.extend({
    model: Entities.Contact,
    comparator: function(model) {
      return model.get('firstName') + model.get('lastName')
    }
  });

  var contacts;

  var initializeContacts = function(){
    contacts = new Entities.ContactCollection([
      { id: 0, firstName: 'Alice', lastName: 'Tandem', phoneNumber: '555-0184' },
      { id: 1, firstName: 'Alice', lastName: 'Arten', phoneNumber: '555-0184' },
      { id: 2, firstName: 'Bob', lastName: 'Brigham', phoneNumber: '555-0163' },
      { id: 3, firstName: 'Charlie', lastName: 'Campbell', phoneNumber: '555-0129' }
    ])
  };

  var API = {
    getContactEntities: function(){
      if(contacts === undefined){
        initializeContacts()
      }
      return contacts;
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(){
    return API.getContactEntities();
  });
});