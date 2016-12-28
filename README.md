# dualrange
fancy dual range input jquery plugin




#[DEMO](https://azopcorp.github.io/dualrange/)





#usage

load dualrange.css in the document head


load jquery

load dualrange.js

create container with data attributes to initialyse 

```html
<div class="test" data-min="0" data-max="45" data-step="0.1" data-id="foo"></div>
```
data-min => minimum value

data-max => maximum value

data-step => range inputs steps

data-id => id concatenated to input and output ranges element.

the plug-in appends 2 hidden html5 range input element  

to retrieve input and output range elements value

grab them by ID like this :

input => $('#in_foo').val();
output => $('#out_foo').val();

where "foo" corespond to data-id="foo"




then:
```javascript
$('.your-range-input-class').fancyrange();

```









