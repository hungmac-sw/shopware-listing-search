import FilterBasePlugin from 'src/plugin/listing/filter-base.plugin';
import Debouncer from 'src/helper/debouncer.helper';
import DomAccess from 'src/helper/dom-access.helper';
import deepmerge from 'deepmerge';

export default class MacListingSearchPlugin extends FilterBasePlugin {

    static options = deepmerge(FilterBasePlugin.options, {
        keywords: null,
        searchListingInputFieldSelector: 'input[type=search]',
        searchListingDelay: 250,
        searchListingMinChars: 3,
    });

    init() {
        this._inputField = DomAccess.querySelector(this.el, this.options.searchListingInputFieldSelector);

        this._registerEvents();
    }

    /**
     * @private
     */
    _registerEvents() {
        this._inputField.addEventListener(
            'input',
            Debouncer.debounce(this._handleInputEvent.bind(this), this.options.searchListingDelay),
            {
                capture: true,
                passive: true,
            },
        );
    }

    /**
     * Fire the XHR request if user inputs a search term
     * @private
     */
    _handleInputEvent() {
        const value = this._inputField.value.trim();

        // stop search if minimum input value length has not been reached
        if (value.length === 0 || value.length >= this.options.searchListingMinChars) {
            this.options.keywords = value;
            this.listing.changeListing();
        }
    }


    /**
     * @public
     */
    reset() {
    }

    /**
     * @public
     */
    resetAll() {
    }

    /**
     * @return {Object}
     * @public
     */
    getValues() {
        console.log('vao get value');
        if (this.options.keywords === null) {
            return { search: '' };
        }

        return {
            search: this.options.keywords,
        };
    }

    /**
     * @return {Array}
     * @public
     */
    getLabels() {
        return [];
    }

    afterContentChange() {
        this.listing.deregisterFilter(this);
    }
}
