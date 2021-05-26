window.onload = function() {
    var link = document.querySelector('#projects-link')
    link.addEventListener('click', function(e) {
        e.preventDefault()
        var href = this.getAttribute('href')
        let offsetTop = document.querySelector(href).offsetTop

        scroll({
            top: offsetTop,
            behavior: "smooth"
        })

        setTimeout(()=> {
            animate.text('projects')
        }, 400)

    })

    animate.text('name')
    animate.text('job-title')
    animate.text('projects-link')
}
