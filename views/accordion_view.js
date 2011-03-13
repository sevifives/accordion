sc_require('mixins/accordion_item_view_delegate.js');
sc_require('mixins/accordion_view_delegate.js');

SC.AccordionView = SC.View.extend(
  SC.AccordionViewDelegate,SC.AccordianItemViewDelegate,
/** @scope SC.AccordionView.prototype */  {
  
  type: 'AccordionView',
  
  classNames: ['accordion-view'],
  
  items: null,
  
  bannerThickness: 30,
  
  allowsMultipleExpansion: NO,
  
  itemSpacing: 5,
  
  duration: 0.25,
  
  timing: SC.Animatable.TRANSITION_NONE,
  
  isVertical: YES,
  
  expandedThickness: null,
  
  exampleAccordionItemView: SC.AccordionItemView,
  
  _expandedView: null,
  
  shouldOpenFirst: NO,
  
  init: function () {
    var itemSpacing = 5;
    var length = this.getPath('items.length');
    var thickness = this.get('bannerThickness');
    
    var layout = this.get('layout');
    this.set('expandedThickness', (this.get('isVertical') ? layout.height : layout.width) - (length*thickness) + ( (length-1)*5 ) );
    
    sc_super();
    
    if (this.get('shouldOpenFirst')) {
      var cvs = this.get('childViews');
      this._expandedView = cvs[0];
      cvs[0].expandView();
      this._adjustItems(1);
    }
  },
  
  accordionItemDidClick: function (evt) {
    var ele = evt.srcElement || evt.originalElement;
    var view = this.$(ele).view()[0];
    
    if (view && view.get('type') === 'AccordionItemViewBanner') {
      var parent = view.get('parentView');
      var allowExpansion = this.get('allowsMultipleExpansion');
      var expanded = this._expandedView;
      var arrayPosition = parent.get('arrayPosition');
      var shouldAdjustSiblings = YES;
      var start,end;
      var shouldCollapse = NO;
      if (parent.get('isCollapsed')) {
        if (!allowExpansion && expanded) {
          expanded.collapseView();
          var exPosition = expanded.get('arrayPosition');
          var diff = arrayPosition - exPosition;
          
          if (diff > 0) {
            start = exPosition;
            end = arrayPosition;
            shouldCollapse = YES;
          } else {
            start = arrayPosition;
            end = exPosition;
            shouldCollapse = NO;
          }
          start += 1;
          end += 1;
        } else {
          start = arrayPosition + 1;
        }
        
        parent.expandView();
        this._expandedView = parent;
        
      } else {
        if (allowExpansion) {
          parent.collapseView();
          start = arrayPosition;
          shouldCollapse = YES;
        }
      }
      
      if (start) {
        this._adjustItems(start,end,shouldCollapse); 
      }
    }
  },
  
  createChildViews: function () {
    var items = this.get('items');
    
    if (items) {
      var itemSpacing = this.get('itemSpacing');
      var duration = this.get('duration');
      var timing = this.get('timing');
      var isV = this.get('isVertical');
      var accordionItemView = this.get('exampleAccordionItemView');
      var expandedThickness = this.get('expandedThickness');
      var bannerThickness = this.get('bannerThickness');
      var itemViewDelegate = this;
      var childViews = [];
      var prev = null;
      
      items.forEach(function (item,idx) {
        var attrs = (SC.typeOf(item) !== 'hash') ? item.get('attributes') : item;
        attrs.isVertical = isV;
        attrs.duration = duration;
        attrs.timing = timing;
        attrs.bannerThickness = bannerThickness;
        attrs.expandedThickness = expandedThickness;
        attrs.layout = {};
        attrs.delegate = itemViewDelegate;
        attrs.arrayPosition = idx;

        var offset = 0;
        var dim = {};

        if (prev) {
          dim = prev.get('frame');
          offset = (isV ? dim.y + dim.height : dim.x + dim.width) + itemSpacing;
        }
        
        attrs.layout = isV ? {left: 0,right: 0, height: bannerThickness, top: offset} : {left: offset,top: 0, bottom: 0, width: bannerThickness};

        var view = this.createChildView(accordionItemView,attrs);
        prev = view;
        childViews.push( view );
      },this);

      this.set('childViews',childViews);
    }
  },
  
  _adjustItems: function (start,end,shouldCollapse) {
    var cvs = this.get('childViews');
    var length = end || cvs.length;
    
    for (var i=start;i<length;i++) {
      this._adjustItemPosition(cvs[i],shouldCollapse);
    }
  },
  
  _adjustItemPosition: function (item,shouldCollapse) {
    var isVertical = this.get('isVertical');
    var curLayout = item.get('frame');
    var delta = this.get('expandedThickness') * 1 - this.get('bannerThickness');
    if (shouldCollapse) {
      delta = delta * -1;
    }
    var curLocation = isVertical ? curLayout.y : curLayout.x;
    item.adjust(isVertical ? 'top' : 'left', curLocation + delta);
  }
});