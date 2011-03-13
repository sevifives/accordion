// ==========================================================================
// Project:   Accordion - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Accordion */

// This page describes the main user interface for your application.  
Accordion.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'accordion'.w(),
    
    accordion: SC.AccordionView.extend({
      layout: {width: 900, top: 20,centerX: 0,height: 600},
      
      shouldOpenFirst: YES,
      
      items: [
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)',
            childViews: 'longText'.w(),
            longText: SC.LabelView.extend({
              value: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
            })
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        },
        
        {
          backgroundColor: 'rgba(0,0,0,.5)',
          bannerValue: 'Hello',
          accordionItemContent: SC.View.extend({
            backgroundColor: 'rgba(0,0,0,.5)'
          })
        }
      ]
    })
  })

});
