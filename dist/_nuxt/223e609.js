(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{538:function(e,t,r){"use strict";r.r(t);var n=r(20),o=(r(75),{props:{student:{type:Object,default:null}},computed:{franchises:function(){return this.$store.state.franchiselist},isadmin:function(){return"admin"===this.$store.state.auth.user.role},form:function(){return this.student}},methods:{hideModal:function(){var e=this;this.$nextTick((function(){e.$refs.editstudent.hide()}))},editstudent:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("updateStudent",e.form);case 2:t.sent&&(e.hideModal(),e.$parent.getStudents());case 4:case"end":return t.stop()}}),t)})))()}}}),l=r(30),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{ref:"editstudent",attrs:{id:"editstudent",size:"lg","hide-footer":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[r("h2",[e._v(e._s(e.$tc("Update"))+" "+e._s(e.$tc("Student")))])]},proxy:!0}])},[e._v(" "),r("card",{staticClass:"border-0 mb-0",attrs:{type:"secondary","body-classes":"px-lg-4 py-lg-2"}},[r("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var n=t.invalid;return[r("b-form",{on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.editstudent.apply(null,arguments)}}},[r("b-row",[r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("SudentID"),rules:"required",required:!0,label:e.$tc("SudentID"),placeholder:e.$tc("SudentID"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.sid,callback:function(t){e.$set(e.form,"sid",t)},expression:"form.sid"}})],1),e._v(" "),r("b-col",[r("base-input",{staticClass:"mb-3",attrs:{alternative:"",name:e.$tc("FirstName"),required:!0,label:e.$tc("FirstName"),rules:"required",placeholder:e.$tc("FirstName"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.first_name,callback:function(t){e.$set(e.form,"first_name",t)},expression:"form.first_name"}})],1)],1),e._v(" "),r("b-row",[r("b-col",[r("base-input",{attrs:{alternative:"",rules:"required",name:e.$tc("LastName"),label:e.$tc("LastName"),required:!0,placeholder:e.$tc("LastName"),"prepend-icon":"fas fa-angle-right fa-lg"},model:{value:e.form.last_name,callback:function(t){e.$set(e.form,"last_name",t)},expression:"form.last_name"}})],1),e._v(" "),r("b-col",[r("b-form-group",{staticClass:"form-control-label",attrs:{label:e.$tc("Franchise")}},[r("b-form-select",{staticClass:"form-control-alternative",attrs:{rules:"required",name:e.$tc("Franchise"),options:e.franchises,required:""},model:{value:e.form.franchise_id,callback:function(t){e.$set(e.form,"franchise_id",t)},expression:"form.franchise_id"}})],1)],1),e._v(" "),r("b-col")],1),e._v(" "),r("div",{staticClass:"modal-footer"},[r("b-button",{attrs:{disabled:n,type:"submit",variant:"primary"}},[e._v(e._s(e.$tc("save")))])],1)],1)]}}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);