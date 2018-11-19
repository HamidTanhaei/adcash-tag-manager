import ko from "knockout";

export default class TagInput{
    /**
     * @param {string} storageName
     */
    constructor(storageName){
        this.storageName = storageName;

        if(localStorage[this.storageName] && JSON.parse(localStorage[this.storageName]).length){
            this.items = ko.observableArray(JSON.parse(localStorage[this.storageName]));
        }else{
            this.items = ko.observableArray([]);
        }

        this.tagsList = ko.observable(this.items().join(','));
        this.itemToAdd = ko.observable("");
        this.remove = this.remove.bind(this);
        this.updateTagsList = this.updateTagsList.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editTags = this.editTags.bind(this);
    }

    /**
     * @param {number} val           number.
     */
    remove(val) {
        this.items.splice(this.items.indexOf(val), 1);
        this.updateTagsList();
    };

    updateTagsList() {
        this.tagsList(this.items().join(','));
        localStorage.setItem(this.storageName, JSON.stringify(this.items()));
    };

    /**
    * @param {number} value           number.
    */
    isNumber(value){
        if(!isNaN(value) && value !== '') return true;
        return false;
    };

    /**
     * @param {string} values
     * @return {array}
     */
    dataNormalizer(values){
        if(!values) throw "Input is not valid";
        let normalizedValues = values.replace(/;|\r?\n|\r/g, ",").split(',');
        const ret = [];
        for(let i=0; normalizedValues.length > i; i++){
            if(this.isNumber(normalizedValues[i]))
                ret.push(normalizedValues[i]);
        }
        return ret;
    };
    /**
     * @param {array} data1
     * @param {array} data2
     * @return {array}
     */

    mergeArrayDouplicatePreventer(data1, data2){
        if(!data1 || !data2) throw "Inputs are not valid";
        if(!Array.isArray(data1)) throw "First input expected to be an array";
        if(!Array.isArray(data2)) throw "Second input expected to be an array";
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