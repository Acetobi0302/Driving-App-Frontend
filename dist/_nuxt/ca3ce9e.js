(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{643:function(e,n,t){"use strict";t.r(n);t(180),t(31),t(36),t(51);var o={name:"base-radio",props:{name:{type:[String,Number],description:"Radio label"},disabled:{type:Boolean,description:"Whether radio is disabled"},value:{type:[String,Boolean],description:"Radio value"},inline:{type:Boolean,description:"Whether radio is inline"}},data:function(){return{cbId:""}},computed:{model:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},inlineClass:function(){return this.inline?"form-check-inline":""}},created:function(){this.cbId=Math.random().toString(16).slice(2)}},l=t(30),component=Object(l.a)(o,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"custom-control custom-radio",class:[e.inlineClass,{disabled:e.disabled}]},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],staticClass:"custom-control-input",attrs:{id:e.cbId,type:"radio",disabled:e.disabled},domProps:{value:e.name,checked:e._q(e.model,e.name)},on:{change:function(n){e.model=e.name}}}),e._v(" "),t("label",{staticClass:"custom-control-label",attrs:{for:e.cbId}},[e._t("default",(function(){return[e.inline?t("span",[e._v(" ")]):e._e()]}))],2)])}),[],!1,null,null,null);n.default=component.exports}}]);