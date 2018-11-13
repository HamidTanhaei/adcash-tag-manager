import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style/style.scss';
import ko from 'knockout';
11
var SimpleListModel = function(items) {
  let tagsList = [];
this.items = ko.observableArray(items);
this.itemToAdd = ko.observable("");
this.remove = function(val){
this.items.splice(this.items.indexOf(val), 1)
}.bind(this);

this.isNumber = function(value){
if(!isNaN(value) && value !== '') return true;
return false; 
}.bind(this);

this.addItem = function() {
  let value = this.itemToAdd();
  let normalizedValue = value.replace(/;|\r?\n|\r/g, ",").split(',');
  for(let i=0; normalizedValue.length > i; i++){
    //filter for adding unique tags and numbers
    if(this.items().indexOf(normalizedValue[i])  === -1 && this.isNumber(normalizedValue[i])){
      this.items.push(normalizedValue[i]);
    }
  }
  this.itemToAdd("");
}.bind(this);
};

ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));