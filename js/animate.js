const animate = {
    randomizeLetters(letters) {
        const chars = ['$','%','#','&','=','*','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',':',',','^']

        const charsTotal = chars.length;

        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

        const lineEq = (y2, y1, x2, x1, currentVal) => {
            const m = (y2 - y1) / (x2 - x1);
            const b = y1 - m * x1;
            return m * currentVal + b;
        }

        return new Promise((resolve, reject) => {
            const lettersTotal = letters.length;
            let cnt = 0;

            letters.forEach((letter, pos) => { 
                let loopTimeout;
                const loop = () => {
                    letter.innerHTML = chars[getRandomInt(0,charsTotal-1)];
                    loopTimeout = setTimeout(loop, getRandomInt(50,500));
                };
                loop();

                const timeout = setTimeout(() => {
                    clearTimeout(loopTimeout);
                    letter.style.opacity = 1;
                    letter.innerHTML = letter.dataset.initial;
                    ++cnt;
                    if ( cnt === lettersTotal ) {
                        resolve();
                    }
                }, pos*lineEq(40,0,8,200,lettersTotal));
            });
        })
    },
    
    getMousePos(e) {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) 	{
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    },

    zoom(id) {
        let elem = document.getElementById(id);

        TweenMax.to(elem, 0.8, {
            ease: Power3.easeOut,
            scale: 1.1
        });
    },

    tilt(ev, id) {
        const mousepos = this.getMousePos(ev);
        const elem = document.getElementById(id);
        
        // Document scrolls.
        const docScrolls = {
            left : document.body.scrollLeft + document.documentElement.scrollLeft, 
            top : document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = elem.getBoundingClientRect();;
        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = { 
            x : mousepos.x - bounds.left - docScrolls.left, 
            y : mousepos.y - bounds.top - docScrolls.top 
        };
        
        // Move the element from -20 to 20 pixels in both x and y axis.
        // Rotate the element from -15 to 15 degrees in both x and y axis.
        let t = {x:[-20,20],y:[-20,20]},
            r = {x:[-15,15],y:[-15,15]};

        const transforms = {
            translation : {
                x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
                y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0]
            },
            rotation : {
                x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
                y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0]
            }
        };

        // Move the image wrap.
        TweenMax.to(elem, 1.5, {
            ease: 'Power1.easeOut',
            x: transforms.translation.x,
            y: transforms.translation.y,
            rotationX: transforms.rotation.x,
            rotationY: transforms.rotation.y
        }); 
    },

    resetTilt(id) {
        let elem = document.getElementById(id)

        TweenMax.to(elem, 1.8, {
            ease: 'Power4.easeOut',
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0
        });
        TweenMax.to(elem, 1.8, {
            ease: 'Power4.easeOut',
            scale: 1
        });
    },

    text(elem) {
        let text = document.getElementById(elem)
        charming(text)

        let nameLetters = Array.from(text.querySelectorAll('span')).sort(() => 0.5 - Math.random())

        nameLetters.forEach(letter => letter.dataset.initial = letter.innerHTML);

        this.randomizeLetters(nameLetters)
    }
}
