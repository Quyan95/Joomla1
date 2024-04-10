var TF_Templates_Library_Filters=function(){function e(e){this.instance=e,this.filtersPillsClass=".tf-library-selected-filters-pills",this.filterItemClass=".tf-library-filter-item",this.initEvents()}var t=e.prototype;return t.initEvents=function(){document.addEventListener("click",function(e){this.initFilterItemToggle(e),this.onClearAllFilters(e),this.onRemoveFilterPillItem(e)}.bind(this)),document.addEventListener("change",function(e){this.onFilterItemSelect(e)}.bind(this))},t.initFilterItemToggle=function(e){var t=e.target.closest(".tf-library-filter-item-label");t&&(e.preventDefault(),t.closest(this.filterItemClass).classList.toggle("open"))},t.onFilterItemSelect=function(e){e.target.closest(".tf-library-filter-choice-item-checkbox")&&this.update()},t.update=function(){var e=this.instance.filters_sidebar.querySelectorAll(".tf-library-filter-item"),o=[];e.forEach(function(t){var e=t.querySelectorAll('input[type="checkbox"]:checked');o[t.dataset.type]=[],e.forEach(function(e){o[t.dataset.type].push(e.value)})});var l=Object.values(o).every(function(e){return 0===e.length});l?(this.setNoFilters(),o=[]):this.setHasFilters(),o&&this.instance.items.getCurrentItems().forEach(function(e){var t=e.dataset.filterCategory,i=e.dataset.filterSolution,r=e.dataset.filterGoal,s=e.dataset.filterCompatibility,a=e.dataset.filterTags,n=!!l;for(key in o)if(0!==o[key].length){if("category"===key&&(""===t&&(n=!1),!(n=o[key].includes(t)||t.includes(o[key]))))break;if("solution"===key&&(""===i&&(n=!1),!(n=o[key].includes(i))))break;if("goal"===key&&(""===r&&(n=!1),!(n=o[key].includes(r))))break;if("compatibility"===key&&(""===s&&(n=!1),!(n=o[key].includes(s))))break;if("tags"===key){for(tag in""===a&&(n=!1),o[key]){if(-1!==a.indexOf(o[key][tag])){n=!0;break}n=!1}if(!n)break}}n?e.classList.remove("is-hidden"):e.classList.add("is-hidden")}),this.instance.search.search(),this.instance.sorting.sort()},t.onUpdateSearchElements=function(){var i=this;this.emptyFilterPills();var r=this.getFilterPillsWrapper();this.instance.filters_sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(e){var t=i.instance.library_wrapper.querySelector(".tf-library-filter-template").cloneNode(!0);t.querySelector(".filter").dataset.filter=e.value,t.querySelector(".filter .filter-label").innerHTML=e.value,r.appendChild(t.children[0])})},t.emptyFilterPills=function(){this.getFilterPillsWrapper().innerHTML=""},t.getFilterPillsWrapper=function(){return this.instance.library_wrapper.querySelector(this.filtersPillsClass)},t.onClearAllFilters=function(e){e.target.closest(".tf-library-filters-clear-all")&&(e.preventDefault(),this.instance.library_toolbar.querySelector(".tf-library-search input").value="",this.instance.filters_sidebar.querySelectorAll('input[type="checkbox"]:checked').forEach(function(e){e.checked=!1}),this.update())},t.onRemoveFilterPillItem=function(e){var t=e.target.closest(".tf-library-filter-pill-item-remove");if(t){e.preventDefault();var i=t.closest(".filter").dataset.filter;this.instance.filters_sidebar.querySelectorAll('input[type="checkbox"][value="'+i+'"]:checked').forEach(function(e){e.checked=!1}),this.update()}},t.setHasFilters=function(){this.instance.library_wrapper.classList.add("has-filters")},t.setNoFilters=function(){this.instance.library_wrapper.classList.remove("has-filters")},e}(),TF_Templates_Info_Modal=function(){function e(e){this.instance=e,this.modal=document.querySelector("#tf-library-item-info-popup"),this.initEvents()}var t=e.prototype;return t.initEvents=function(){document.addEventListener("click",function(e){this.onBeforeOpen(e)}.bind(this))},t.onBeforeOpen=function(e){var i=this,t=e.target.closest('[data-bs-target="#tf-library-item-info-popup"]'),r=e.target.closest(".tf-library-template-item-info-popup-trigger");if(t||r){var s=t||(r||!1);if(s){r&&(e.preventDefault(),jQuery(this.modal).modal("show"));var a=this.instance.getTemplateItem(s),n=a.querySelector(".info-popup-actions"),o=this.modal.querySelector(".dependency-items");o.innerHTML="";var l=JSON.parse(a.dataset.capabilities);this.modal.querySelector(".modal-header > h3").innerHTML=a.querySelector(".template-label").innerHTML,this.modal.querySelector(".item-description").innerHTML=a.dataset.note,this.modal.querySelector(".template-details").querySelector(".category > .content").innerHTML=l.category.value||"-",this.modal.querySelector(".template-details").querySelector(".solution > .content").innerHTML=l.solution.value||"-",this.modal.querySelector(".template-details").querySelector(".goal > .content").innerHTML=l.goal.value||"-";var c=this.modal.querySelector(".dependency-item.template").cloneNode(!0);c.classList.remove("template"),c.querySelector(".requirement").innerHTML=this.instance.getOption("project_name")+" "+("pro"===l.pro.requirement?this.instance.getOption("pro"):this.instance.getOption("lite")),c.querySelector(".detected").innerHTML=this.instance.getOption("project_name")+" "+this.instance.getOption(l.pro.detected),"pro"===l.pro.requirement&&"pro"!==l.pro.detected?c.querySelector(".value").appendChild(n.querySelector("a.pro").cloneNode(!0)):c.classList.add("pass"),o.appendChild(c),(c=this.modal.querySelector(".dependency-item.template").cloneNode(!0)).classList.remove("template"),c.querySelector(".requirement").innerHTML="Joomla! "+l.joomla.value+"+",c.querySelector(".detected").innerHTML="Joomla! "+l.joomla.detected,""!==l.joomla.icon?c.querySelector(".value").appendChild(n.querySelector("a.joomla").cloneNode(!0)):c.classList.add("pass"),o.appendChild(c),(c=this.modal.querySelector(".dependency-item.template").cloneNode(!0)).classList.remove("template"),c.querySelector(".requirement").innerHTML=this.instance.getOption("project_name")+" "+l.project.value+"+",c.querySelector(".detected").innerHTML=this.instance.getOption("project_name")+" "+l.project.detected,""!==l.project.icon?(c.querySelector(".value").appendChild(n.querySelector("a.project").cloneNode(!0)),c.querySelector(".value a .short-label").innerHTML=this.instance.getOption("update_extension")):c.classList.add("pass"),o.appendChild(c),l.third_party_dependencies.value&&l.third_party_dependencies.value.forEach(function(e,t){(c=i.modal.querySelector(".dependency-item.template").cloneNode(!0)).classList.remove("template"),c.querySelector(".requirement").innerHTML=e.name+" "+e.version+"+",c.querySelector(".detected").innerHTML="none"===e.detected?"-":e.name+" "+e.detected,e.valid?c.classList.add("pass"):(c.querySelector(".value").appendChild(n.querySelector("a.third_party_dependencies_"+t).cloneNode(!0)),c.querySelector(".value a .short-label").innerHTML="update"===e.icon?i.instance.getOption("update_extension"):i.instance.getOption("install_extension")),o.appendChild(c)}),""!==l.license_error.value&&((c=this.modal.querySelector(".dependency-item.template").cloneNode(!0)).classList.remove("template"),c.querySelector(".requirement").innerHTML=this.instance.getOption("license_key"),c.querySelector(".detected").innerHTML="missing"===l.license_error.value?"-":this.instance.getOption("license"),c.querySelector(".value").appendChild(n.querySelector("a.license").cloneNode(!0)),o.appendChild(c))}}},e}(),TF_Templates_Library_Items=function(){function e(e){this.instance=e,this.initEvents()}var t=e.prototype;return t.initEvents=function(){document.addEventListener("click",function(e){this.onCloseItemMessage(e),this.onFavorite(e),this.onInsert(e)}.bind(this))},t.onCloseItemMessage=function(e){var t=e.target.closest(".fpf-library-messages-hide-btn");t&&t.closest(".tf-template-item-message").classList.add("is-hidden")},t.onFavorite=function(e){var r=e.target.closest(".tf-library-favorite-item");if(r){e.preventDefault(),r.classList.add("working");var s=e.target.closest(".tf-library-item").dataset.id,a=this;this.instance.ajaxCall("favorites_toggle",{template_id:s},function(e){var t=Object.keys(e).includes(s),i=document.querySelector(".tf-library-item[data-id='"+s+"'] .tf-library-favorite-item");r.classList.remove("working"),t?i.classList.add("active"):(i.classList.remove("active"),a.instance.filters.update())})}},t.onInsert=function(e){var t=e.target.closest(".tf-library-item-insert-btn");if(t){var i=t.dataset.templateId;if(i){e.preventDefault();var r=t.closest(".tf-library-item");document.body.classList.add("tf-templates-library-inserting"),r&&r.classList.add("inserting-template"),this.instance.hideMessageAlert(),t.classList.add("working");var s=this;this.instance.ajaxCall("insert_template",{template_id:i},function(e){e.error?s.instance.previewModal.classList.contains("fade")&&(s.instance.previewModal.classList.contains("in")||s.instance.previewModal.classList.contains("show"))?(s.instance.showMessageAlert(e.message),s.instance.modal.querySelector(".tf-library-body").scrollTo({top:0,behavior:"smooth"}),jQuery(s.instance.previewModal).modal("hide")):s.instance.showTemplateMessage(r,e.message):window.location.href=e.redirect,document.body.classList.remove("tf-templates-library-inserting"),r&&r.classList.remove("inserting-template"),t.classList.remove("working")})}}},t.getCurrentItems=function(e){void 0===e&&(e=!1);var t=".tf-library-list > .tf-library-item:not(.blank_popup):not(.ignore)";return e&&(t+=":not(.is-hidden)"),this.instance.library_wrapper.querySelectorAll(t)},e}(),TF_Templates_Library=function(){function e(){this.observer=null,this.ready=!1,this.JoomlaOptions=null,this.onReady()}var t=e.prototype;return t.onReady=function(){if(window.MutationObserver){var t=this;this.observer=new MutationObserver(function(e){if(e)for(m in e){if(t.ready)return;e[m].target.closest(".tf-templates-library")&&(t.init(),t.ready=!0)}}),this.observer.observe(document.body,{childList:!0,subtree:!0,attributes:!0})}},t.init=function(){this.observer.disconnect(),this.modal=document.querySelector(".tf-templates-library"),this.isJ4=this.modal.classList.contains("isJ4"),this.library_wrapper=document.querySelector(".tf-library-page"),this.library_noresults=document.querySelector(".tf-library-no-results"),this.library_list=document.querySelector(".tf-library-list"),this.library_toolbar=this.library_wrapper.querySelector(".tf-library-toolbar"),this.library_messages=this.library_wrapper.querySelector(".tf-library-messages"),this.sidebar_element=this.library_wrapper.querySelector(".tf-library-sidebar"),this.filters_sidebar=this.sidebar_element.querySelector(".tf-library-sidebar-filters"),this.previewModal=document.querySelector(".tf-templates-library-popup-preview"),this.modals=new TF_Templates_Library_Modals(this),this.items=new TF_Templates_Library_Items(this),this.toolbar=new TF_Templates_Library_Toolbar(this),this.filters=new TF_Templates_Library_Filters(this),this.search=new TF_Templates_Library_Search(this),this.sidebar=new TF_Templates_Library_Sidebar(this),this.info_modal=new TF_Templates_Info_Modal(this),this.sorting=new TF_Templates_Library_Sorting(this),this.preview_modal=new TF_Templates_Preview_Modal(this),this.prepare(),this.initEvents()},t.prepare=function(){this.isJ4&&document.body.classList.add("isJ4")},t.initEvents=function(){var e=this;jQuery(this.modal).on("show.bs.modal",function(){e.loadTemplates()}),document.addEventListener("click",function(e){this.handleRefreshTemplates(e),this.onMessageHide(e),this.toggleFullscreenMode(e)}.bind(this))},t.onMessageHide=function(e){e.target.closest(".tf-library-messages-hide-btn")&&(this.library_messages.classList.add("is-hidden"),this.library_messages.querySelector(".tf-library-messages-text").innerHTML="")},t.toggleFullscreenMode=function(e){var t=e.target.closest(".tf-templates-library-toggle-fullscreen");t&&(e.preventDefault(),this.modal.classList.toggle("fullscreen"),t.classList.toggle("fullscreen"))},t.getOption=function(e,t){t=void 0===t?"":t;var i=this.getJoomlaOption("tassos_framework");return i&&void 0!==i[e]?i[e]:t},t.getJoomlaOption=function(e,t){if(!this.JoomlaOptions){var i=document.querySelector(".joomla-script-options");if(!i)return;this.JoomlaOptions=JSON.parse(i.text||i.textContent)}return void 0!==this.JoomlaOptions[e]?this.JoomlaOptions[e]:t},t.ajaxCall=function(e,t,i){t.options=this.library_wrapper.dataset.options;var r=this.getOption("templates_library_ajax_url")+"&action="+e+"&"+this.getOption("csrf_token")+"=1";fetch(r,{method:"post",body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(e){i(e)}).catch(function(e){console.log(e),alert(e)})},t.loadTemplates=function(){if(this.library_wrapper.classList.contains("loaded"))return!1;var t=this.modal.querySelector(".tf-templates-refresh-btn");t.classList.add("working"),this.resetTemplatesLayout();var i=this;this.ajaxCall("get_templates",{},function(e){i.updateLibraryLayout(e),t.classList.remove("working")})},t.handleRefreshTemplates=function(e){var t=e.target.closest(".tf-templates-refresh-btn");if(t){e.preventDefault();var i=this;t.classList.add("working"),this.resetTemplatesLayout(),this.ajaxCall("refresh_templates",{},function(e){i.updateLibraryLayout(e),t.classList.remove("working"),e.code||e.message||(t.classList.add("checkmark"),setTimeout(function(){t.classList.remove("checkmark")},2e3))})}},t.updateLibraryLayout=function(e){var t="";if(e?e.error&&e.message&&(t=e.message):t="Cannot load templates",t)return this.showMessageAlert(t),void this.modal.querySelector(".tf-library-body").scrollTo({top:0,behavior:"smooth"});this.library_list.querySelectorAll(".tf-library-item:not(.blank_popup)").forEach(function(e){e.remove()}),this.library_wrapper.classList.add("loaded"),this.library_list.innerHTML+=e.templates,e.filters?(this.library_wrapper.classList.remove("no-sidebar"),this.filters_sidebar.innerHTML=e.filters):this.library_wrapper.classList.add("no-sidebar"),this.filters.update()},t.resetTemplatesLayout=function(){this.hideMessageAlert(),document.querySelector(".tf-library-list").classList.remove("is-hidden"),document.querySelector(".tf-library-no-results").classList.remove("is-visible")},t.hideMessageAlert=function(){this.library_messages.classList.add("is-hidden")},t.showTemplateMessage=function(e,t){var i=e.querySelector(".tf-template-item-message");t&&(i.querySelector(".tf-template-item-message-text").innerHTML=t),i.classList.remove("is-hidden")},t.showMessageAlert=function(e){e&&(this.library_messages.querySelector(".tf-library-messages-text").innerHTML=e),this.library_messages.classList.remove("is-hidden")},t.getTemplateItem=function(e){var t=e.dataset.templateId;return t?this.library_list.querySelector('.tf-library-item[data-id="'+t+'"]'):e.closest(".tf-library-item")},e}();document.addEventListener("DOMContentLoaded",function(){new TF_Templates_Library});var TF_Templates_Library_Modals=function(){function e(e){this.instance=e,this.popupsClasses=["tf-pro-only-modal","tf-templates-library","tf-templates-library-item-info","tf-templates-library-popup-preview"],this.tabindex=1,this.prepareModals(),this.initEvents()}var t=e.prototype;return t.prepareModals=function(){var i=this;this.popupsClasses.forEach(function(e){var t=document.querySelector("."+e);t&&(t.tfTabIndex=i.tabindex,i.tabindex++,t.setAttribute("aria-hidden",!0),t.setAttribute("data-backdrop","static"),t.setAttribute("data-bs-backdrop","static"),t.setAttribute("data-keyboard",!1),t.setAttribute("data-bs-keyboard",!1),t.classList.contains("isJ4")?(t.setAttribute("tabindex",-1),new bootstrap.Modal("."+e,{backdrop:"static",keyboard:!1})):(t.removeAttribute("tabindex"),jQuery(t).modal({show:!1,backdrop:"static",keyboard:!1})))})},t.initEvents=function(){var i=this;document.addEventListener("keydown",function(e){this.handleEscapeClose(e)}.bind(this)),jQuery(window).on("show.bs.modal",function(t){i.popupsClasses.forEach(function(e){t.target.classList.contains(e)&&(document.querySelector(".modal."+e).tfTabIndex=i.tabindex,i.tabindex++,document.body.classList.add("tf-modal-"+e+"-open"))})}),jQuery(window).on("hide.bs.modal",function(t){i.popupsClasses.forEach(function(e){t.target.classList.contains(e)&&document.body.classList.remove("tf-modal-"+e+"-open")}),"ebSelectTemplate"===t.target.id&&(i.popupsClasses.forEach(function(e){var t=document.querySelector("."+e);t&&(t.classList.remove("in","show"),document.body.classList.remove("tf-modal-"+e+"-open"))}),document.querySelectorAll(".modal-backdrop").forEach(function(e){e.remove()}))})},t.handleEscapeClose=function(e){if(27==(e=e||window.event).keyCode){if(e.preventDefault(),document.querySelector(".modal.tf-pro-only-modal.fade.in")||document.querySelector(".modal.tf-pro-only-modal.fade.show"))return!1;var t=this.getAllVisibleModals();if(t.length){var i=null,r=-1,s=t,a=Array.isArray(s),n=0;for(s=a?s:s[Symbol.iterator]();;){var o;if(a){if(n>=s.length)break;o=s[n++]}else{if((n=s.next()).done)break;o=n.value}var l=o;l.classList.contains("tf-pro-only-modal")||void 0!==l.tfTabIndex&&l.tfTabIndex>r&&(r=l.tfTabIndex,i=l)}i&&jQuery(i).modal("hide")}}},t.getAllVisibleModals=function(){var i=[];return this.popupsClasses.forEach(function(e){var t=document.querySelector("."+e+".fade.in");(t=t||document.querySelector("."+e+".fade.show"))&&i.push(t)}),i},e}(),TF_Templates_Preview_Modal=function(){function e(e){this.instance=e,this.previewing=!1,this.modal=document.querySelector("#tf-library-preview-popup"),this.initEvents()}var t=e.prototype;return t.initEvents=function(){window.addEventListener("hashchange",function(e){"#templates-library-previewer"===window.location.hash&&(this.previewing=!0),this.previewing&&""===window.location.hash&&jQuery(this.modal).modal("hide")}.bind(this)),jQuery(this.modal).on("hide.bs.modal",function(e){this.onBeforeClose()}.bind(this)),document.addEventListener("click",function(e){this.onBeforeOpen(e),this.toggleResponsiveViewport(e),this.refreshDemo(e)}.bind(this))},t.onBeforeOpen=function(e){var t=e.target.closest(".tf-library-preview-item");if(t){jQuery(this.modal).modal("show");var i=this.instance.getTemplateItem(t);this.modal.querySelector(".modal-title").innerHTML=i.querySelector(".template-label").innerHTML;var r=i.querySelector(".tf-library-template-item-info").cloneNode(!0);this.modal.querySelector(".modal-header .tf-library-template-item-info")&&this.modal.querySelector(".modal-header .tf-library-template-item-info").remove(),i.classList.contains("has-errors")&&r.classList.add("has-errors"),this.modal.querySelector(".modal-header .modal-title-wrapper").appendChild(r);var s=this.instance.library_wrapper.dataset.previewUrl;if(s=s.replace("TEMPLATE_ID",i.dataset.id),this.modal.querySelector("iframe")){var a=this.modal.querySelector("iframe").cloneNode();a.src=s,this.modal.querySelector("iframe").parentNode.replaceChild(a,this.modal.querySelector("iframe"))}else{var n=document.createElement("iframe");n.className="tf-library-preview-iframe",n.src=s,this.modal.querySelector(".tf-library-preview-inner").appendChild(n)}this.modal.querySelector("iframe").addEventListener("load",this.onIframeLoaded.bind(this),!0),this.setViewport("desktop");var o=i.querySelector(".tf-library-item-actions a").cloneNode(!0);this.modal.querySelector(".modal-header .tf-library-preview-action")&&this.modal.querySelector(".modal-header .tf-library-preview-action").remove(),o.classList.add("tf-library-preview-action","tf-button","outline"),o.classList.contains("red")||(i.classList.contains("has-errors")?o.classList.add("orange"):o.classList.add("blue")),this.modal.querySelector(".modal-header .actions-wrapper").insertBefore(o,this.modal.querySelector(".modal-header .actions-wrapper").firstChild)}},t.onIframeLoaded=function(){this.modal.classList.remove("refreshing")},t.onBeforeClose=function(){this.previewing=!1,window.location.hash="";var e=this.getIFrame();e&&(e.removeEventListener("load",this.onIframeLoaded),e.src="")},t.refreshDemo=function(e){if(e.target.closest(".tf-templates-library-refresh-demo")){e.preventDefault(),this.modal.querySelector("iframe").removeEventListener("load",this.onIframeLoaded),this.modal.classList.add("refreshing");var t=this.getIFrame(),i=t.cloneNode();i.addEventListener("load",this.onIframeLoaded.bind(this),!0),i.src=t.src,t.parentNode.replaceChild(i,t)}},t.getIFrame=function(){return this.modal.querySelector("iframe")},t.toggleResponsiveViewport=function(e){var t=e.target.closest(".tf-templates-library-preview-responsive-device");t&&this.setViewport(t.dataset.device)},t.setViewport=function(e){var t=this.getIFrame();this.modal.querySelector(".tf-templates-library-preview-responsive-device.active").classList.remove("active"),this.modal.querySelector('.tf-templates-library-preview-responsive-device[data-device="'+e+'"]').classList.add("active"),t.classList.remove("desktop","tablet","mobile"),t.classList.add(e)},e}(),TF_Templates_Library_Search=function(){function e(e){this.instance=e}var t=e.prototype;return t.search=function(){var r=this.getSearchTerm(),s=this.instance.library_toolbar.querySelector(".tf-library-view-favorites.active");this.instance.items.getCurrentItems(!0).forEach(function(e){var t=!0;r&&(t=!1,e.dataset.title.toLowerCase().includes(r)&&(t=!0),e.dataset.filterCategory.toLowerCase().includes(r)&&(t=!0),e.dataset.filterTags.toLowerCase().includes(r)&&(t=!0),e.dataset.filterSolution.toLowerCase().includes(r)&&(t=!0),e.dataset.filterGoal.toLowerCase().includes(r)&&(t=!0));if(s){var i=e.querySelector(".tf-library-favorite-item");i&&(!i||e.querySelector(".tf-library-favorite-item").classList.contains("active"))||(t=!1)}t?e.classList.remove("is-hidden"):e.classList.add("is-hidden")}),this.updateSearchElements()},t.updateSearchElements=function(){var e=this.instance.items.getCurrentItems(!0).length;0===e?(this.instance.library_noresults.classList.add("is-visible"),this.instance.library_list.classList.add("is-hidden")):(this.instance.library_noresults.classList.remove("is-visible"),this.instance.library_list.classList.remove("is-hidden")),this.instance.library_wrapper.querySelector(".tf-showing-results-counter").innerHTML=e,this.instance.filters.onUpdateSearchElements();var t=this.getSearchTerm();if(t){this.instance.filters.setHasFilters();var i=this.instance.library_wrapper.querySelector(".tf-library-filter-template").cloneNode(!0);i.querySelector(".filter").classList.add("search-filter-pill"),i.querySelector(".filter svg").remove(),i.querySelector(".filter .filter-label").textContent='"'+t+'"',this.instance.filters.getFilterPillsWrapper().appendChild(i.children[0])}},t.getSearchTerm=function(){return this.instance.library_toolbar.querySelector("#tf_search_template").value.trim().toLowerCase()},e}(),TF_Templates_Library_Sidebar=function(){function e(e){this.instance=e,this.items=this.instance.items,this.toolbar=this.instance.toolbar,this.initEvents()}var t=e.prototype;return t.initEvents=function(){this.onPageLoadToggle(),document.addEventListener("click",function(e){this.initSidebarToggle(e)}.bind(this))},t.initSidebarToggle=function(e){if(e.target.closest(".tf-library-sidebar-toggle")){e.preventDefault(),this.instance.modal.classList.toggle("sidebar-open");var t=this.getLibraryID();this.instance.modal.classList.contains("sidebar-open")?window.localStorage.setItem(t,"open"):(window.localStorage.removeItem(t),this.instance.sidebar_element.scrollTo({top:0,behavior:"smooth"}))}},t.getLibraryID=function(){return"templates_library_"+this.instance.modal.id},t.onPageLoadToggle=function(){window.localStorage.getItem(this.getLibraryID())?this.instance.modal.classList.add("sidebar-open"):this.instance.modal.classList.remove("sidebar-open")},e}(),TF_Templates_Library_Sorting=function(){function e(e){this.instance=e,this.sortWrapper=this.instance.library_toolbar.querySelector(".sorting-selector-item"),this.initEvents()}var t=e.prototype;return t.initEvents=function(){document.addEventListener("click",function(e){this.onSortUpdate(e),this.onSortHide(e)}.bind(this)),this.sortWrapper.addEventListener("mouseover",function(e){this.onSortingShow(e)}.bind(this)),this.sortWrapper.addEventListener("mouseout",function(e){this.onSortingMouseOutHide(e)}.bind(this))},t.onSortingMouseOutHide=function(e){(e.target.closest(".sorting-selected-label")||e.target.closest(".sorting-selector-items"))&&this.sortWrapper.classList.remove("visible")},t.onSortUpdate=function(e){if(e.target.closest(".sorting-selector-items")){var t=e.target.closest("li");t&&(t.classList.contains("selected")||(e.preventDefault(),this.sortWrapper.classList.remove("visible"),this.sortWrapper.querySelector(".sorting-selector-items li.selected").classList.remove("selected"),t.classList.add("selected"),this.sortWrapper.querySelector(".sorting-selected-label .selected-label").innerHTML=t.innerHTML,this.sort()))}},t.sort=function(){var r=this,s=this.sortWrapper.querySelector(".sorting-selector-items li.selected").dataset.value,e=this.instance.items.getCurrentItems(!0);e.forEach(function(e){e.style.order=null});var t=Array.from(e).sort(function(e,t){var i="sort"+r.capitalizeFirstLetter(s);return"date"===s?e.dataset[i].localeCompare(t.dataset[i]):parseInt(e.dataset[i],10)<=parseInt(t.dataset[i],10)?-1:1});t=[].concat(t).reverse();var i=1;t.forEach(function(e){e.style.order=i,i++})},t.onSortHide=function(e){e.target.closest(".sorting-selector-item")||this.sortWrapper.classList.remove("visible")},t.onSortingShow=function(e){e.target.closest(".sorting-selector-item")&&this.sortWrapper.classList.add("visible")},t.capitalizeFirstLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},e}(),TF_Templates_Library_Toolbar=function(){function e(e){this.instance=e,this.initEvents()}var t=e.prototype;return t.initEvents=function(){document.addEventListener("input",function(e){this.onInputSearch(e)}.bind(this)),document.addEventListener("click",function(e){this.onFavoritesView(e)}.bind(this))},t.onInputSearch=function(e){e.target.closest("#tf_search_template")&&(e.target.value.trim(),this.instance.filters.update())},t.onFavoritesView=function(e){var t=e.target.closest(".tf-library-view-favorites");t&&(t.classList.toggle("active"),this.instance.library_wrapper.classList.toggle("favorites-view"),this.instance.filters.update(),e.preventDefault())},e}();
