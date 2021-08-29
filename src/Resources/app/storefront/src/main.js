import MacListingSearchPlugin from "./plugin/listing/listing-search.plugin";

const PluginManager = window.PluginManager;
PluginManager.register('MacListingSearchPlugin', MacListingSearchPlugin, '[data-mac-listing-search]');
