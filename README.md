# Snake
![alt text](./img/snake.jpg "Snake")

Play: [http://pkief.github.io/Snake](http://pkief.github.io/Snake)

## Game description
Snake is a game in which you are moving a snake on a 2D field. If the snake eats food it gets bigger by one unit. By the time it gets bigger and bigger and so it is more difficult to move the snake inside the field. The game ends if the snake has not enough space to move and beats itself.

## How to play
### Desktop
#### Change direction
The snake game is really simple to play. On a desktop computer you have to press the arrow keys to change the direction of the snake. The snake is moving forward automatically.

#### Game pause
To stop the game you have to press Escape. Press Esc again to continue moving the snake.

#### Speed up
If you want to speed up the snake you have to hold the arrow key for the direction in which you want to move your snake faster.

### Mobile / touch device
#### Change direction
The way how you use snake on a touch device is very intuitive. To change the direction of the snake you have to swipe with one finger in the certain direction.

#### Game pause
Tap with one finger on the field to pause the game. Tap again to continue playing.

#### Speed up
To speed up the snake you have to press one finger on the screen. If you release your finger of the screen the snake is moving with its normal speed again.

### Tricks
#### Border
To be very efficient with the remaining space in the field you can also move the snake to the border of the field. If the snake reaches the border it will appear on the opposite side of the field. So you can quickly change the sides of the field, too.

## Implementation
The game is implemented by JavaScript and uses the plugin jQuery. You can find the methods and the logic in the `snake.js`-file. 

### Gulp
I used gulp as my taskrunner. Gulp helps me to compile the styles, that are written in Sass, into browser readable CSS-files. Gulp also watches for file changes, if you edit and safe the file, gulp recompiles it. So you only have to refresh your browser.

More information: http://gulpjs.com/

### Animate.css
Animate.css is a very nice css-File which is used to add some nice animations to the elements.
You only have to bind in the `animate.css`-file into the html and add some class names to your element which should be animated. You need to add the class `animated` and also the classname of the animation, e.g. `fadeIn`:

```html
<div class="animated fadeIn"></div>
```

I used the effect to show the info alert when a player pauses his game or show the 'Game over'-message. There is also an animation when the snake eats itself and dies.

More information: https://daneden.github.io/animate.css/

### Hammer.js
Hammer.js is a very nice framework to implement some touch events for mobile devices. 
It is also very simple to use: Bind in the `hammer.min.js`-file into your html and initialize the hammer component like this:

```js
var mc = new Hammer(document.getElementById('field'));
```

After that you can listen for some events:

```js
mc.on("swipeleft swipeup swiperight swipedown", function (event) {
    console.log(event.type); //shows e.g. 'swipeleft'
}
```
To swipe in all directions (left, up, right, down) you need to add this line:

```js
mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
``` 

For a better experience in the browsers of mobile devices you can add the following line to suppress the scrolling and scaling in the browser while swiping or something else:

```html
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
```

Add this line for `Windows phones`. It prevents the user from seeing a tap animation on windows phone browsers:

```html
<meta name="msapplication-tap-highlight" content="no" />
```

More information: [http://hammerjs.github.io/](http://hammerjs.github.io/)
  