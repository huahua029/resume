! function() {
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    let aTags = document.querySelectorAll('nav.menu >ul>li>a')
    for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function(e) {
            e.preventDefault()
            let a = e.currentTarget
            let href = a.getAttribute('href')
            let element = document.querySelector(href)
            let top = element.offsetTop


            let currentTop = window.scrollY
            let targetTop = top - 100

            var coords = {
                y: currentTop
            };
            var tween = new TWEEN.Tween(coords)
                .to({
                    y: targetTop
                }, 500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function() {
                    window.scrollTo(0, coords.y)
                })
                .start();
        }
    }
}.call()