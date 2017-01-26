function randomInt(min, max) {
  if (max == null) {
    max = min
    min = 0
  }
  return Math.round((Math.random() * (max - min)) + min)
}

function randomString(min, max) {
  var n = randomInt(min, max)
  var s = []
  for (var i = 0; i < n; i++) {
    s.push(String.fromCharCode(randomInt(97, 122)))
  }
  s[0] = s[0].toUpperCase()
  return s.join('')
}

var state = {
  lockCount: 0,
  lock: function() {
    if (lockCount === 0) {
      $(document.body).addClass('locked')
    } 
    this.lockCount += 1
  },
  unlock: function() {
    this.lockCount -= 1
    if (this.lockCount === 0) {
      $(document.body).removeClass('locked')
    }
  }
}

var lock = state.lock.bind(state)
var unlock = state.unlock.bind(state)

$('#toggle-left').click(function() { $('#left-rail').toggleClass('hidden') })
$('#toggle-right').click(function() { $('#right-rail').toggleClass('hidden') })
$('#toggle-left-over').click(function() { $('#left-rail-over').toggleClass('hidden') })
$('#toggle-right-over').click(function() { $('#right-rail-over').toggleClass('hidden') })

var n1 = randomInt(15, 35)
var n2 = randomInt(15, 35)
var n3 = randomInt(15, 35)
var n4 = randomInt(15, 35)

var limits = [n1, n2, n3, n4]
var ids = ['#left-rail', '#right-rail', '#left-rail-over', '#right-rail-over']

ids.forEach(function(id) {
  $(id).on('mouseover', lock)
  $(id).on('mouseout', unlock)
})

for (var i=0, ii=Math.max(n1, n2, n3, n4); i<ii; i++) {
  for (var j=0; j<ids.length; j++) {
    if (i < limits[j]) {
      $(ids[j]).append('<div class="label">' + randomString(5, 15) + '</div>')
    }
  }
}

function resizeContainers() {
  $('.outer-container').each(function(i, e) {
    var outer = $(e)
    var inner = $(e).children(':first')
    console.log({
      outer: outer[0],
      inner: inner[0],
    })
    outer.css('width', $(inner).outerWidth())
  })
}

window.addEventListener('resize', resizeContainers)
resizeContainers()
