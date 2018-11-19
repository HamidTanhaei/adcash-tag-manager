import ko from 'knockout';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import TagInput from './TagInput';
import './style/style.scss';


// get TagInput Reference
const TagInputRef = new TagInput('TagItems');
// start KO
ko.applyBindings(TagInputRef);

// reset input data in modal, after close
$('#tagEditor').on('hidden.bs.modal', function () {
    TagInputRef.updateTagsList()
});