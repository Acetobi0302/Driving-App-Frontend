(window.webpackJsonp=window.webpackJsonp||[]).push([[26,25,27,42],{515:function(e,t,r){"use strict";r.r(t);var n={props:{alertText:{type:String,default:"sure you want to delete.!"},executeDelelte:{type:Function}},methods:{hideModal:function(){var e=this;this.$nextTick((function(){e.$refs.deleteModel.hide()}))},conform:function(){this.hideModal(),this.executeDelelte()}}},o=r(30),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{ref:"deleteModel",staticClass:"modal fade",attrs:{id:"deleteModel",size:"sm","modal-class":["modal-mini","modal-danger"],tabindex:"-1",role:"dialog",centered:"","content-class":["bg-gradient-danger"]},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("h3",[e._v(e._s(e.$tc("Pleaseconfirm")))])]},proxy:!0},{key:"modal-footer",fn:function(){return[r("b-button",{staticClass:"ml-4",attrs:{variant:"secondary"},on:{click:e.conform}},[e._v("\n      "+e._s(e.$tc("Yes")))]),e._v(" "),r("b-button",{staticClass:"ml-auto mr-4",attrs:{variant:"secondary"},on:{click:e.hideModal}},[e._v(e._s(e.$tc("No")))])]},proxy:!0}])},[e._v(" "),r("div",{staticClass:"py-3 text-center"},[r("i",{staticClass:"fas fa-bell fa-3x"}),e._v(" "),r("h4",{staticClass:"heading mt-4"},[e._v(e._s(e.$tc("Pleaseconfirm")))]),e._v(" "),r("p",[e._v(e._s(e.alertText))])])])}),[],!1,null,null,null);t.default=component.exports},540:function(e,t,r){"use strict";r.r(t);var n=r(20),o=(r(75),{data:function(){return{form:{manufacturer:"",model:"",color:"",number_plate:"",franchise_id:null,art:null,user_id:null}}},computed:{arts:function(){return this.$store.state.arts},drivers:function(){return this.$store.state.drivers},franchises:function(){return this.$store.state.franchiselist}},methods:{getDriverList:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.form.user_id=null,t.next=3,e.$store.dispatch("getDriverList",e.form.franchise_id);case 3:case"end":return t.stop()}}),t)})))()},hideModal:function(){var e=this;this.$nextTick((function(){e.$refs.addcar.hide()}))},onhide:function(){this.$store.commit("setDrivers",null),this.form={franchise_id:null,art:null,user_id:null}},addcar:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("addCar",e.form);case 2:t.sent&&(e.hideModal(),e.$parent.getCars());case 4:case"end":return t.stop()}}),t)})))()}}}),l=r(30),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{ref:"addcar",attrs:{id:"addcar",size:"lg","hide-footer":""},on:{hide:e.onhide},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("h2",[e._v(e._s(e.$tc("Add"))+" "+e._s(e.$tc("Car")))])]},proxy:!0}])},[e._v(" "),r("card",{staticClass:"border-0 mb-0",attrs:{type:"secondary","body-classes":"px-lg-4 py-lg-2"}},[r("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var n=t.invalid;return[r("b-form",{on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.addcar.apply(null,arguments)}}},[r("b-row",[r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("manufacturer"),rules:"required",required:!0,label:e.$tc("manufacturer"),placeholder:e.$tc("manufacturer"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.manufacturer,callback:function(t){e.$set(e.form,"manufacturer",t)},expression:"form.manufacturer"}})],1),e._v(" "),r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("model"),required:!0,label:e.$tc("model"),rules:"required",placeholder:e.$tc("model"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1)],1),e._v(" "),r("b-row",[r("b-col",[r("base-input",{attrs:{alternative:"",rules:"required",name:e.$tc("color"),label:e.$tc("color"),required:!0,placeholder:e.$tc("color"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),e._v(" "),r("b-col",[r("base-input",{attrs:{alternative:"",rules:"required",name:e.$tc("NumberPlate"),required:!0,label:e.$tc("NumberPlate"),placeholder:e.$tc("NumberPlate"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.number_plate,callback:function(t){e.$set(e.form,"number_plate",t)},expression:"form.number_plate"}})],1)],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("art")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("art"),rules:"required",options:e.arts,required:""},model:{value:e.form.art,callback:function(t){e.$set(e.form,"art",t)},expression:"form.art"}})],1)],1),e._v(" "),r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("Franchise")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("Franchise"),rules:"required",options:e.franchises,required:""},on:{change:e.getDriverList},model:{value:e.form.franchise_id,callback:function(t){e.$set(e.form,"franchise_id",t)},expression:"form.franchise_id"}})],1)],1)],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("Driver")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("Driver"),options:e.drivers},model:{value:e.form.user_id,callback:function(t){e.$set(e.form,"user_id",t)},expression:"form.user_id"}})],1)],1),e._v(" "),r("b-col")],1),e._v(" "),r("div",{staticClass:"modal-footer"},[r("b-button",{attrs:{type:"submit",disabled:n,variant:"primary"}},[e._v(e._s(e.$tc("submit")))])],1)],1)]}}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports},541:function(e,t,r){"use strict";r.r(t);var n=r(20),o=(r(75),{props:{car:{type:Object,default:null}},computed:{arts:function(){return this.$store.state.arts},drivers:function(){return this.$store.state.drivers},franchises:function(){return this.$store.state.franchiselist},form:function(){return this.car}},methods:{getDriverList:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.form.user_id=null,t.next=3,e.$store.dispatch("getDriverList",e.form.franchise_id);case 3:case"end":return t.stop()}}),t)})))()},hideModal:function(){var e=this;this.$nextTick((function(){e.$refs.editcar.hide()}))},editcar:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("updateCar",e.form);case 2:t.sent&&(e.hideModal(),e.$parent.getCars());case 4:case"end":return t.stop()}}),t)})))()}}}),l=r(30),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{ref:"editcar",attrs:{id:"editcar",size:"lg","hide-footer":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("h2",[e._v(e._s(e.$tc("Update"))+" "+e._s(e.$tc("Car")))])]},proxy:!0}])},[e._v(" "),r("card",{staticClass:"border-0 mb-0",attrs:{type:"secondary","body-classes":"px-lg-4 py-lg-2"}},[r("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var n=t.invalid;return[r("b-form",{on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.editcar.apply(null,arguments)}}},[r("b-row",[r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("manufacturer"),rules:"required",required:!0,label:e.$tc("manufacturer"),placeholder:e.$tc("manufacturer"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.manufacturer,callback:function(t){e.$set(e.form,"manufacturer",t)},expression:"form.manufacturer"}})],1),e._v(" "),r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("model"),required:!0,label:e.$tc("model"),rules:"required",placeholder:e.$tc("model"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1)],1),e._v(" "),r("b-row",[r("b-col",[r("base-input",{attrs:{alternative:"",rules:"required",name:e.$tc("color"),label:e.$tc("color"),required:!0,placeholder:e.$tc("color"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),e._v(" "),r("b-col",[r("base-input",{attrs:{alternative:"",rules:"required",name:e.$tc("NumberPlate"),required:!0,label:e.$tc("NumberPlate"),placeholder:e.$tc("NumberPlate"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.number_plate,callback:function(t){e.$set(e.form,"number_plate",t)},expression:"form.number_plate"}})],1)],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("art")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("art"),rules:"required",options:e.arts,required:""},model:{value:e.form.art,callback:function(t){e.$set(e.form,"art",t)},expression:"form.art"}})],1)],1),e._v(" "),r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("Franchise")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("Franchise"),rules:"required",options:e.franchises,required:""},on:{change:e.getDriverList},model:{value:e.form.franchise_id,callback:function(t){e.$set(e.form,"franchise_id",t)},expression:"form.franchise_id"}})],1)],1)],1),e._v(" "),r("b-row",[r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("Driver")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{name:e.$tc("Driver"),options:e.drivers},model:{value:e.form.user_id,callback:function(t){e.$set(e.form,"user_id",t)},expression:"form.user_id"}})],1)],1),e._v(" "),r("b-col")],1),e._v(" "),r("div",{staticClass:"modal-footer"},[r("b-button",{attrs:{type:"submit",disabled:n,variant:"primary"}},[e._v(e._s(e.$tc("save")))])],1)],1)]}}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports},590:function(e,t,r){"use strict";r.r(t);var n=r(20),o=(r(75),r(9),r(540)),l=r(541),c={components:{AddCar:o.default,EditCar:l.default},data:function(){return{currentPage:1,filter:null,franchise:null,driver:null,franchise_id:null,perPage:5,totlefiltered:0,pageOptions:[5,10,20,50],isBusy:!1,selectedCar:{},fields:[{key:"#"},{key:"manufacturer",label:this.$tc("manufacturer"),sortable:!0},{key:"model",label:this.$tc("model"),sortable:!0},{key:"color",label:this.$tc("color"),sortable:!0},{key:"number_plate",label:this.$tc("NumberPlate"),sortable:!0},{key:"art",label:this.$tc("art"),sortable:!0},{key:"franchise.name",label:this.$tc("FranchiseName"),sortable:!0},{key:"users.name",label:this.$tc("Driver"),sortable:!0},{key:"action",label:this.$tc("action"),sortable:!1,tdClass:"text-center",thClass:"text-center"}]}},computed:{items:function(){return this.$store.getters.getCars},totalRows:function(){return null==this.filter?this.items.length:this.totlefiltered},franchises:function(){return this.$store.state.franchiselist}},methods:{getCars:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isBusy=!0,t.next=3,e.$store.dispatch("getCars",e.franchise_id);case 3:e.isBusy=!1;case 4:case"end":return t.stop()}}),t)})))()},deleteCar:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("deleteCar",e.selectedCar);case 2:t.sent&&e.getCars();case 4:case"end":return t.stop()}}),t)})))()},editcar:function(e,t,button){var r=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.$store.dispatch("getDriverList",e.franchise_id);case 2:r.selectedCar=JSON.parse(JSON.stringify(e)),r.$root.$emit("bv::show::modal","editcar",button);case 4:case"end":return t.stop()}}),t)})))()},addnewcar:function(button){this.$store.commit("setDrivers",null),this.$root.$emit("bv::show::modal","addcar",button)},deletemodel:function(e,t,button){this.selectedCar=JSON.parse(JSON.stringify(e)),this.$root.$emit("bv::show::modal","deleteModel",button)},onFiltered:function(e){this.totlefiltered=e.length,this.currentPage=1}}},d=r(30),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-card",{attrs:{"no-body":""}},[r("b-card-header",{staticClass:"border-0 bg-secondary"},[r("h1",{staticClass:"mb-0"},[e._v("\n      "+e._s(e.$tc("CarsList"))+"\n      "),r("b-button",{staticClass:"float-right",attrs:{variant:"primary"},on:{click:function(t){return e.addnewcar(t.target)}}},[e._v(e._s(e.$tc("New")))])],1)]),e._v(" "),r("b-form",{staticClass:"form-horizontal"},[r("b-row",{staticClass:"pt-3 m-0",attrs:{"align-h":"between"}},[r("b-col",{staticClass:"pl-5",attrs:{cols:"3"}},[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("Search"),type:"search",placeholder:e.$tc("TypeToSearch"),"prepend-icon":"fas fa-search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1),e._v(" "),r("b-col",{staticClass:"pr-1",attrs:{cols:"3"}},[r("b-form-group",[r("label",{staticClass:"col-4 pl-0 form-control-label text-right"},[e._v(e._s(e.$tc("Franchise")))]),e._v(" "),r("b-form-select",{staticClass:"col-7",attrs:{name:e.$tc("Franchise"),options:e.franchises},on:{change:e.getCars},model:{value:e.franchise_id,callback:function(t){e.franchise_id=t},expression:"franchise_id"}})],1)],1),e._v(" "),r("b-col",{staticClass:"pr-1",attrs:{cols:"3"}}),e._v(" "),r("b-col",{staticClass:"pr-5",attrs:{cols:"3"}},[r("b-form-group",[r("label",{staticClass:"col-7 form-control-label text-right"},[e._v(e._s(e.$tc("PerPage")))]),e._v(" "),r("b-form-select",{staticClass:"col-4",attrs:{name:e.$tc("PerPage"),options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)],1)],1),e._v(" "),r("b-table",{attrs:{items:e.items,fields:e.fields,"current-page":e.currentPage,"per-page":e.perPage,hover:!0,filter:e.filter,busy:e.isBusy,"show-empty":"",striped:"",stacked:"md","no-border-collapse":!0,"tbody-tr-class":"rowclass","head-variant":"light",responsive:""},on:{filtered:e.onFiltered},scopedSlots:e._u([{key:"table-busy",fn:function(){return[r("div",{staticClass:"text-center text-danger my-2"},[r("b-spinner",{staticClass:"align-middle"}),e._v(" "),r("strong",[e._v("Loading...")])],1)]},proxy:!0},{key:"cell(#)",fn:function(t){return[r("div",{staticClass:"td-action",staticStyle:{display:"flex"}},[e._v("\n        "+e._s(t.index+1+e.perPage*(e.currentPage-1))+"\n      ")])]}},{key:"cell(action)",fn:function(t){return["admin"!=t.item.role?r("div",{staticClass:"td-action",staticStyle:{display:"flex"}},[r("b-button",{staticClass:"mr-1",attrs:{variant:"primary"},on:{click:function(r){return e.editcar(t.item,t.index,r.target)}}},[e._v("\n          "+e._s(e.$tc("Edit"))+"\n        ")]),e._v(" "),r("b-button",{staticClass:"mr-1",attrs:{variant:"danger"},on:{click:function(r){return e.deletemodel(t.item,t.index,r.target)}}},[e._v("\n          "+e._s(e.$tc("Delete"))+"\n        ")])],1):e._e()]}}])}),e._v(" "),r("b-card-footer",{staticClass:"pt-4 pb-1 d-flex justify-content-end"},[r("b-pagination",{attrs:{"total-rows":e.totalRows,"per-page":e.perPage,"last-number":"","first-number":""},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),r("EditCar",{attrs:{car:e.selectedCar}}),e._v(" "),r("AddCar"),e._v(" "),r("DeleteModel",{attrs:{"execute-delelte":e.deleteCar}})],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{DeleteModel:r(515).default})}}]);