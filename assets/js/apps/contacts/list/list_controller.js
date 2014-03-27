ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request('contact:entities');

      $.when(fetchingContacts).done(function(contacts){
        var contactsListView = new List.Contacts({
          collection: contacts
        });

        contactsListView.on("itemview:contact:delete", function(childView, model){
          model.destroy();
        });

        contactsListView.on("itemview:contact:highlight", function(childView, model){
          console.log("Highlighting toggled on model: ", model);
        });

        contactsListView.on("itemview:contact:show", function(childView, model){
          ContactManager.trigger("contact:show", model.get('id'))
        });

        contactsListView.on("itemview:contact:edit", function(childView, model){
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model
          });

          view.on("show", function(){
            this.$el.dialog({
              modal: true,
              width: "auto"
            })
          });

          ContactManager.dialogRegion.show(view);
        })

        ContactManager.mainRegion.show(contactsListView);
      });
    }
  }
});