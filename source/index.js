import ko from 'knockout';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import './style/style.scss';

class TagInput{
  constructor(items){
    this.items = ko.observableArray(items);
    this.tagsList = ko.observable(this.items().join(','));
    this.itemToAdd = ko.observable("");
    this.remove = this.remove.bind(this);
    this.updateTagsList = this.updateTagsList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editTags = this.editTags.bind(this);
  }

  remove(val) {
      this.items.splice(this.items.indexOf(val), 1);
      this.updateTagsList();
  };

  updateTagsList() {
      this.tagsList(this.items().join(','));
  };

  isNumber(value){
      if(!isNaN(value) && value !== '') return true;
      return false;
  };

  dataNormalizer(values){
      let normalizedValues = values.replace(/;|\r?\n|\r/g, ",").split(',');
      const ret = [];
      for(let i=0; normalizedValues.length > i; i++){
          if(this.isNumber(normalizedValues[i]))
              ret.push(normalizedValues[i]);
      }
      return ret;
  };

  mergeArrayDouplicatePreventer(data1, data2){
      return [...new Set(data1.concat(data2))]
  };

  addItem() {
      let value = this.itemToAdd();
      let normalizedValues = this.dataNormalizer(value);
      let MergedCleanedData = this.mergeArrayDouplicatePreventer(this.items(), normalizedValues)
      this.items(MergedCleanedData);
      this.itemToAdd("");
      this.updateTagsList();
  }

  editTags() {
      const newValues = this.dataNormalizer(this.tagsList());
      let MergedCleanedData = [...new Set(newValues)]
      this.items(MergedCleanedData);
  };
}

let TagInputRef = new TagInput(["1", "2", "3"])
ko.applyBindings(TagInputRef);


$('#tagEditor').on('hidden.bs.modal', function () {
    //update tags in modal's input
    TagInputRef.updateTagsList()
})