# jQuery Hoverable

## Author
Sébastien Lavoie (github@lavoie.sl)

## Description
Simple solution to a common problem in IE6 that doesn’t support :hover for other elements than anchors:

  * Adds classes hoverable-{over,out} on the wrapper
  * Fires events

## Prerequisites
  * jQuery, should work with any version but tested with 1.7

## Basic setup 

```html
  <div class="hoverable">
    <h4>Title</h4>
    <ul>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
    </ul>
  </div>
```

## Initialization 
```javascript
$(function() {
    $('.hoverable').hoverable();
});
```

### Options
```javascript
{
    overEvent: 'mouseenter',               // jQuery event to register on
    outEvent: 'mouseleave',                 // Idem
    overClass: 'hoverable-over',          // Class to be added when the item is hovered
    outClass: 'hoverable-out'             // Idem
}
```

## CSS Example
```css
.hoverable ul {
  display:none;
}
.hoverable-over ul {
  display: block;
}
```

### Events
Two events are made and they both pass the data.show as a boolean

  * hoverable.over
  * hoverable.out

```javascript
$('.hoverable').on('hoverable.over', function(event){
  console.log("Hoverable is hovered");
});
$('.hoverable').on('hoverable.out', function(event,data){
  console.log("Hoverable is not longer hovered");
});
```

## Demo

Checkout the [demo](http://lavoiesl.github.com/Jquery-AutoCollapser/demo.html)
