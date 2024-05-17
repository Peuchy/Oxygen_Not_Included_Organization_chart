

const navContent = `
    <a class="active" href="#home">ONI-CHARTS - Home</a>
    <a href="./critters.html">Critters</a>
    <a href="./plants.html">Plants</a>
    <input type="text" name="searchBar" placeholder="Search..">
`


window.onload = function () {

    const style = document.createElement('link');
    style.setAttribute("href", "../style.css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    document.head.appendChild(style);

    const nav = document.createElement("div");
    nav.setAttribute("class", "topnav");
    nav.innerHTML = navContent;
    document.body.prepend(nav);

    document.getElementsByName("searchBar")[0].addEventListener('change', onSearch);
}


function findContainers(element, containerList) {
    const brE = element.getBoundingClientRect()

    const result = containerList.filter(container => {

        const brC = container.getBoundingClientRect()
        if (
            /* Does container left or right edge pass through element? */
            (brE.left < brC.left && brE.right > brC.left) ||
            (brE.left < brC.right && brE.right > brC.right) ||
            /* Does container top or bottom edge pass through element? */
            (brE.top < brC.top && brE.bottom > brC.top) ||
            (brE.top < brC.bottom && brE.bottom > brC.bottom))
            return true;
        if (
            brE.left >= brC.left &&
            brE.top >= brC.top &&
            brE.bottom <= brC.bottom &&
            brE.right <= brC.right)
            return true;
        return false;
    });
    return result;
}


function onSearch() {

    let elements = document.getElementsByTagName("font");

    elements = Array.from(elements).filter((tag) => {
        return tag.textContent.toLowerCase().includes(this.value.toLowerCase());
    });

    const rects = Array.from(document.getElementsByTagName("rect"))
        // Filtre tous les containers invisibles et qui ne sont pas les rect des éléments.
        .filter(container => container.style.visibility.toLowerCase() !== "hidden"
            // Condition sur la taille des éléments, attention ici en cas de modification de la taille 
            && container.getAttribute("width") > 90 && container.getAttribute("width") < 100
            && container.getAttribute("height") > 60 && container.getAttribute("height") < 70);

    rects.forEach((notFoundContainer) => {
        notFoundContainer.style.strokeWidth = 1;
        notFoundContainer.setAttribute("stroke", "black");
    })

    if (this.value != "") // Evite de tout sélectionner quand vide.
        elements.forEach((findedElement) => {

            const containers = findContainers(findedElement, rects);
            containers.forEach(container => {
                container.style.strokeWidth = 4;
                container.setAttribute("stroke", "red");
            });
        });

}