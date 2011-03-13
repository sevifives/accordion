sc_require('mixins/accordion_item_view_delegate.js');

SC.AccordionItemView = SC.View.extend(
  SC.Animatable, SC.DelegateSupport,SC.AccordianItemViewDelegate,
/** @scope SC.AccordionItemView.prototype */  {
  type: 'AccordionItemView',
  
  classNames: ['accordian-view'],
  
  isCollapsed: YES,
  
  bannerThickness: 30,
  
  expandedThickness: null,
  
  isVertical: YES,
  
  isAdjusted: NO,
  
  duration: 0.25,
  
  timing: SC.Animatable.TRANSITION_NONE,
  
  bannerValue: null,
  
  accordionItemContent: null,
  
  exampleBannerView: SC.LabelView,
  
  init: function () {
    var layout = this.get('layout');
    var isV = this.get('isVertical');
    var bannerThickness = this.get('bannerThickness');
    var expandedThickness = this.get('expandedThickness');
    var attr = {duration: this.get('duration'), timing: this.get('timing')};
    var transitions;
    
    if (isV) {
      transitions = {height: attr};
      if (SC.none(expandedThickness) ) {this.set('expandedThickness',layout.height);}
      layout.height = bannerThickness;
    } else {
      transitions = {width: attr};
      if (SC.none(expandedThickness) ) {this.set('expandedThickness',layout.width);}
      layout.width = bannerThickness;
    }
    
    this.set('layout',layout);
    this.set('transitions',transitions);
    
    sc_super();
  },
  
  createChildViews: function () {
    var bannerThickness = this.get('bannerThickness');
    var contentThickness = this.get('contentThickness');
    var isVertical = this.get('isVertical');
    var layout = this.get('layout');
    
    var banner = this.get('exampleBannerView');
    var accordionContent = this.get('accordionItemContent');
    
    var bLayout, cLayout = {};
    
    if (isVertical) {
      bLayout = {left: 0,right: 0,top: 0, height: bannerThickness};
      cLayout = {left: 0,right: 0,top: bannerThickness,bottom: 0};
    } else {
      bLayout = {left: 0,bottom: 0,top: 0, width: bannerThickness};
      cLayout = {bottom: 0,top: 0,left: bannerThickness,right: 0};
    }
    
    var cvs = [];
    var attrs = {
      layout: bLayout,
      classNames: ['accordian-banner-view'],
      type: 'AccordionItemViewBanner',
      target: this
    };
    
    var bValue = this.get('bannerValue');
    if (bValue) {
      attrs.value = bValue;
    }
    cvs.push( this.createChildView(banner,attrs) );
    
    attrs = { layout: cLayout, classNames: ['accordian-content-view'], type: 'AccordionItemViewContent'};
    cvs.push( this.createChildView(accordionContent,attrs) );
    
    this.set('childViews',cvs);
  },
  
  toggleView: function () {
    var isCollapsed = this.get('isCollapsed');
    var thickness = isCollapsed ? this.get('expandedThickness') : this.get('bannerThickness');
    var isVertical = this.get('isVertical');
    var dimension = isVertical ? 'height' : 'width';

    this.adjust(dimension,thickness); 
    this.set('isCollapsed',!isCollapsed);
  },
  
  collapseView: function () {
    var isCollapsed = this.get('isCollapsed');
    if (!isCollapsed) {
      var dimension = this.get('isVertical') ? 'height' : 'width';
      this.adjust(dimension,this.get('bannerThickness'));
      this.set('isCollapsed',YES);
    }
  },
  
  expandView: function () {
    var isCollapsed = this.get('isCollapsed');
    if (isCollapsed) {
      var dimension = this.get('isVertical') ? 'height' : 'width';
      this.adjust(dimension,this.get('expandedThickness'));
      this.set('isCollapsed',NO);
    }
  },

  accordionItemDidClick: function (evt) {
    var ele = evt.originalTarget || evt.srcElement;
    var view = SC.$(ele).view()[0];
    if (view.get('type') === 'AccordionItemViewBanner') {
      this.toggleView();
    }
  },
  
  click: function (evt) {
    var del = this.get('itemDelegate');
    if (del && del.accordionItemDidClick) {
      del.accordionItemDidClick(evt);
    }
  },
    
  itemDelegate: function() {
    var del = this.get('delegate'), content = this.get('content');
    return this.delegateFor('isAccordionItemViewDelegate', del, content);
  }.property('delegate', 'content').cacheable()
});